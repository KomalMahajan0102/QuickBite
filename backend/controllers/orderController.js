import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    let totalAmount = 0;
    let items = req.body.items;
    for (const item of items) {
      totalAmount += item.price * item.quantity;
    }

    // Convert amount to smallest currency unit (paise)
    const razorpayOrder = await razorpay.orders.create({
      amount: (totalAmount + 20) * 100, // include delivery charge
      currency: "INR",
      receipt: newOrder._id.toString(),
      notes: {
        orderId: newOrder._id
      }
    });
    console.log("creating " + razorpayOrder);

    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });

  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }

}
const verifyOrder = async (req, res) => {
  // const { orderId, razorpayOrderId, razorpaySignature } = req.body;
  try {
    console.log("verify");
    console.log(req.body.payload.payment.entity);

    const signature = req.get("X-Razorpay-Signature");

    const secret = "mysecret123"; // Same as you set in Razorpay

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      signature,
      secret
    )

    if (!isWebhookValid) {
      console.log("✅ Valid webhook received");
      return res.status(400).json({ msg: "Webhook signature is invalid" });

    }
    const { orderId } = req.body.payload.payment.entity.notes;
    console.log("orderId:", orderId);
    console.log("req.body ", req.body);

    if (req.body.event == "payment.captured") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Paid" });

    }
    if (req.body.event == "payment.failed") {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(400).json({ success: false, message: "Not Paid" });

    }




    return res.status(200).json({ msg: "Webhook received successfully" });

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }


  // if (isWebhookValid) {
  //   console.log("✅ Valid webhook received");
  //   // Do something with req.body (e.g., update order status)
  //   res.status(200).json({ status: "ok" });
  // } else {
  //   console.log("❌ Invalid signature");
  //   res.status(400).json({ status: "invalid signature" });
  // }


  // try {
  //   const body = razorpayOrderId + "|" + razorpayPaymentId;

  //   const expectedSignature = crypto
  //     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  //     .update(body.toString())
  //     .digest("hex");

  //   if (expectedSignature === razorpaySignature) {
  //     await orderModel.findByIdAndUpdate(orderId, { payment: true });
  //     res.json({ success: true, message: "Payment verified" });
  //   } else {
  //     await orderModel.findByIdAndDelete(orderId);
  //     res.status(400).json({ success: false, message: "Payment verification failed" });
  //   }
  // } catch (error) {
  //   console.error("Verification error:", error);
  //   res.status(500).json({ success: false, message: "Verification error" });
  // }
};


// user orders for frontend
const userOrders = async (req, res) => {
  try {
    console.log("userOrders",req.body.userId );
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};



// Listing orders for admin pannel
const listOrders = async (req, res) => {
  try {

    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating status
const updateStatus = async (req, res) => {
  try {
  await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated Successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };