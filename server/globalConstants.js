const config = {
  user: 'testing',
  password: 'test',
  server: 'user-PC', 
  database: 'ecommerce',
  options:{
    enableArithAbort:true
  }
};

const JWT_SECRET_KEY = 'ShubhamTestingJWTLogin'

module.exports = {
  config,
  JWT_SECRET_KEY
}