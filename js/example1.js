"use strict";

var myPromise = new Promise(function (resolve, reject) {
    //Task here
    if(true) {
        resolve('Code: 200');
    } else {
        reject('Code: 400');
    }
});

myPromise.then(function (result) {
    console.log(result);
}, function (result) {
    console.log(result);
});