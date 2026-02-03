import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection error ❌", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// Routes
import UserRouter from "./routes/UserRoutes.js";
import ProductRouter from "./routes/ProductRoute.js";
import CatagoryRouter from "./routes/CatagoryRoute.js";
import OrderRouter from "./routes/OrderRoute.js";



app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/categories", CatagoryRouter);
app.use("/api/orders", OrderRouter);






app.get("/", (req, res) => {
  res.send("Welcome to the Online Shopping API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
