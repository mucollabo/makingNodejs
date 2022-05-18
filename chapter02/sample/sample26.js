// catch해 주지 않은 부분은 실행되지 않음
function f2() {
    console.log('this is f2 start');
    throw new Error('오류');   // Error 객체 - 해당하는 콜 스택 정보가 담겨 있음
    console.log('this is f2 end');    // 실행되지 않음
}

function f1() {
    console.log('this is f1 start');
    try {
        f2();
    } catch (e) {
        console.log(e);
    }
    console.log('this is f1 end');
}

f1();
