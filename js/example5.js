"use strict";

/*
 Rejection handlers in promise.then return resolved promises, not rejected ones.
 */
new Promise(function (resolve, reject) {
    reject(' :( ');
})
    .then(null, function () {
        // Handle the rejected promise
        //return Promise.reject({anything: 'anything'});
        //return Promise.reject('some description of :(');
        throw new Error('some description of :(');
    })
    .then(function (data) {
        console.log('resolved: ' + data);
    }, function (error) {
        console.error('rejected: ' + error)
    });
/*
 Make sure that you finish a "then" chain with a rejection-only handler.
 */
new Promise(function (resolve, reject) {
    resolve("Test error handling.")
})
    .then(function () {
        throw new Error("oh no.");
    })
    .then(null, function (error) {
        //return "Caution with this!"; // here you are killing your error returning a resolved promise.
        return Promise.reject(error);
    })
    .catch(function (error) { //promise.catch(onReject) = promise.then(null, onReject)
        console.error(error);
    });


function delay(interval) {
    return new Promise(function (resolve) {
        setTimeout(resolve, interval);
    });
}

function runAnimation(animation) {
    console.log("Running animation number: " + animation);
    if(animation == 2) {
        throw new Error("Animation 2 unsupported");
    }
}
function runBackup(animation) {
    console.log("Backup animation number: " + animation);
}

delay(1000)
    .then(function() {
        runAnimation(1);
        return delay(1000);
    })
    .catch(function() {
        runBackup(1);
    })
    .then(function() {
        runAnimation(2);
    })
    .catch(function() {
        runBackup(2);
    });