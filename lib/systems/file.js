var fs = require('fs');
var path = require('path');
const os = require('os');
const config = {
    readMe : function(){
        console.log('');
    },
    setup : function(connection){
        let result = {
            status : false
        };
        if(!connection.path){
            connection.path = os.homedir();
        }
        if(!fs.existsSync(connection.path)){
            result.message = 'path not found';
            this.readMe();
            return result;
        }
        if(!connection.fileName){
            connection.fileName = 'lruConfig'
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
    delete : function(key,connection){
       let result = {
            status : false
        }
        let data = fs.readFileSync(connection.filePath, 'utf8')
        if(!data){
            result.message = 'No Data Found';
        }else{
            data = JSON.parse(data);
            delete data[key];
            fs.writeFileSync(connection.filePath, JSON.stringify(data))
            result.connection = connection;
            result.connection.addedCount = result.connection.addedCount - 1 || 0;
            result.status = true;
        }
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
    },
    import : function(filePath,connection){
        let result = {
            status : false,
            connection : connection
        };
        if(!fs.existsSync(filePath)){
            result.message = 'path not found';
            this.readMe();
            return result;
        }
        let data = fs.readFileSync(filePath, 'utf8');
        data = data.split('\n');
        for(let i of data){
            let oneData = i.split(',');
            let key = oneData[0];
            let value = oneData[1];
            if(key && value){
                let res = this.set(key,value,connection);
            }
        }
        result.message = 'File Import Done';
        result.status = true;
        return result;
    },
    export :  function(filePath,connection){
        let result = {
            status : false,
            connection :connection
        };
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
        let data = fs.readFileSync(connection.filePath, 'utf8');
        data = JSON.parse(data);
        let keys = Object.keys(data)
        for(let i in keys){
            let key = i;
            if(data[''+i]){
                let value = data[''+i];
                let finalData = key+','+value+'\n';
                fs.appendFileSync(filePath, finalData);
                // fs.writeFileSync(filePath,finalData)
            }
        }
        result.message = 'File Export : '+filePath;
        result.status = true;
        return result;
    }
}
module.exports = config;