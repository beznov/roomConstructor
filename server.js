const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require("express-session");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/object', express.static(path.join(__dirname, 'src', 'object')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

