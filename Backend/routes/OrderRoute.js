import express from 'express';
import { createOrder, getOrderById, updateOrderStatus, getAllOrders, getOrdersByUser} from '../controller/OrderController.js';

const OrderRouter = express.Router();

// Route to create a new order
OrderRouter.post('/createOrder', createOrder);    
// Route to get orders for a specific user
OrderRouter.get('/getOrdersByUser/:userId', getOrdersByUser);
// Route to get all orders (admin only)
OrderRouter.get('/getAllOrders', getAllOrders);    
// Route to get an order by ID
OrderRouter.get('/getOrderById/:id', getOrderById);    
// Route to update order status
OrderRouter.put('/updateOrderStatus/:id', updateOrderStatus);

export default OrderRouter;