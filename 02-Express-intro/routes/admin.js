const express = require('express')

const router = express.Router()

router.get('/add-product', (req, res, next) => {
    console.log("Add product", req.url)
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Send it</button></form>')
})


router.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

module.exports = router