// solution of post http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/

"use strict";

/*
 Test that running new Promise will immediately call the function passed in as an argument.
 */
var promise = new Promise(function () {
    console.log("new Promise()")
});

function delay(interval) {
    return new Promise(function (resolve) {
        setTimeout(resolve, interval);
    });
}

var oneSecondDelay = delay(1000);

function animationTimeout(step, interval) {
    return new Promise(function (resolve, reject) {
        if (isAnimationSupported(step)) {
            setTimeout(resolve, interval);
        } else {
            reject('animation not supported');
        }
    });
}

//var firstKeyframe = animationTimeout(1, 1000);

/*
 Test that exception thrown inside promise reject the promise.
 */

function testException() {
    return new Promise(function (resolve, reject) {
        throw new Error("Error Inside Promise");
        resolve("All OK")
    });
}

/*
 Failure handler only
 */
testException().then(null, function (error) {
    console.log(error);
});

delay(1000)
    .then(function () {
        return 5;
    })
    .then(function (value) {
        return value * 10;
    })
    .then(function (value) {
        return value / 2;
    })
    .then(function (value) {
        return value * 4;
    })
    .then(function (value) {
        console.log(value); // 5
    });

delay(1000)
    .then(function () {
        console.log('1 second elapsed');
        return delay(1000);
    })
    .then(function () {
        console.log('2 seconds elapsed');
    });

function runAnimation(animation) {
    return "Animation animation number: " + animation;
}

console.log(runAnimation(0));
delay(1000)
    .then(function () {
        console.log(runAnimation(1));
        return delay(1000);
    })
    .then(function () {
        console.log(runAnimation(2));
    });