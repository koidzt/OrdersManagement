require('dotenv').config();
require('./middleware/passport');

const db = require('./models');
const cors = require('cors');
const express = require('express');
const app = express();

const userRoute = require('./routes/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  res.status(404).send({ message: 'path not found on this server' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Completed Connect And Sync');
  })
  .catch((err) => {
    console.log(err);
  });
