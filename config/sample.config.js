module.exports = {
    application: {
      port: 3000,
    },
    db: {
      host: '',
      user: '',
      password: '',
      database: '',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  };