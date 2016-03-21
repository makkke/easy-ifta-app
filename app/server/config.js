const config = {
  port: process.env.PORT || 80,
  mongoURL: process.env.MONGO_URL || 'mongodb://db:27017/simple-ifta',
}

export default config
