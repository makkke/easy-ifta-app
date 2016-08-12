export default {
  env: process.env.NODE_ENV || 'development',

  // Root path of server
  root: __dirname,

  // Server port
  port: process.env.PORT || 8080,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Mongodb connection options
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://admin:admin@ds031618.mlab.com:31618/simple-ifta-development',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'ilovejameswoods',
  },

  api: {
    url: process.env.API_URL || '/api',
  },
}
