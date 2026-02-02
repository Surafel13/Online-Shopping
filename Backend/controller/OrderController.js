import Order from "../model/Order.js";
import User from "../model/User.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, products, shippingAddress } = req.body;   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }   
    const newOrder = new Order({
      user: userId,
      products: products,
      shippingAddress: shippingAddress,         
    });
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;  
    const order = await Order.findById(orderId).populate("user").populate("products.productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
    } catch (error) {   
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
