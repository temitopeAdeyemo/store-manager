const crypto = require('crypto');


const obj = {
  institution_number: 'I0000000001',
  channel: '1',
  bank_number: '999070',
  account_number: '5050138001',
  timestamp: '1581312432',
  // sign: '64B3A8ED8647064F5A0F830EE195F845',
};

const keys = Object.keys(obj);

function sortStringsByAscii(strings) {
  return strings.slice().sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
}

// const items = ['institution_number', 'channel', 'bank_number', 'account_number', 'timestamp'];

const sortedItems = sortStringsByAscii(keys);
console.log('Sorted items:', sortedItems);

let keyValArr = [];
let shaper = ''

for (let i of sortedItems) {
  console.log("hhhh");
  shaper = `${i}=${obj[i]}`

  keyValArr.push(shaper);
  shaper = '';
  console.log(shaper)
}

const key = 'QER5HKWePAFeFRM7RD8wPjwdWAfWPQHR';
console.log(keyValArr.join('&') + key);

const stringVal = keyValArr.join('&') + key;









// const dataToEncrypt =
//   'account_number=5050138001&bank_number=999070&channel=1&institution_number=I0000000001&timestamp=1581312432QER5HKWePAFeFRM7RD8wPjwdWAfWPQHR';

// Create a hash object
const md5Hash = crypto.createHash('md5');

// Update the hash object with the data
md5Hash.update(stringVal);

// Calculate the hash and convert it to hexadecimal representation
const md5Hex = md5Hash.digest('hex');

console.log('MD5 Hash:', md5Hex.toUpperCase());


// const a = "apple";

// console.log(a.slice());

// const v = [1, 2, 3, 7, 5];

// // console.log(v.sort((a, b) => a - b))


// function sortStringsByAscii(strings) {
//   return strings.slice().sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
// }

// const items = ['institution_number', 'channel', 'bank_number', 'account_number', 'timestamp'];

// const sortedItems = sortStringsByAscii(items);
// console.log('Sorted items:', sortedItems);
