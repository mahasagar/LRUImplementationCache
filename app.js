const NodeLRU = require('./lib/NodeLRU');
const LRU = new NodeLRU();


LRU.setup('file',{
    path : '/home/medibox',
    fileName : 'sagar',
    count : 50
});

LRU.set('one','sagar');
LRU.set('two','arif');
LRU.set('three','kunal');
LRU.set('one','rihana');
let data = LRU.get('one');
console.log('one : ',data);




// LRU.setup('mongo',{
//     "host": "localhost",
//     "port": 27017,
//     "username": null,
//     "password": null,
//     "db": "medibox",
//     count : 50
// });

// LRU.set('one','sagar');
// LRU.set('two','sagar');

