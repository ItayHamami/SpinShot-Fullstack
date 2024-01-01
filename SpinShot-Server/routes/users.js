const express = require("express");
const joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart")

const router = express.Router();


const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
    isAdmin: joi.boolean().required(),
    
    });


const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
});


//register
router.post("/", async (req, res) => {
    try {
      // 1. joi validation
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error);


      // 2. check if user already exist

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");

    
      // 3. create the user
    user = new User(req.body);

      // 4. encrypt the password & save user
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

      // 5. create user cart
let cart = new Cart({userId: user._id , products: [], active:true})
await cart.save()

      // 6. create the token & response

    const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.jwtKey);

    res.status(201).send(token);
    } catch (error) {
    res.status(400).send(error);

    }

});

//login
router.post("/login", async (req, res) => {

    try {
      // 1. joi validation

    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error);

      // 2. check if user already exist

    let user = await User.findOne({ email: req.body.email });
if (!user) return res.status(400).send("User not found.");

      // 3. compare the password  
    let result = await bcrypt.compare(req.body.password, user.password);

    if (!result) return res.status(400).send("Wrong email or password");

      // 4. create the token

    const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin, isBusiness: user.isBusiness, email: user.email },
    process.env.jwtKey

    );
    res.status(200).send(token);

    } catch (error) {
    res.status(400).send(error);
    }
});

//get all users
router.get("/", auth, async (req, res) => {
  if (!req.payload.isAdmin)
  return res.status(400).send("Access denied. User is not an admin");

    try {

    const users = await User.find();
    res.status(200).send(users);

    } catch (error) {
    res.status(400).send(error);

    }
});

//get specific user 
router.get("/:id", auth, async (req, res) => {

    try {
      const requestingUserId = req.payload._id; // Get the ID of the user making the request

      // Check if user is an admin or is the same user
      if (!(req.payload.isAdmin || req.params.id === requestingUserId)) {
        return res.status(403).send("Access denied. You do not have permission to view this user");
      }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User does not exist!");
    res.status(200).send(user);

    } catch (error) {
    res.status(400).send(error);
    }
});

//update user 
router.put("/:id", auth, async (req, res) => {
  try {
    // Check if user making the request is the user itself.
    if (req.payload._id !== req.params.id) {
      return res.status(403).send("Access denied."); // Use 403 for Forbidden
    }

    // Joi validation
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Update user
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error"); // Use 500 for internal server errors
  }
});




//delete user
router.delete("/:id", auth, async (req, res) => {
try {
    const requestingUserId = req.payload._id; // Get the ID of the user making the request

    // Check if user is an admin or is the same user
    if (!(req.payload.isAdmin || req.params.id === requestingUserId)) {
    return res.status(403).send("Access denied. You do not have permission to delete this user");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
    return res.status(404).send("User not found");
    }


    res.status(200).send("user has been deleted."); 

} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});






module.exports = router;