function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error!');
        }, sec * 1000);
    });
}

wait(3).catch(e => {
    console.log('1st catch ', e);
});

/* chain은 같은 객체를 반환할 때만 가능함*/
wait(3).catch(e => {
    console.log('1st catch ', e);
})  // wait 함수의 오류를 받음
    .catch(e => {
        console.log('1st catch ', e);
    });   // 위 catch 구문의 상태를 받음. 오류를 잘 받았으므로 오류가 발생하지 않음

/* chain을 하고 싶을 땐 */
wait(3).catch(e => {
    console.log('1st catch ', e);
    throw e;
})
    .catch(e => {
        console.log('1st catch ', e);
    });

wait(3).then(() => {
    console.log('Success');   // 성공했을 경우
}, e => {
    console.log('Catch in Then ', e);    // 실패했을 경우
})
