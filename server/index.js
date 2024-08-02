import express from 'express';
import authRouter from './routes/auth.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});