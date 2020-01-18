const express = require('express')

const router = express.Router()


router.get('/', (req, res) => {
    res.send("<h1>HI SHOP</h1>")
})


module.exports = router