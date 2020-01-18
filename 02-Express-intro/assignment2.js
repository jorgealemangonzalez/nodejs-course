const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("This allways runs", req.url)
    next()
})

app.use((req, res, next) => {
    console.log("This also runs", req.url)
    next()
})

app.use('/users', (req, res, next) => {
    res.send('<h1> HELLO WORLD USERS </h1>')
})

app.use((req, res, next) => {
    res.send('<h1> HELLO WORLD </h1>')
})

app.listen(3000);

