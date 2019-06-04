require('dotenv').config()
const express = require("express")
const app = express()
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const swagController = require("./controllers/swagController");
const authController = require('./controllers/authController');
const cartController = require("./controllers/cartController");
const searchController = require("./controllers/searchController");


//Middleware
app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );
app.use(checkForSession)


 // Endpoints
//// Auth
app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);
//// Swag
app.get("/api/swag", swagController.read);
//// Cart
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);
// Search
app.get("/api/search", searchController.search);

app.listen(process.env.SERVER_PORT, () => 
    console.log(`Server listening on ${process.env.SERVER_PORT}`))

