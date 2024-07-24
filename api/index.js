import express from "express";
const app=express()
import authRoute from "./routes/auth.js"
import postRoute from "./routes/posts.js"
import commentRoute from "./routes/comments.js"
import likeRoute from "./routes/likes.js"
import userRoute from "./routes/users.js"
import cors from "cors";
import CookiePaser from "cookie-parser";
import cookieParser from "cookie-parser";

//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);
app.use("/api/likes",likeRoute);


app.listen(5500,()=>{
    console.log("API working!")
})