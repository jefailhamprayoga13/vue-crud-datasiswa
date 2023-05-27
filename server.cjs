const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = jsonServer.create();
const router = jsonServer.router("./src/data.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(bodyParser.json());

const secretKey = "YOUR_SECRET_KEY";

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get("users").find({ username, password }).value();

  if (user) {
    const token = jwt.sign({ userId: user.id }, secretKey);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use((req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      jwt.verify(token, secretKey);
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Missing token" });
  }
});

server.use(middlewares);
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
