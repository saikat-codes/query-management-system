const express = require("express");

const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const cookieParser = require('cookie-parser')
const queryRoutes = require("./routes/queryRoutes");
const authRoutes = require('./routes/authRoutes')




connectDB();

const app = express();

//middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/queries", queryRoutes);
app.use('/api/auth', authRoutes)

app.get("/", function (req, res) {
  res.send("QueryFlow API is running");
});

//port
app.listen(process.env.PORT || 5000, function () {
  console.log("Server is running on port 5000");
});
