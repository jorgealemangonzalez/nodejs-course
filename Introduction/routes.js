
const fs = require('fs')

const requestHandler = (req, res) => {

    const url = req.url;

    switch (url) {
        case '/': {
            res.setHeader('Content-Type', 'text/html')
            res.write(fs.readFileSync('index.html', 'utf8'))
            return res.end()
        }
        case '/message': {
            const body = []
            req.on('data', (chunk) => {
                body.push(chunk)
                console.log(Buffer.concat([chunk]).toString())
                console.log("\n ---- \n ")
            })
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString()
                const message = parsedBody.split('=')[1]
                fs.writeFile('received.txt', message, err => {
                    res.statusCode = 302
                    res.setHeader('Location', '/')
                    return res.end()
                })
            })
            break
        }
        default:
            res.statusCode = 404
            return res.end()
    }

}

exports.handler = requestHandler

// module.exports = {handler: requestHandler}

// module.exports.handler = requestHandler