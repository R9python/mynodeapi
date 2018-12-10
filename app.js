var Mock = require('mockjs')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Server startup success, listening on port ${port}!`))

//-------------------- rest --------------------
//根据运单号获取两个电话号码 (为实名使用)
app.post('/rest/oms.waybill.mail.getPersonPhone', function (req, res) {
    // res.send('Hello World!')

        var data = Mock.mock({
            "code": 0,
            "msg": "OK",
            "data": {
              "orderPickup": {
                "orderMobile": /^1[385][1-9]\d{8}/,
                "orderPhone": /\d{3,4}\-\d{8}/,
                "contactPhone": /^1[385][1-9]\d{8}/
              }
            },
            "traceId": "@guid"
          })
    res.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
    res.end(JSON.stringify(data));
})


//外部运力查询
app.post('/rest/ecs.zc.driver.erp.findDriverInfoByDriverName.do', function (req, res) {

    var data = Mock.mock({
        "code": 200,
        "msg": "未知异常",
        "data": [{
          "id": '@id',
          "identityNumber": '@id',
          "inOffice|1": ["10", "20"],
          "name": "@cname()",
          "networkName|1": ["@cword(3,5)中转场", "@cword(3, 5)点部"],
          "companyMobile": /^1[38569][1-9]\d{8}/,
          "privateMobile": /^1[38569][1-9]\d{8}/
        }],
        "view": 0,
        "success": false
      })
    res.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
    res.end(JSON.stringify(data));
})
