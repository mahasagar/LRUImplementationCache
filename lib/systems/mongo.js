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
        console.log('key:  ',key);
        let checkData = await connection.model.findOne({ _id :key});
        console.log('checkData:  ',checkData);
        let createUpdateCheck = null; 
        if(checkData){
            createUpdateCheck = await connection.model.update({ _id :key },{data : value});
        }else{
            createUpdateCheck = await connection.model.create({ _id :key ,data : value});
        }
        console.log('data:  ',createUpdateCheck);
        if(createUpdateCheck){
            result.status = true;
            result.message = 'Added Successfully';
        }else{
            result.message = 'Failed To Add';
        }
        return result;
    },
    get : async function(key,connection){
        //read
        let result = {
            status : false
        }
        let keyData = await connection.model.findOne({ _id :key});
        console.log('keyData:  ',keyData);
        if(keyData){
            
        }
        return result;
    }
}
module.exports = config;