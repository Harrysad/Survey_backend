const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();
const authApiRoutes = require('./routes/authRoutes');
const authTestApiRoutes = require('./routes/testApiRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

/* API Routes*/
// app.use('/api/auth', authApiRoutes);
// app.use('/api/test', authTestApiRoutes);
app.use('/api/survey', surveyRoutes);

/* Error Middleware*/
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});