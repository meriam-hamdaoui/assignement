const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
// const { data } = require("jquery");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "72676376";
const expiresIn = "1h";

// create token
const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// get all users
server.get("/api/users", (req, res) => {
  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = error;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    res.status(200).json(data.users);
  });
});

// sign up
const isRegisterAuthenticated = ({ email }) => {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
};

server.post("/api/auth/register", (req, res) => {
  const { email } = req.body;
  if (isRegisterAuthenticated({ email })) {
    const status = 401;
    const message = "Email already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    data = JSON.parse(data.toString());

    let last_item_id = data.users[data.users.length - 1].id;

    const newUser = {
      id: last_item_id + 1,
      ...req.body,
    };

    data.users.push(newUser);
    fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
    });
    res.status(200).json({ newUser: req.body, users: data.users });
  });

  // const access_token = createToken({ email, password });
});

// signin
const isLoginAuthenticated = ({ email, password }) => {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
};

//
server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }
  const user = userdb.users.filter(
    (user) => user.email === email && user.password === password
  );
  const access_token = createToken({ email, password });

  res.status(200).json({ user: user, token: access_token });
});

// delete a user
server.delete("/api/auth/delete/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("./db.json", (error, data) => {
    if (error) {
      const status = 401;
      const message = error;
      res.status(status).json({ status, message });
      return;
    }

    data = JSON.parse(data.toString());

    const userIndex = data.users.findIndex(
      (user) => Number(user.id) === Number(id)
    );

    data.users.splice(userIndex, 1);

    fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
      if (error) {
        return res.status(401).json({ message: error });
      }
      res.status(200).json({ data: data.users });
    });
  });
});

// get user by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    const userIndex = data.users.findIndex(
      (user) => Number(user.id) === Number(id)
    );

    res.status(200).json(data.users[userIndex]);
  });
});

server.listen(5000, () => {
  console.log("Running fake api json server");
});
