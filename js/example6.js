"use strict";
function getPlaceholder(url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url);

        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(new Error(request.status));
            }
        };
        request.onerror = function (error) {
            reject(error);
        };
        request.send();
    });
}

Promise.all([
        //1.- Download two files from a server
        getPlaceholder("http://jsonplaceholder.typicode.com/posts/1"),
        getPlaceholder("http://jsonplaceholder.typicode.com/posts/2")
    ])
    .then(function (posts) {
        //2.- Extract some data from each of them
        var postsJSON = [];
        posts.forEach(function (post) {
            postsJSON.push(JSON.parse(post));
        });
        return postsJSON;
    })
    .then(function (posts) {
        //3.- Use this to decide on a third file to download
        //posts[0].userId = 2;
        if (posts[0].userId == posts[1].userId) {
            return getPlaceholder("http://jsonplaceholder.typicode.com/posts?userId="+posts[0].userId);
        } else {
            throw new Error("rejected");
        }
    })
    .then(function (posts) { //4.- Display the data from the third file to the user with alert(), or in case of an error, display an alert() with the received error message instead
        alert(posts);
    }, function (error) {
        alert(error);
    });

