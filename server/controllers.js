const fs = require("fs");
const bcrypt = require("bcryptjs");

const { createToken, isAuthenticated, isRegistered } = require("./helpers");

const salt = bcrypt.genSaltSync(10);

const userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!isRegistered({ email })) {
    const status = 404;
    const message = "user is not registred";
    return res.status(status).json({ message: message });
  }

  const user = userdb.users.find((user) => user.email === email);

  const matched = bcrypt.compareSync(password, user.password);

  if (!matched) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const access_token = createToken({ id: user.id });
  return res.status(200).json({
    message: `welcome ${user.firstName} ${user.lastName}`,
    user: user,
    token: access_token,
  });
};

exports.getProfile = async (req, res) => {
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
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const token = req.header("Authorization");
  try {
    if (token) {
      fs.readFile("./db.json", (error, data) => {
        if (error) return res.status(error.status).json(error.message);

        data = JSON.parse(data.toString());

        const index = data.users.findIndex(
          (el) => Number(el.id) === Number(id)
        );

        data.users[index] = { ...data.users[index], ...req.body };

        fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
          if (error) {
            return res.status(error.status).json(error.message);
          }

          return res.json({ user: data.users[index] });
        });
      });
    } else {
      return res.status(401).json("unauthorized");
    }
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

exports.changePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    fs.readFile("./db.json", (error, data) => {
      if (error) {
        const status = 401;
        const message = error;
        return res.status(status).json(message);
      }

      data = JSON.parse(data.toString());

      const index = data.users.findIndex((el) => Number(el.id) === Number(id));

      const hash = bcrypt.hashSync(password, salt);

      req.user.password = hash;

      data.users[index] = { ...req.user };

      fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
        if (error) {
          return res.status(error.status).json(error.message);
        }

        return res.status(200).json(data.users[index]);
      });
    });
  } catch (error) {
    console.log(error.response.data);
    return res.status(error.status).json(error.message);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!isRegistered({ email })) {
      const status = 404;
      const message = "user is not registred";
      return res.status(status).json({ message: message });
    }

    fs.readFile("./db.json", (error, data) => {
      if (error) {
        return res.status(error.status).json({ message: error.message });
      }
      data = JSON.parse(data.toString());

      const index = data.users.findIndex((el) => el.email === email);

      const hash = bcrypt.hashSync(password, salt);
      data.users[index].password = hash;
      fs.writeFile("./db.json", JSON.stringify(data), (error, result) => {
        if (error) {
          return res.status(error.status).json(error.message);
        }
        return res.status(200).json({
          message: "password changed with success",
          user: data.users[index],
        });
      });
    });
  } catch (error) {
    console.log("catch error : ", error.message);
    return res.status(error.status).json(error.message);
  }
};

exports.deleteAccount = async (req, res) => {
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
};
