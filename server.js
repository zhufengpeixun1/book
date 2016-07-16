var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = require('mime');
var obj = [
    {name:'nodejs',price:20,count:2,id:1},
    {name:'nodejs1',price:10,count:1,id:2},
    {name:'nodejs2',price:30,count:3,id:3},
    {name:'nodejs3',price:40,count:4,id:4}
]
http.createServer(function (req,res) {
    var urlObjs = url.parse(req.url);
    var pathname = urlObjs.pathname;
    if(pathname=='/'){
        res.setHeader('content-type','text/html;charset=utf8');
        fs.createReadStream('./1.resource.html').pipe(res);
    }else if(pathname=='/favicon.ico'){
        res.statusCode = 404;
        res.end('not found');
    }else if(pathname.indexOf('/book') >-1){
        /^\/book(\/(\d+))*/g.test(pathname);
        switch (req.method){
            case 'GET':
                if(RegExp.$1){
                    obj.forEach(function (item) {
                        if(item.id == RegExp.$1.slice(1)){
                            console.log(item);
                            res.end(JSON.stringify([item]));
                    }
                    })
                }else{
                    res.end(JSON.stringify(obj))
                }
                break;
            case 'POST':
                req.on('data', function (data) {
                    var n = JSON.parse(data.toString());
                    n.id = obj.length;
                    obj.push(n)
                })
                break;
            case 'PUT':
                req.on('data', function (data) {
                   JSON.parse(data.toString()).id
                })
                break;
            case 'DELETE':

        }
    }else {
        var flag = fs.existsSync('.'+pathname);
        if(flag){
            res.setHeader('content-type',mime.lookup(pathname)+';charset=utf8');
            fs.createReadStream('.'+pathname).pipe(res);
        }else{
            res.statusCode = 404;
            res.end('not found');
        }
    }
}).listen(8888);
