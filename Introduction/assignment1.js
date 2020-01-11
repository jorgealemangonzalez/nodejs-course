const http = require('http')

const server = http.createServer((req, res) => {

    const url = req.url;

    switch (url) {
        case '/': {
            res.setHeader('Content-Type', 'text/html')
            // "<html><head>      <title>HELLO</title>  </head>    <body>      <form action="/message" method="POST">          <input type="text" name="message">          <button type="submit">              SEND          </button>      </form></body></html>"
            res.write(`<html><head>      <title>HELLO</title>  </head><body><h1>HELLO WORLD</h1> <br> <form action="/create-user" method="POST">          <input type="text" name="username">          <button type="submit">              SEND          </button>      </form> </body></html>`)
            return res.end()
        }
        case '/users': {
            res.setHeader('Content-Type', 'text/html')
            // "<html><head>      <title>HELLO</title>  </head>    <body>      <form action="/message" method="POST">          <input type="text" name="message">          <button type="submit">              SEND          </button>      </form></body></html>"
            res.write("<html><head>      <title>HELLO</title>  </head><body><ul><li>user 1</li><li>user 2</li></ul></body></html>")
            return res.end()
        }
        case '/create-user': {
            const body = []
            req.on('data', (chunk) => {
                body.push(chunk)
            })
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString()
                const message = parsedBody.split('=')[1]
                console.log(message)
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
            break
        }
        default:
            res.statusCode = 404
            return res.end()
    }

})

// http.bind('/some', () => console.log('SOME'))

server.listen(3000)