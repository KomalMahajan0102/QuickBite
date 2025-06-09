import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://komal:Snehal5500@cluster0.tuzpk.mongodb.net/CSK?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
        console.log("DB Connected")
    })
}


