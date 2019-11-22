const mongoose = require('mongoose');
const config = {
    readMe : function(){
        console.log('');
    },
    setup : function(connection){
        let result = {
            status : false
        };
        mongoose.connect('mongodb://' + connection.host +':'+connection.port +'/' + connection.db,{ useNewUrlParser: true,useUnifiedTopology : true });
        connection.mongoose = mongoose;
        var lruModel = new mongoose.Schema({ _id : {type: String},data :  {type: mongoose.Schema.Types.Mixed}}
            , { strict: false });
        var LruModel = mongoose.model('lruModel', lruModel);
        // LruModel.remove({});
        connection.model = LruModel;
        result.status = true; 
        result.connection = connection;
        return result;
    },
    set : async function(key,value,connection){
        let result ={
            status : false,
            connection : connection 
        }
        return result;
    },
    get : function(key,connection){
        //read
        let result = {
            status : false
        }
        
        return result;
    }
}
module.exports = config;