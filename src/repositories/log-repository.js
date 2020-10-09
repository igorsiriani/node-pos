const redis = require('redis');

//Redis Connection
const redisClient = redis.createClient('6379', '127.0.0.1', {no_ready_check: true});
redisClient.select("0");

redisClient.on('error', function (err) {
    console.log('Error ' + err);
}); 

redisClient.on('connect', function() {
    console.log('Connected to Redis');
});

function _key_generator(data){
    var keys = Object.keys(data);
    return keys[0]+':'+data[keys[0]];
}

exports.post = async(dset) =>{
    var key = _key_generator(dset.key);
    redisClient.hmset(key, dset.data,function(err,data){
        if(err) console.log(err);
    });
}