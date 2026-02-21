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

function escribirTexto(texto) {

    fs.writeFileSync("escribe.txt", texto);
    console.log("Escribi texto");
}

function coinChange(coins, amount) {
    /**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
    // bottom up dp
    // amount + 1 indica un valor no posible
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) { // Checar cada cantidad de 1 al amt
        for (const coin of coins) { // Usar cada moneda
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]); // 
            }
        }
    }
    // Regresa la cantidad minima de monedas, o - 1 si no es posible 
    return dp[amount] > amount ? -1 : dp[amount];

}

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

console.log("Escribiendo texto");
escribirTexto("Este es el string que se esta escribiendo.");gi

let coins = [1,2,5];
let amount = 11;
let change = coinChange(coins,amount);

console.log(`Coins list = ${coins}, Amount = ${amount}, Min Coins = ${change}`);

server.listen(3000);


