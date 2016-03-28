docker rm -f mongodb
docker run -d -p 27017:27017 --name mongodb mongo

ipconfig getifaddr en0
PORT=9000 MONGO_URL=mongodb://192.168.99.100:27017/simple-ifta npm run bs
