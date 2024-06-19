import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import bodyParser from 'body-parser';
dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('App is running on port 3000')
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);