const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require("express-session");
const bodyParser = require('body-parser');
const compression = require('compression');
const pako = require('pako');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(path.join(__dirname)));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/object', express.static(path.join(__dirname, 'src', 'object')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:500000}));


app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log("[MySQL] Connection established...");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

const verifySession = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/signIn');
    }
    next();
};

const isNotAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'index.html'));
});

app.get('/profile', verifySession, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'profile.html'));
});

app.get('/signIn', isNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'signIn.html'));
});

app.get('/signUp', isNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'signUp.html'));
});

app.get('/constructor', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'constructor.html'));
});

app.post('/handleSignUp', async (req, res) => {
    const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { signUp__email, signUp__password, signUp__password_repeat } = req.body;
    if (!signUp__email || !signUp__password || !signUp__password_repeat) return res.status(400).json({ message: "Необхідні всі поля" });
    if (!regexp.test(signUp__email)) return res.status(400).json({ message: "Невірний імейл" });
    if (signUp__password.length < 8) return res.status(400).json({ message: "Слабкий пароль" });
    if (signUp__password !== signUp__password_repeat) return res.status(400).json({ message: "Пароль не співпадає" });

    try {
        const checkSql = "SELECT * FROM user WHERE login = ?";
        db.query(checkSql, [signUp__email], async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Помилка сервера", error: err });
            }
            if (result.length > 0) {
                return res.status(400).json({ message: "Користувач з таким імейлом вже існує" });
            }

            const hashedPassword = await bcrypt.hash(signUp__password, 10);
            const insertSql = `INSERT INTO user (login, password) VALUES (?, ?)`;
            db.query(insertSql, [signUp__email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Помилка при реєстрації", error: err });
                }

                const user = { u_id: result.insertId, login: signUp__email };

                const token = jwt.sign(
                    { id: user.u_id, email: user.login },
                    process.env.SECRET_KEY,
                    { expiresIn: "1h" }
                );

                req.session.user = user;
                req.session.token = token;

                res.status(201).json({ message: "Обліковий запис успішно створено", token });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера", error, body: req.body });
    }
});

app.post('/handleSignIn', (req, res) => {
    const { signIn__email, signIn__password } = req.body;
    if (!signIn__email || !signIn__password) {
        return res.status(400).json({ message: "Необхідні всі поля" });
    }

    const sql = "SELECT * FROM user WHERE login = ?";
    db.query(sql, [signIn__email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Помилка сервера", error: err });
        }
        if (result.length === 0) {
            return res.status(401).json({ message: "Невірний імейл або пароль" });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(signIn__password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Невірний імейл або пароль" });
        }

        const token = jwt.sign(
            { id: user.u_id, email: user.login },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        req.session.user = { id: user.u_id, email: user.login };
        req.session.token = token;

        res.json({ message: "Авторизація успішна", token });
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Помилка при виході", error: err });
        }
        res.clearCookie("connect.sid");
        res.json({ message: "Вихід успішний" });
    });
});


app.get('/authenticated', (req, res) => {
    if (req.session.token) {
        return res.json({ authenticated: true });
    }
    res.json({ authenticated: false });
});

app.get('/username', (req, res) => {
    if (req.session.user) {
        return res.json({ username: req.session.user.email });
    }
    res.json({ username: 'undefined' });
});

app.post('/save-room', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Користувач не авторизований" });
    }
    
    const userId = req.session.user.id;
    console.log("Получены данные:", req.body.data?.length, "байт");

    if (!req.body.data) {
        return res.status(400).json({ message: "Дані не отримані" });
    }


        try {
            const base64Data = req.body.data;
        
            const compressedData = Buffer.from(base64Data, 'base64');

            const decompressedData = pako.ungzip(compressedData, { to: 'string' });

            const data = JSON.parse(decompressedData);
           
            const {
                roomName, wallWidth, wallHeight, wallLength, wallThickness,
                presentedWalls, objects, lights, lightX, lightY, lightZ, lightIntensity
            } = data;

            const query = `INSERT INTO saved_room (user, wall_width, wall_length, wall_height, wall_thickness, presented_walls, objects,
            lights, light_x, light_y, light_z, light_intensity, room_name, environment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
            db.query(query, [userId, data.wallWidth, data.wallLength, data.wallHeight, data.wallThickness, 
                JSON.stringify(data.presentedWalls), JSON.stringify(data.objects), JSON.stringify(data.lights), 
                data.lightX, data.lightY, data.lightZ, data.lightIntensity, data.roomName, 'web'], (err, result) => {
                if (err) {
                    console.error("Ошибка MySQL:", err);
                    return res.status(500).json({ message: "Помилка при збереженні", error: err.toString() });
                }
                res.status(201).json({ message: "Кімнату успішно збережено" });
            });
        } catch (err) {
            console.error("Ошибка распаковки:", err);
            return res.status(500).json({ message: "Помилка при розпаковці даних", error: err.toString() });
        }

});



app.get('/get-rooms', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Користувач не авторизований" });
    }

    const userId = req.session.user.id;
    const query = "SELECT r_id, room_name, datetime FROM saved_room WHERE user = ? ORDER BY datetime DESC";

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Помилка при отриманні кімнат", error: err });
        }
        res.json(results);
    });
});


app.get('/get-room', (req, res) => {
    const { id } = req.query;

    if (!req.session.user) {
        res.status(403).send('Не достатньо прав');
        return;
    }

    db.query('SELECT * FROM saved_room WHERE r_id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Object not found' });
            return;
        }

        if (result[0].user !== req.session.user.id) {
            res.status(403).send('Не достатньо прав');
            return;
        }

        res.json(result[0]);
    });
});


app.post('/delete-room', (req, res) => {
    const roomId = req.body.roomId;
    const query = 'DELETE FROM saved_room WHERE r_id = ?';

    db.query(query, [roomId], (err, result) => {
        if (err) {
            console.error('Помилка при видаленні кімнати:', err);
            res.status(500).json({ message: 'Помилка сервера' });
            return;
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Кімната видалена' });
        } else {
            res.status(404).json({ message: 'Кімната не знайдена' });
        }
    });

});