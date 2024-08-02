import express from 'express';
import authRouter from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter)
app.use("/api/task", taskRoutes)

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