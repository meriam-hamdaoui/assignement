const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "18112019";

const expiresIn = "1h";
const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

function isLoginAuthenticated({ email, password }) {
  const user = userdb.users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    return user;
  } else {
    return false;
  }
}
const isRegisterAuthenticated = ({ email }) => {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
};

server.post("/api/auth/register", (req, res) => {
  const { firstName, lastName, phone, country, email, password } = req.body;
  if (isRegisterAuthenticated({ email })) {
    const status = 401;
    const message = "Email already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    // give an id to the new item which is the last one's id + 1
    let last_item_id = data.users[data.users.length - 1].id;

    data.users.push({
      id: last_item_id + 1,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      country: country,
      email: email,
      password: password,
    });
    let writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  const token = createToken({ email, password });
  res.status(200).json({ token });
});

server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }

  const token = createToken({ email, password });
  const user = isLoginAuthenticated({ email, password });
  res.status(200).json({ user: user, token: token });
});

server.listen(5000, () => {
  console.log("Running fake api json server");
});
