// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;
const corsOption={
    origin:'https://statuesque-sunburst-a1b092.netlify.app',
    credentials:true
};
app.use(cors(corsOption)); 
app.set("trust proxy",1);

app.use(session({
    name: 'session',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        //expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 15 
    },
    store: MongoStore.create({
      mongoUrl: dbUrl,
      secret:'secret',
      touchAfter: 24 * 60 * 60
    })
}));
// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());

//



// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});

