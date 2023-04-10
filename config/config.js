module.exports = {
    application: {
      port: 3000,
    },
    db: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'shoppingcart',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  };