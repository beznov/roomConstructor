const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Обслуживаем статические файлы из корня и вложенных папок
app.use(express.static(path.join(__dirname)));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/object', express.static(path.join(__dirname, 'src', 'object')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Обслуживаем файлы из node_modules для импортов
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'index.html'));
});

// Страница профиля
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'profile.html'));
});

app.get('/signIn', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'signIn.html'));
});

app.get('/signUp', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'signUp.html'));
});

app.get('/constructor', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'page', 'constructor.html'));
});