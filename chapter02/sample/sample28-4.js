function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('throw Error!');
        }, sec * 1000);
    });
}

async function myAsyncFunc() {
    consolejljalk.log(new Date());   // Uncaught
    const result = await wait(2).catch(e => {
        console.log(e);
    });
    console.log(new Date());
}

try { myAsyncFunc(); } catch (e) { } // ==> X
myAsyncFunc().catch(e);   // ==> O
