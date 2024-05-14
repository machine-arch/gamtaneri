const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.APP_ENV !== 'production';
const hostname = 'gamtaneri.ge';
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Serve static files from 'public' and '.next' directories
    server.use(express.static(path.join(__dirname, 'public')));
    server.use('/_next', express.static(path.join(__dirname, '.next')));

    // Define custom routes
    server.get('/', (req, res) => {
      console.info('Serving Home Page');
      return app.render(req, res, '/', req.query);
    });

    server.get('/a', (req, res) => {
      console.info('Serving Page A');
      return app.render(req, res, '/a', req.query);
    });

    server.get('/b', (req, res) => {
      console.info('Serving Page B');
      return app.render(req, res, '/b', req.query);
    });

    // Catch-all handler for all other requests
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    // Start the server
    server.listen(port, (err) => {
      if (err) {
        console.error('Error starting server: ' + err.stack);
        throw err;
      }
      console.info(
        `> Ready on http://${hostname}:${port} - env ${process.env.NODE_ENV}`
      );
    });
  })
  .catch((ex) => {
    console.error('An error occurred while starting the server: ' + ex.stack);
    process.exit(1);
  });

//SET NODE_ENV=production && next start

// "orm:build": "tsc --build  src",
// "migrations:generate": "npm run orm:bild && typeorm migration:generate  -d src/dist/src/config/ormConfig.js",
// "migration:create": "typeorm migration:create src/migrations/user",
// "migration:run": "npm run orm:build && typeorm migration:run -d src/dist/src/config/ormConfig.js"
