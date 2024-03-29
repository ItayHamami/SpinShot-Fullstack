const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/users")
const profile = require("./routes/profile");
const products = require("./routes/products");
const carts = require("./routes/carts");
const cors = require("cors")
require("dotenv").config()

const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(process.env.DB, {useNewUrlParser:true})
.then(()=> console.log("MongoDb connected"))
.catch((error) => console.log(error))

app.use(express.json())
app.use(cors());
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/products", products);
app.use("/api/carts", carts);

app.listen(port , () => console.log("Server started on port", port))