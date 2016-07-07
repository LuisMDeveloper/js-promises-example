"use strict";

var myPromise = new Promise(function (resolve, reject) {
    // Standard AJAX request setup and load.
    var request = new XMLHttpRequest();

    // Request a user's comment from our fake blog.
    request.open('GET', 'http://jsonplaceholder.typicode.com/comments/1');

    request.onload = function () {
        if(request.status === 200) {
            resolve(request.response);
        }  else {
            reject('Page loaded, but status not OK.');
        }
    };

    request.onerror = function () {
        reject('Aww, didn\'t work at all.');
    };

    request.send();
});


var sendEmail = function (emailAddress) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('Email send to ' + emailAddress);
        }, 3000);
    });
};

myPromise
    .then(function (result) {
        return JSON.parse(result);
    })
    .then(function (parsedJSON) {
        return parsedJSON.email.toLowerCase();
    })
    .then(function (emailAddress) {
        return sendEmail(emailAddress)
    })
    .then(function (result) {
        console.log(result);
    }, function (result) {
        console.error(result);
    });


