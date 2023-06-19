const express = require("express");
const app = express();
const port = 8080;
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/mongoose.config');
require('dotenv').config()

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/img', express.static('uploads'));

const routes = require('./routes/location.routes');
require('./routes/user.routes')(app);
routes(app);

app.listen(
  port,
  () => console.log('We are running our server, so cool!')
)