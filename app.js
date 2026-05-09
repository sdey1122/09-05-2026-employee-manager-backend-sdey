require("dotenv").config();

const express = require("express");
const connectDB = require("./app/config/db");
const routes = require("./app/routes");
const errorMiddleware = require("./app/middleware/errorMiddleware");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("RBAC Assignment System API Running...");
});
app.use(errorMiddleware);

const PORT = process.env.PORT || 7059;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
