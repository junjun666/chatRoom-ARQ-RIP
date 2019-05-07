var ws = require('nodejs-websocket');
console.log("等待连接");
var timer = setTimeout(function(){
    console.log("不可达");
},180000);
var server = ws.createServer(function(conn) {
    
    conn.on('text', function(str1) {
        clearTimeout(timer);
        console.log("接收成功");
        var str = JSON.parse(str1);

        var routerAno = "B";
        var obj = {
            N1:[5,'A'],
            N2:[3,'C'],
            N6:[6,'F'],
            N8:[4,'E']
        }

        for(var i = 0; i < Object.keys(str).length; i++){
            Object.values(str)[i][0] += 1;
            if(Object.keys(str)[i] in obj){
                for(var j = 0; j < Object.keys(obj).length; j++){
                    if(Object.keys(obj)[j] == Object.keys(str)[i]){
                        if(Object.values(str)[i][1] == Object.values(obj)[j][1]){
                            Object.values(obj)[j][0] = Object.values(str)[i][0];
                            Object.values(obj)[j][1] = Object.values(str)[i][1];
                            console.log(Object.keys(obj)[j] + " " + Object.values(str)[i] + " " + "相同的下一跳，更新");
                        }else{
                            if(Object.values(str)[i][0] >= Object.values(obj)[j][0]){
                                if(Object.values(obj)[j][1] != routerAno){
                                    console.log(Object.keys(obj)[j] + " " + Object.values(obj)[j] + " " + "不同的下一跳，距离更大或一样，不改变");
                                }else{
                                    Object.values(obj)[j][0] = Object.values(str)[i][0];
                                    Object.values(obj)[j][1] = Object.values(str)[i][1];
                                    console.log(Object.keys(obj)[j] + " " + Object.values(str)[i] + " " + "相同的下一跳，更新");
                                }
                            }else{
                                Object.values(obj)[j][0] = Object.values(str)[i][0];
                                Object.values(obj)[j][1] = Object.values(str)[i][1];
                                console.log(Object.keys(obj)[j] + " " + Object.values(str)[i] + " " + "不同的下一跳，距离更短，更新");
                            }
                        }
                        
                    }
                }
            }else{
                obj[Object.keys(str)[i]] = Object.values(str)[i];
                console.log(Object.keys(str)[i] + " " + Object.values(str)[i] + " " + "新的项目，添加进来")
            }   
        }
        console.log(obj);
    
    });
}).listen(12345);
 

