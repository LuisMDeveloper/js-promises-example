//my solution

"use strict";

function runAnimation(animation) {
    return "Animation animation number: " + animation;
}


/*
 |--------------------------------------------------------------------------
 | Without Promises
 |--------------------------------------------------------------------------
 | Simple 3 step animation without HTML or CSS
 |
 */
var startAnimationCycle = function () {
    console.log("start");
    setTimeout(function () {
        console.log(runAnimation(0));
        setTimeout(function () {
            console.log(runAnimation(1));
            setTimeout(function () {
                console.log(runAnimation(2));
            }, 1000);
        }, 1000);
    }, 1000);
};

//startAnimationCycle();


/*
 |--------------------------------------------------------------------------
 | With Promises
 |--------------------------------------------------------------------------
 | Simple 3 step animation without HTML or CSS, limited to test rejection
 | in chained promises.
 |
 | * Making promises
 | * Wrapping promises
 | * Chaining promises
 |
 */
var animationPromise = function (animation) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (animation < 3) {
                resolve(runAnimation(animation));
            } else {
                reject("Error: Animation out of limit.");
            }
        }, 1000);
    });
};

console.log("start");
animationPromise(0)
    .then(function (result) {
        console.log(result);
        return animationPromise(1);
    })
    .then(function (result) {
        console.log(result);
        return animationPromise(2);
    })
    .then(function (result) {
        console.log(result);
        return animationPromise(3);
    })
    .then(function (result) {
        console.log(result);
    }, function (error) {
        console.log(error);
    });