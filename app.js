const NodeLRU = require('./lib/NodeLRU');
const LRU = new NodeLRU();


LRU.setup('file',{
    // path : '/home/medibox',
    // fileName : 'sagar',
    count : 50
});

LRU.set('one','sagar');
LRU.set('two','arif');
LRU.set('three','kunal');
LRU.set('one','rihana');
let oneData = LRU.get('one');
console.log('one : ',oneData);

console.log('\nDelete data at two key')
LRU.delete('two'); 
var twoData = LRU.get('two');
console.log('two : ',twoData);
var threeData = LRU.get('three');
console.log('three : ',threeData);

let res = LRU.import('/home/medibox/Desktop/importFile.csv');

LRU.export('/home/medibox/Desktop/exportFile.csv');



// LRU.setup('mongo',{
//     "host": "localhost",
//     "port": 27017,
//     "username": null,
//     "password": null,
//     "db": "medibox",
//     count : 50
// });

// LRU.set('one11','sagar');
// LRU.set('one12','sagar12');
// LRU.set('one13','sagar13');
// LRU.set('one12','gayatri');

// var data1 = LRU.get('one12');
// console.log('\n one12 : ',data1);


