console.log("Hola desde node");

const files = require("fs");

files.writeFileSync("hola.txt", "hola desde node");

setTimeout(() => {
    console.log("jojo te hackié!");
}, 15000);

const arreglo = [5000, 60, 90, 100, 10, 20, 10000, 0, 120, 2000, 340, 1000, 50];

// for (let item of arreglo) {
//     setTimeout(() => {
//         console.log(item);
//     }, item);
// } 

const http = require('http');
const server = http.createServer( (request, response) => {
    //console.log(request);
    //console.log(request);
    //console.log(request.url);
    //console.log(request.url);
    //response.end();
});



server.listen(3000);