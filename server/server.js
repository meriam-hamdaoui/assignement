const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
      return res.status(status).json({ status, message });
    }
    data = JSON.parse(data.toString());

    return res.status(200).json(data.users);
  });
});

// sign up
const isRegistered = ({ email }) => {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
};

server.post("/api/auth/register", (req, res) => {
  const { email } = req.body;
  if (isRegistered({ email })) {
    const status = 401;
    const message = "Email already exist";
    return res.status(status).json({ status, message });
  }

  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      return res.status(status).json({ status, message });
    }

    data = JSON.parse(data.toString());

    let last_item_id = data.users[data.users.length - 1].id;

    let newUser = { ...req.body };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);

    newUser.password = hash;

    newUser = { ...newUser, id: last_item_id + 1, password: newUser.password };

    data.users.push(newUser);
    fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        return res.status(status).json({ status, message });
      }
    });
    return res.status(200).json({ newUser: req.body, users: data.users });
  });

  // const access_token = createToken({ email, password });
});

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "you are not authorized to perceed" });
    } else {
      return jwt.verify(token, SECRET_KEY, async (error, decoder) => {
        if (error)
          return res.status(401).json({ message: "failed to authenticate" });

        if (!decoder)
          return res
            .status(404)
            .json({ message: "no such user, sign up first" });

        const user = userdb.users.find((el) => el.id === decoder.id);

        req.user = { ...user };

        return next();
      });
    }
  } catch (error) {
    console.error("authentication error =>", error);
    return res.status(500).json({ message: "authentication error" });
  }
};

// it works fine
// without adding user to the db.json
server.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = userdb.users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: "Incorrect Email or Password" });
  } else {
    bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return res.status(401).json({ message: "Invalid Password" });
      }

      const access_token = createToken({ id: user.id });
      return res.status(200).json({ user: user, token: access_token });
    });
  }
});

// delete a user
server.delete("/api/auth/delete/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const token = req.header("Authorization");
  const user = req.user;

  fs.readFile("./db.json", (error, data) => {
    if (error) {
      const status = 401;
      const message = error;
      return res.status(status).json({ status, message });
    }

    data = JSON.parse(data.toString());

    if (token && Number(user.id) === Number(id)) {
      const userIndex = data.users.findIndex(
        (el) => Number(el.id) === Number(id)
      );
      data.users.splice(userIndex, 1);
      fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
        if (error) {
          return res.status(401).json({ message: error });
        }
        return res.status(200).json({ data: data.users });
      });
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  });
});

// get user by id
server.get("/api/users/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const token = req.header("authorization");
  const user = req.user;

  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      return res.status(status).json({ status, message });
    }
    if (token && Number(user.id) === Number(id)) {
      data = JSON.parse(data.toString());

      const userIndex = data.users.findIndex(
        (el) => Number(el.id) === Number(id)
      );

      return res.status(200).json(data.users[userIndex]);
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  });
});

// req test for middleware auth
// try to change the auth middleware
server.put("/api/users/update/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const token = req.header("Authorization");
  const { id: _id, email, password } = req.user;
  const { firstName, lastName, phone, country } = req.body;

  fs.readFile("./db.json", (error, data) => {
    if (error) {
      const status = 401;
      const message = error;
      return res.status(status).json({ status, message });
    }

    data = JSON.parse(data.toString());

    if (token && Number(_id) === Number(id)) {
      const userIndex = data.users.findIndex(
        (el) => Number(el.id) === Number(id)
      );

      const updateUser = {
        firstName: firstName,
        lastName: lastName,
        phoneame: phone,
        country: country,
      };

      data.users[userIndex] = {
        id: _id,
        email: email,
        password: password,
        ...updateUser,
      };

      fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
        if (error) {
          return res.status(401).json({ message: error });
        }
        return res.status(200).json({ updateUser: data.users[userIndex] });
      });
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  });
});

server.listen(5000, () => {
  console.log("Running fake api json server");
});
