const express = require("express");
const auth = require("../middleware/auth");
const Cart = require("../models/Cart")
const joi = require("joi")
const router = express.Router();

const productSchema = joi.object({
    name: joi.string().min(2),
    price: joi.number().required(),
    category: joi.string().required().min(2),
    description: joi.string().required().min(2),
    image: joi.string().required().min(2),
    _id:joi.string()


});

// add product to cart - product details in body
router.post("/", auth, async (req, res) => {
try {
    // 1. joi validation
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error);

    // 2. find user cart
    let cart = await Cart.findOne({ userId: req.payload._id, active: true });
    if (!cart)
    return res.status(404).send("No active cart available for this user");
//check if the product already exist in the cart
let productToFind = cart.products.find((p) => p._id == req.body._id);

    if (productToFind) {
        let indexToUpdate = cart.products.findIndex((p) => p._id == req.body._id);
        cart.products[indexToUpdate].quantity++;
        cart.markModified("products");
    } else {
    cart.products.push({ ...req.body, quantity: 1});
    }
    await cart.save();

    // 4 . return a response
    res.status(201).send("Product added successfully to cart!");
} catch (error) {
    res.status(400).send(error);
}

});

//get cart by id 
router.get("/", auth, async (req, res) => {

    try {

    let cart = await Cart.findOne({ userId: req.payload._id, active: true });

    if (!cart){
      cart = new Cart({
        userId: req.payload._id,
        active: true,
        products: [], 
      });
    }

    await cart.save();
    res.status(200).json({
        cartId: cart._id,
        products: cart.products,
      });

    } catch (error) {

    res.status(400).send(error);

    }

});


// Delete Product from cart
router.delete("/:userId", auth, async (req, res) => {
    try {
      const productId = req.body.productId; // Assuming productId is sent in the request body
  
      // Find the user's active cart
      let cart = await Cart.findOne({ userId: req.payload._id, active: true });
  
      if (!cart) {
        return res.status(404).send("No active cart available for this user");
      }
  
      // Check if the product exists in the cart
      const productIndex = cart.products.findIndex((p) => p._id == productId);
  
      if (productIndex !== -1) {
        // Decrease the quantity or remove the product from the cart
        if (cart.products[productIndex].quantity > 1) {
          cart.products[productIndex].quantity--;
          cart.markModified("products");
        } else {
          // If the quantity is 1, remove the product from the array
          cart.products.splice(productIndex, 1);
          cart.markModified("products");
        }
  
        // Save the updated cart
        await cart.save();
  
        // Return a response indicating successful deletion
        res.status(200).send("Product deleted successfully from the cart!");
      } else {
        // If the product is not in the cart, return a 404 response
        res.status(404).send("Product not found in the cart");
      }
    } catch (error) {
      // Handle errors
      console.error('Error deleting product from cart:', error);
      res.status(400).send(error);
    }
  });
  

//Deactivate cart
router.delete('/', auth, async (req, res) => {
  try {
    // Find the active cart for the authenticated user
    const cart = await Cart.findOneAndDelete({ userId: req.body.userId, active: true });

    // If the cart is not found, return a 404 response
    if (!cart) {
      return res.status(404).json({ error: 'Active cart not found for the user' });
    }

    // Respond with a success message or any other relevant data
    res.status(200).json({ message: 'Active cart deleted successfully' });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;