import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//mongodb+srv://komal:<db_password>@cluster0.tuzpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//app config
const app=express();
const port=process.env.PORT||4000;

// middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
//db connections
connectDB();

// map
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend access
  },
});

io.on("connection", (socket) => {
  socket.on("send-location",(data)=>{
    io.emit("receive-location",{id:socket.id,...data});
  })
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    
    res.send("API Working")
})
server.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})