const config = require('./config/systems');
const messages = require('./config/messages');
var util = require('util');
var requireDir = require('require-dir');
var SystemFiles = requireDir('./systems');

class NodeLRU {
    constructor() {
        this.systemName = null;
        this.connection = null;
    }
  
    setup(systemName,option) { 
       let result = {};
       if(!config[systemName]){
           console.log(messages.SYSTEM_NOT_FOUND);
           return;
       }
       if(!util.isObject(option)){
           console.log(messages.OPTION_NOT_OBJECT);
           return result;
       }
       if(!SystemFiles[systemName]){
           console.log(messages.SYSTEM_CONFIG_MISSING);
           return;
       }
       result = SystemFiles[systemName].setup(option);
       if(result.status){
           this.connection = result.connection;
           this.systemName = systemName;
           console.log(messages.SETUP);
       }else{
           console.log(result.message);
           return;
       }
    }
    set(key,value){
        let result = {
            status : false
        }
        if(this.systemName){
            result = SystemFiles[this.systemName].set(key,value,this.connection);
            if(result.status){
                this.connection = result.connection;
            }
        }
        return result;
    }
    get(key){
        if(this.systemName){
            let result = SystemFiles[this.systemName].get(key,this.connection);
            if(result.status){
                return result.response;
            }else{
                return result.message;
            }
        }
    }

  }
  
  module.exports = NodeLRU;
  