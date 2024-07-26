import express from "express";
const app=express()
import authRoute from "./routes/auth.js"
import postRoute from "./routes/posts.js"
import commentRoute from "./routes/comments.js"
import likeRoute from "./routes/likes.js"
import userRoute from "./routes/users.js"
import cors from "cors";
import multer from "multer";
import CookiePaser from "cookie-parser";
import cookieParser from "cookie-parser";

//middleware
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})
app.use(cors({
    origin:"http://localhost:3000",
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage: storage });
app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename);
})

app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);
app.use("/api/likes",likeRoute);


app.listen(5500,()=>{
    console.log("API working!")
})