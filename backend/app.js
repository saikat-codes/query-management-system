require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");
const queryRoutes = require("./routes/queryRoutes");
const authRoutes = require('./routes/authRoutes');

// connect database connection pool
connectDB();

const app = express();

let allowedOrigin = 'http://localhost:5173';
if (process.env.NODE_ENV === 'production') {
  allowedOrigin = 'https://query-management-system-one.vercel.app';
}

console.log('CORS operating configuration pointing to:', allowedOrigin);

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/queries", queryRoutes);
app.use('/api/auth', authRoutes);

app.get("/", function (req, res) {
  return res.send("QueryFlow API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server environment running smoothly on port ${PORT}`);
});
