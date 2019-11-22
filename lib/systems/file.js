var fs = require('fs');
var path = require('path');
const config = {
    readMe : function(){
        console.log('');
    },
    setup : function(connection){
        let result = {
            status : false
        };
        if(!connection.path){
            result.message = 'path missing';
            this.readMe();
            return result;
        }
        if(!fs.existsSync(connection.path)){
            result.message = 'path not found';
            this.readMe();
            return result;
        }
        if(!connection.fileName){
            result.message = 'fileName missing';
            this.readMe();
            return result;
        }
        var regex = /^[A-Za-z0-9 ]+$/;
        var isValid = regex.test(connection.fileName);
        if(!isValid){
            result.message = 'fileName Invalid(do not include extension)';
            this.readMe();
            return result;
        }
        let filePath = path.join(connection.path,connection.fileName+'.json');
        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        fs.openSync(filePath, 'w');
        result.status = true;
        connection.filePath = filePath;
        result.connection = connection;
        return result;
    },
    set : function(key,value,connection){
        let result ={
            status : false,
            connection : connection 
        }
        //write
        let data = fs.readFileSync(connection.filePath, 'utf8')
        if(!data){
            data = {};
        }else{
            data = JSON.parse(data);
        }
        data[key] = value;
        fs.writeFileSync(connection.filePath, JSON.stringify(data))
        result.connection.addedCount = result.connection.addedCount + 1 || 1;
        result.status = true;
        return result;
    },
    get : function(key,connection){
        //read
        let result = {
            status : false
        }
        try {
            let data = fs.readFileSync(connection.filePath, 'utf8')
            if(!data){
                result.message = 'No Data Found';
            }else{
                data = JSON.parse(data);
                result.status = true;
                const keyData = data[key];
                if(!keyData){
                    result.message = 'No Data Found';
                }else{
                    result.response = keyData;
                }
            }
        } catch(err) {
            console.log(err);
            result.error = err;
            return result;
        }
        return result;
    }
}
module.exports = config;