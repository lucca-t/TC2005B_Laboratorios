console.log("Hola desde node");
const fs = require("fs");

fs.writeFileSync("hola.txt", "hola desde node");

const http = require('http');

function calcularPromedio(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    } 
    let avg = sum/nums.length;
    return avg;
}

let numslist = [3,5,1,2,4,5,6,7];

// Muestra mi index.html
const server = http.createServer( (request, response) => {
    //console.log(request);
    //console.log(request);
    //console.log(request.url);
    console.log(request.url);
    //response.end();

    // Para no copiar y pegar el index.html
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err; 
        }     
        
        response.setHeader('Content-Type', 'text/html');
        response.write(html);
        response.end(); 
    });  
    

    
});

console.log(calcularPromedio(numslist));


server.listen(3000);


