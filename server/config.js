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
    url: process.env.MONGO_URL || 'mongodb://admin:admin@ds013456.mlab.com:13456/easy-ifta-development',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'ilovejameswoods',
  },

  api: {
    url: process.env.API_URL || '/api',
  },

  roadSoFar: {
    api: {
      url: process.env.ROAD_SO_FAR_API_URL || 'http://localhost:3000',
    },
  },
}
