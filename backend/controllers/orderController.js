import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Paystack from 'paystack';


//api for placing order
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        
        // Clear the user's cart after order is placed
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare items for order description (Paystack doesn't use line items)
        const description = req.body.items.map(item => `${item.name} (x${item.quantity})`).join(", ") + ", Delivery fee";        

        // Initialize Paystack payment
        const paymentDetails = {
            email: req.body.address.email,  // Customer's email
            amount: (req.body.amount + 2) * 100,  // Convert amount to kobo (Nigerian currency)
            reference: `order_${newOrder._id}`,  // Reference to identify the order
            callback_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${newOrder._id}`,  // Success callback
            metadata: {
                items: req.body.items,
                userId: req.body.userId,
                orderId: newOrder._id,
                address: req.body.address
            },
            currency: 'NGN'  // Paystack uses Nigerian Naira (or adjust for the appropriate currency)
        };        

        const paystackResponse = await paystack.transaction.initialize(paymentDetails);        

        // Check if the response has the expected structure
        if (paystackResponse && paystackResponse.data && paystackResponse.data.authorization_url) {
            // Send the payment URL back to the client
            res.status(200).json({ success: true, payment_url: paystackResponse.data.authorization_url });
        } else {
            throw new Error('Failed to initialize payment with Paystack');
        }
    } catch (error) {
        console.error("Paystack Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: "Order Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({ success: false, message: "Order Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//user order view 
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


//api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.status(200).json({ success: true, message: "Order Updated" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };