const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

// setting port
app.set('port', process.env.PORT || 8080);

// common middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting routing
app.get('/airkorea', async (req, res) => {
    const serviceKey = "****";
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

    let parmas = encodeURI('serviceKey') + '=' + serviceKey;
    parmas += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    parmas += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
    parmas += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
    parmas += '&' + encodeURI('returnType') + '=' + encodeURI('json');

    // console.log(parmas);
    const url = airUrl + parmas;
    // console.log(url);
    try {
        const result = await axios.get(url);
        res.json(result.data);  // .data
        // res.json(result.data.ArpltnInfoInqireSvcVo);
    } catch (error) {
        console.log(error);
    }
});

// connecting between server and port
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});
