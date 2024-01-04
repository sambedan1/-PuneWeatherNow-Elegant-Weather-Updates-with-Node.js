const http=require('http');
const fs=require('fs');
var requests = require('requests');
const homeFile=fs.readFileSync("home.html","utf-8");

const replaceVal=(tempVal,orgVal)=>{
let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
temperature=temperature.replace("{%tempmin%}",orgVal.main. temp_min);
temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
temperature=temperature.replace("{%location%}",orgVal.name);
temperature=temperature.replace("{%country%}",orgVal.sys.country);
temperature=temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
//{%tempStatus%}
return temperature;
}
const server=http.createServer((req,res)=>
{
if(req.url=="/")
{
requests("https://api.openweathermap.org/data/2.5/weather?q=pune&appid=8aae1d99a91e8224644f6b6688c6150b")
    .on('data',(chunk)=> {
      const objdata=JSON.parse(chunk);
      const arrData=[objdata];
    //  console.log(arrData[0].main.temp);
    const realTimeData= arrData.map((val)=>replaceVal(homeFile,val))
    .join("");
    //console.log(realTimeData);
    res.write(realTimeData);
      //console.log(val.main);
     // replaceVal(homeFile,val));
  
    })
    .on('end',  (err) =>{
      if (err) return console.log('connection closed due to errors', err);
     res.end();
      //console.log('end');
    });  
}
});
server.listen(8000,"127.0.0.1");