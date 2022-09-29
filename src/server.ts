import { readFile } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";
import path from "path";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  switch (req.url) {
    case "/":
      readFile(path.join(__dirname, "html", "index.html"), (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
      break;
    case "/app.js":
      readFile(path.join(__dirname, "html", "app.js"), (err, data) => {
        res.setHeader("Content-Type", "text/js");
        res.end(data);
      });
      break;
    case "/styles.css":
      readFile(path.join(__dirname, "html", "styles.css"), (err, data) => {
        res.setHeader("Content-Type", "text/css");
        res.end(data);
      });
      break;
    default:
      break;
  }
});

server.listen(8080, () => {
  console.log(`Server listening on port ${8080}`);
});
