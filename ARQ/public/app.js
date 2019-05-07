var ws = require('nodejs-websocket');

var server = ws.createServer(function(conn) {
 
    conn.on('text', function(str) {
 
        var data = JSON.parse(str);
        switch (data.randomNum) {
            
            case 0:
                var num = data.datanum.toString(2);
                var result = num[0] ^ num[1];
                for(var i = 1; i < num.length-1; i++){
                    result = result ^ num[i + 1];
                }
                if(result == data.checkbit){
                    console.log("数据正确");
                    console.log(data.datanum);
                    conn.sendText(JSON.stringify({
                        message: "ACK",
                        randomS: data.randomNum
                    }));
                }
                break;
        
            case 1:
                var num = data.datanum.toString(2);
                var result = num[0] ^ num[1];
                for(var i = 1; i < num.length-1; i++){
                    result = result ^ num[i + 1];
                }
                if(result != data.checkbit){
                    console.log("数据错误");
                    conn.sendText(JSON.stringify({
                        message: "NAK",
                        randomS: data.randomNum
                    }));
                }
                if(result == data.checkbit){
                    console.log("数据正确");
                    console.log(data.datanum);
                    conn.sendText(JSON.stringify({
                        message: "ACK",
                        randomS: data.randomNum
                    }));
                }
                break;

            case 2:
                if(data.datanum == "lose"){
                    console.log("数据丢失");
                }else{
                    var num = data.datanum.toString(2);
                    var result = num[0] ^ num[1];
                    for(var i = 1; i < num.length-1; i++){
                        result = result ^ num[i + 1];
                    }
                    if(result == data.checkbit){
                        console.log("数据正确");
                        console.log(data.datanum);
                        conn.sendText(JSON.stringify({
                            message: "ACK",
                            randomS: data.randomNum
                        }));
                    }
                }
                break;

            default:
                break;
        }
    });
}).listen(12345);
 

