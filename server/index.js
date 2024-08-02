import express from 'express';
import authRouter from './routes/auth.routes.js';
import connectDB from './config/db.js'; 
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
    res.send("Hello world")
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
});