require('dotenv').config();
const redis = require('ioredis');

const PORT = process.env.REDIS_PORT;
const HOST = process.env.REDIS_HOST;
const client = new redis(PORT,HOST);
const subscriber = new redis(PORT,HOST)

const opts={
    createClient(type){
        switch(type){
            case 'client':
                return client;
            
            case 'subscriber':
                return subscriber
            
            default:
                return new redis(PORT,HOST);
        }
    }
};

module.exports = {opts}
