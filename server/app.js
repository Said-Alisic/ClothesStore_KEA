/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); // deprecated - https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4

const routes = require('./routes/index');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Our API is running...');
});

app.use('/api', routes);

app.listen(process.env.PORT, () => console.log(`API server listening on http://localhost:${process.env.PORT}`));
