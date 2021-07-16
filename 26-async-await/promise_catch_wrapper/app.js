// ANOTHER OPTION COULD BE : https://www.npmjs.com/package/express-promise-router

const express = require('express');

const app = express();

const throwTheError = async () => {
    throw new Error("This is an error")
}

const errorCatcher = (promise) => async (req,res,next) => {
    try{
        await promise(req, res, next)
    } catch(error) {
        next(error)
    }
}

app.use(errorCatcher(throwTheError))


app.use((error, req, res, next) => {
    console.log(error)
    res.send("NOT OK")
})

app.listen(8080)