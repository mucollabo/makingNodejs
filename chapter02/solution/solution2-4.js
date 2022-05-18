// function work(sec, callback) {
//     setTimeout(() => {
//         callback(new Date().toISOString());
//     }, sec * 1000);
// };

// work(1, (result) => {
//     console.log('첫 번째 작업', result);

//     work(1, (result) => {
//         console.log('두 번째 작업', result);
//     });
// });

function work(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
};

work(1).then((result) => {
    console.log('첫 번째 작업', result);
    return work(1);
}).then((result) => {
    console.log('두 번째 작업', result);
});
