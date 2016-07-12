const config = {
  port: process.env.PORT || 80,
  mongoURL: process.env.MONGO_URL || 'mongodb://admin:admin@ds031618.mlab.com:31618/simple-ifta-development',
}

export default config
