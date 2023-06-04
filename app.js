const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

var cors = require("cors");

const MONGODB_URI =
  "mongodb+srv://sonu:t80rQQFSpbZeUg7b@cluster0.pizod.mongodb.net/adminbord?retryWrites=true&w=majority";

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger_doc.json")

const router = require("./routes");
const authRoutes = require("./routes/auth");
const genralRoutes = require("./routes/genralRoutes");

const booksRoutes = require("./routes/booksRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.set("trust proxy", 1);

let cookesOptions = {
  path: "/",
  httpOnly: true,
  expires: 1 * 60 * 60 * 1000,
};

app.use(
  session({
    key: "session_key",
    secret: "super secret key",
    resave: false,
    saveUninitialized: false,
    cookie: cookesOptions,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
    }),
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authorization"
  );
  next();
});


app.get("/", (req, res) => {
  res.send("Welcome To User API Server");
});

app.use(router);
app.use("/auth", authRoutes);
app.use(genralRoutes);
app.use(booksRoutes);

let options = {};

app.use(
  "/api-docs",
  function (req, res, next) {
    swaggerDocs.host = req.get("host");
    req.swaggerDoc = swaggerDocs;
    next();
  },
  swaggerUi.serveFiles(swaggerDocs, options),
  swaggerUi.setup()
);

app.use((error, req, res, next) => {
  console.log(error, "Error From eroor Handler!");
  const staus = error.statusCode || 500;
  const message = error.message;
  const data = error.data || {};
  res.status(staus).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8081, () => {
      console.log("Server is Listning on 8081");
    });
  })
  .catch((err) => console.log(err, "DataBase Connection error"));
