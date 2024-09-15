const parser = require("body-parser");
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3000;
require('dotenv').config();
const productosRoutes = require('./routes/productosRoutes');
const authRoutes = require("./routes/authentication");


app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use('/api', productosRoutes);
app.use("/api", authRoutes);
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conexión exitosa'))
  .catch((error) => console.log(error));

// Conexión al puerto
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
