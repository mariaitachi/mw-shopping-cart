const express = require("express");
const cors = require('cors');
const { application } = require('./config/config');
const { port } = application;

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

require('./src/routes')(app);

const sequelize = require('./src/models');

sequelize
  .sync({
    alter: false,
    force: false,
  })
  .then(() => {
    // initialize default records files from app/controllers/models/default-records/**
  });

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`app listening at http://localhost:${port}`);
  });
