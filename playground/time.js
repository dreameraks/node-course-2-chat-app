/*
var date = new Date();

console.log(date.getMonth());
*/
const moment = require('moment');

var createdAt = new Date().getTime();

console.log(moment().valueOf());

var date = moment(createdAt);

console.log(date.format('MMMM YYYY'));
