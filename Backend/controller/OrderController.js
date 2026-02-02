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


// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;   
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    }
};

//get all orders for a user
export const getOrdersByUser = async (req, res) => {
  try { 
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get all orders (admin)
export const getAllOrders = async (req, res) => {
  try { 
    const orders = await Order.find().populate("user").populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
