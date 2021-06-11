module.exports = {
  development: {
    port: 3002, // assign your own port no
    mongoUri: 'mongodb://192.168.1.195:27017/product-location',
    logs: 'dev'
  },
  production: {
    port: 3002, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/product-location',
    logs: 'combined'
  },
  test: {
    port: 3002, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/product-location',
    logs: 'dev'
  }
};

