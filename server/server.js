const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const bcrypt = require("bcryptjs");
const cors = require("cors");

// third partie
const { createToken, isAuthenticated, isRegistered } = require("./helpers");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// thabet fiha svp

// get all users
server.get("/api/users", (req, res) => {
  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

    data = JSON.parse(data.toString());

    return res.status(200).json(data.users);
  });
});

// create account
server.post("/api/auth/register", (req, res) => {
  const { email } = req.body;
  if (isRegistered({ email })) {
    const status = 401;
    const message = "Email already exist";
    return res.status(status).json({ status, message });
  }

  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

    data = JSON.parse(data.toString());

    let last_item_id = data.users[data.users.length - 1].id;

    let newUser = { ...req.body };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);

    newUser.password = hash;

    newUser = { ...newUser, id: last_item_id + 1, password: newUser.password };

    data.users.push(newUser);
    fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
      if (error) return res.status(error.status).json(error.message);
      return res
        .status(200)
        .json({ message: "user registred with success", newUser: newUser });
    });
  });
});

// signin
server.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("server email line 80: " + email);
  console.log("\n");

  const user = userdb.users.find((user) => user.email === email);

  if (!isRegistered({ email })) {
    const status = 404;
    const message = "user is not registred";
    return res.status(status).json({ message: message });
  } else {
    const matched = bcrypt.compareSync(JSON.stringify(password), user.password);
    if (!matched) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const access_token = createToken({ id: user.id });
    return res.status(200).json({
      message: `welcome ${user.firstName} ${user.lastName}`,
      user: user,
      token: access_token,
    });
  }
});

// display profile
server.get("/api/users/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const token = req.header("Authorization");

  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

    console.log("\n");
    data = JSON.parse(data.toString());

    if (token) {
      const index = data.users.findIndex((el) => Number(el.id) === Number(id));
      return res.status(200).json({ user: data.users[index] });
    } else {
      return res.status(401).json({ message: "unAuthorized" });
    }
  });
});

// update user data
server.put("/api/users/update/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const token = req.header("Authorization");

  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

    data = JSON.parse(data.toString());
    console.log("data 142", data);

    if (token) {
      const index = data.users.findIndex((el) => Number(el.id) === Number(id));

      data.users[index] = { ...req.user, ...req.body };

      fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
        if (error) return res.status(401).json({ message: error });

        return res.status(200).json({
          message: "user updated with success",
          editedUser: data.users[index],
        });
      });
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  });
});

// modify password
server.put("/api/users/password/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const token = req.header("Authorization");
  const { password } = req.body;

  console.log("password server line 158: " + password);

  fs.readFile("./db.json", (error, data) => {
    if (error) {
      const status = 401;
      const message = error;
      return res.status(status).json({ status, message });
    }

    data = JSON.parse(data.toString());

    if (token) {
      const index = data.users.findIndex((el) => Number(el.id) === Number(id));

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(JSON.stringify(password), salt);
      data.users[index] = { ...data.users[index], password: hash };

      fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
        if (error) {
          return res.status(401).json({ message: error });
        }
        return res.status(200).json({
          message: "password updated with success",
          newPwd: data.users[index],
        });
      });
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  });
});

// password forgoten
server.put("/api/users/forget_password", (req, res) => {
  const { email, password } = req.body;

  try {
    fs.readFile("./db.json", (error, data) => {
      if (error) return res.status(error.status).json(error.message);

      data = JSON.parse(data.toString());

      const index = data.users.findIndex((el) => el.email === email);

      if (index > -1) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(JSON.stringify(password), salt);

        data.users[index] = { ...data.users[index], password: hash };

        fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
          if (error) return res.status(error.status).json(error.message);

          return res.status(200).json({
            message: "password changed with success",
            newPwd: data.users[index],
          });
        });
      } else {
        return res
          .status(404)
          .json({ message: "no user with is email address" });
      }
    });
  } catch (error) {
    console.log("catch error : ", error.message);
    return res.status(error.status).json(error.message);
  }
});

// delete account
server.delete("/api/auth/delete/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const token = req.header("Authorization");
  const user = req.user;

  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

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
        return res
          .status(200)
          .json({ message: "user deleted with success", data: data.users });
      });
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  });
});

server.listen(5000, () => {
  console.log("go to http://localhost:5000 or  http://192.168.10.221:5000");
});
