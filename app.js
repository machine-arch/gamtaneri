const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.APP_ENV !== "production";
const hostname = "gamtaneri.ge";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // server.use(express.static(path.join(__dirname, "public")));
    server.use(express.static(path.join(__dirname, "public")));
    server.use("/_next", express.static(path.join(__dirname, ".next")));
    server.get("/", (req, res) => {
      return app.render(req, res, "/", req.query);
    });

    server.get("/a", (req, res) => {
      return app.render(req, res, "/a", req.query);
    });

    server.get("/b", (req, res) => {
      return app.render(req, res, "/b", req.query);
    });
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

// // server.js
// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
// const prod = process.env.APP_ENV !== "development";
// const hostname = "gamtaneri.ge";
// const port = 3000;
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       // Be sure to pass `true` as the second argument to `url.parse`.
//       // This tells it to parse the query portion of the URL.
//       const parsedUrl = parse(req.url, true);
//       const { pathname, query } = parsedUrl;
//       //set path for static files
//       if (pathname === "/a") {
//         await app.render(req, res, "/a", query);
//       } else if (pathname === "/b") {
//         await app.render(req, res, "/b", query);
//       } else {
//         await handle(req, res, parsedUrl);
//       }
//     } catch (err) {
//       console.error("Error occurred handling", req.url, err);
//       res.statusCode = 500;
//       res.end("internal server error");
//     }
//   }).listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://${hostname}:${port}`);
//   });
// });

//SET NODE_ENV=production && next start

// "orm:build": "tsc --build  src",
// "migrations:generate": "npm run orm:bild && typeorm migration:generate  -d src/dist/src/config/ormConfig.js",
// "migration:create": "typeorm migration:create src/migrations/user",
// "migration:run": "npm run orm:build && typeorm migration:run -d src/dist/src/config/ormConfig.js"
