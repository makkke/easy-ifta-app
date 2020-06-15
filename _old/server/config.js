export default {
  env: process.env.NODE_ENV || 'production',

  // Root path of server
  root: __dirname,

  // Server port
  port: process.env.PORT || 8080,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  api: {
    url: process.env.API_URL || '/api',
  },

  roadsofar: {
    api: process.env.ROAD_SO_FAR_API || 'http://roadsofar',
  },
}
