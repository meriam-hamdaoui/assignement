const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require("multer");

// third partie
const { isAuthenticated } = require("./helpers");
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  resetPassword,
  deleteAccount,
  uploadIconNbr,
  uploadIconFlw,
} = require("./controllers");

const server = jsonServer.create();

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

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(jsonServer.defaults());
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const salt = bcrypt.genSaltSync(10);

//multer for upload
const storage = (folderName) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = (folderName) =>
  multer({
    storage: storage(folderName),
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });

// get all users
server.get("/api/users", (req, res) => {
  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

    data = JSON.parse(data.toString());

    return res.status(200).json(data.users);
  });
});

server.get("/api/icons/numbers", (req, res) => {
  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

    data = JSON.parse(data.toString());
    return res.status(200).json({ data: data.numbers[0] });
  });
});

server.get("/api/icons/followers", (req, res) => {
  fs.readFile("./db.json", (error, data) => {
    if (error) return res.status(error.status).json(error.message);

    data = JSON.parse(data.toString());

    return res.status(200).json({ data: data.followers[0] });
  });
});

server.put(
  "/api/icons/numbers/:id",
  isAuthenticated,
  upload("uploads").single("numbers"),
  uploadIconNbr
);
server.put(
  "/api/icons/followers/:id",
  isAuthenticated,
  upload("uploads").single("followers"),
  uploadIconFlw
);

// create account
server.post("/api/auth/register", register);

// signin
server.post("/api/auth/login", login);

// display profile
server.get("/api/users/:id", isAuthenticated, getProfile);

// update user data
server.put("/api/users/update/:id", isAuthenticated, updateProfile);

// modify password
server.put("/api/users/password/:id", isAuthenticated, changePassword);

// password forgoten
server.put("/api/users/forget_password", resetPassword);

// delete account
server.delete("/api/auth/delete/:id", isAuthenticated, deleteAccount);

const PORT = 5000 || 5005;

server.listen(PORT, () => {
  console.log(`go to http://localhost:${PORT}`);
});
