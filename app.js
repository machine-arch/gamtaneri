// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const prod= process.env.NODE_ENV !== 'development'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ prod, hostname, port })
const handle = app.getRequestHandler()


app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})


//SET NODE_ENV=production && next start

// "orm:build": "tsc --build  src",
    // "migrations:generate": "npm run orm:bild && typeorm migration:generate  -d src/dist/src/config/ormConfig.js",
    // "migration:create": "typeorm migration:create src/migrations/user",
    // "migration:run": "npm run orm:build && typeorm migration:run -d src/dist/src/config/ormConfig.js"