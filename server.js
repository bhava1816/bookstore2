let express = require("express");
let mongoose = require("mongoose");
let multer = require("multer");
let cors = require("cors");
let path = require("path");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
require("dotenv").config();

let app = express();

// ---------------------------
// MIDDLEWARE (must be first)
// ---------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ---------------------------
// MULTER SETUP
// ---------------------------
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
let upload = multer({ storage });

// ---------------------------
// MONGOOSE MODELS
// ---------------------------
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  mobileNumber: String,
  profilepic: String
});

let User = mongoose.model("bhava", userSchema, "mydetails");

const bookSchema = new mongoose.Schema({
  Authorname: String,
  bookName: String,
  parName: String,
  rate: Number
});
let Bookstore = mongoose.model("bhavan", bookSchema, "empl");

// ---------------------------
// API ROUTES (MUST come BEFORE serving React)
// ---------------------------

// SIGNUP
app.post("/signup", upload.single("profilepicref"), async (req, res) => {
  try {
    let hashed = await bcrypt.hash(req.body.password, 10);

    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashed,
      mobileNumber: req.body.mobileNumber,
      profilepic: req.file ? req.file.filename : null
    });

    await user.save();
    res.json({ status: 200, msg: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: "Signup failed" });
  }
});

// LOGIN
app.post("/login", upload.none(), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({ status: 404, msg: "Invalid email" });
  }

  let isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.json({ status: 404, msg: "Invalid password" });
  }

  let token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET
  );

  res.json({
    status: 200,
    msg: "Login success",
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      token,
      profilepic: user.profilepic
    }
  });
});

// TOKEN LOAD
app.post("/load", upload.none(), async (req, res) => {
  try {
    let token = jwt.verify(req.body.token, process.env.JWT_SECRET);

    let user = await User.findOne({ email: token.email });
    if (!user) return res.json({ status: 404, msg: "User not found" });

    res.json({
      status: 200,
      msg: "Token valid",
      data: user
    });
  } catch (err) {
    return res.json({ status: 403, msg: "Invalid token" });
  }
});

// BOOKSTORE GET
app.get("/bookstore", async (req, res) => {
  try {
    let data = await Bookstore.find();
    res.json({ status: 200, msg: "retrieved", data });
  } catch (err) {
    res.json({ status: 404, msg: "not retrieved" });
  }
});

// UPDATE
app.patch("/update", upload.single("profilepic"), async (req, res) => {
  try {
    let updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNumber: req.body.mobileNumber
    };

    if (req.file) {
      updateData.profilepic = req.file.filename;
    }

    await User.updateOne({ email: req.body.email }, { $set: updateData });

    res.status(200).json("updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("update failed");
  }
});

// DELETE
app.delete("/delete", upload.none(), async (req, res) => {
  let result = await User.deleteOne({ email: req.body.email });

  if (result.deletedCount > 0) {
    res.status(200).json("deleted successfully");
  } else {
    res.status(404).json("not deleted");
  }
});

// ---------------------------
// SERVE REACT BUILD (MUST come last)
// ---------------------------
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ---------------------------
// START SERVER
// ---------------------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection failed"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});
