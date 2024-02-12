import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './Routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerOptions'; // Adjust the path to your Swagger options file

const app = express();
const port = process.env.PORT || 3001;

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongoose-boilerplate';
console.log(uri);
const connectDB = async () => {
  await mongoose
    .connect(uri)
    .then((db) => console.log(`Connected to DB`))
    .catch((err) => console.log(err));
};

app.use((req, res, next) => {
	req.decoded = {
		language: req.headers.language ? req.headers.language : 'en'
	};
	next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Be cautious with '*', adjust according to your needs
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});

export default app;