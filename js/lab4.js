// 1. Tabla de cuadrados y cubos
function tablaCuadradosCubos() {
    const cont = document.getElementById('tabla');
    cont.innerHTML = `<form onsubmit="event.preventDefault(); mostrarTabla();">
        <label>Introduce un número: <input type='number' id='numTabla' min='1' required></label>
        <button type='submit'>Generar tabla</button>
    </form><div id='tablaRes'></div>`;
}
function mostrarTabla() {
    let n = Number(document.getElementById('numTabla').value);
    let html = '<table border="1"><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>';
    for (let i = 1; i <= n; i++) {
        html += `<tr><td>${i}</td><td>${i*i}</td><td>${i*i*i}</td></tr>`;
    }
    html += '</table>';
    document.getElementById('tablaRes').innerHTML = html;
}
tablaCuadradosCubos();

// 2. Suma aleatoria
function sumaAleatoria() {
    const cont = document.getElementById('suma');
    cont.innerHTML = `<button id='btnSuma'>Nueva suma</button><div id='sumaRes'></div>`;
    document.getElementById('btnSuma').onclick = function() {
        let a = Math.floor(Math.random()*100);
        let b = Math.floor(Math.random()*100);
        document.getElementById('sumaRes').innerHTML = `<form onsubmit='event.preventDefault(); verificarSuma(${a},${b},Date.now());'>
            ¿Cuánto es ${a} + ${b}? <input type='number' id='respSuma' required>
            <button type='submit'>Verificar</button>
        </form><div id='sumaMsg'></div>`;
    };
}
function verificarSuma(a, b, start) {
    let respuesta = Number(document.getElementById('respSuma').value);
    let end = Date.now();
    let correcto = respuesta === (a+b);
    let ms = (end-start)/1000;
    let msg = correcto ? "¡Correcto!" : `Incorrecto. La respuesta era ${a+b}`;
    document.getElementById('sumaMsg').innerHTML = `${msg}<br>Tiempo: ${ms.toFixed(2)} segundos`;
}
sumaAleatoria();

// 3. Contador de números
function contador(arr) {
    let neg = 0, ceros = 0, pos = 0;
    for (let x of arr) {
        if (x < 0) neg++;
        else if (x === 0) ceros++;
        else pos++;
    }
    return {negativos: neg, ceros: ceros, positivos: pos};
}
function contadorUI() {
    const cont = document.getElementById('contador');
    cont.innerHTML = `<form onsubmit='event.preventDefault(); mostrarContador();'>
        <label>Introduce números separados por coma: <input id='numsContador' required></label>
        <button type='submit'>Contar</button>
    </form><div id='contadorRes'></div>`;
}
function mostrarContador() {
    let arr = document.getElementById('numsContador').value.split(',').map(Number);
    document.getElementById('contadorRes').innerHTML = JSON.stringify(contador(arr));
}
contadorUI();

// 4. Promedios de matriz
function promedios(matriz) {
    return matriz.map(row => row.reduce((a,b)=>a+b,0)/row.length);
}
function promediosUI() {
    const cont = document.getElementById('promedios');
    cont.innerHTML = `<form onsubmit='event.preventDefault(); mostrarPromedios();'>
        <label>Introduce filas de números separadas por punto y coma (;), y cada número por coma (,):<br>
        <input id='matrizProm' required style='width:80%'></label>
        <button type='submit'>Calcular promedios</button>
    </form><div id='promediosRes'></div>`;
}
function mostrarPromedios() {
    let matriz = document.getElementById('matrizProm').value.split(';').map(row=>row.split(',').map(Number));
    document.getElementById('promediosRes').innerHTML = promedios(matriz).join(', ');
}
promediosUI();

// 5. Inverso de número
function inverso(num) {
    return Number(String(num).split('').reverse().join(''));
}
function inversoUI() {
    const cont = document.getElementById('inverso');
    cont.innerHTML = `<form onsubmit='event.preventDefault(); mostrarInverso();'>
        <label>Introduce un número: <input id='numInverso' required></label>
        <button type='submit'>Invertir</button>
    </form><div id='inversoRes'></div>`;
}
function mostrarInverso() {
    let num = Number(document.getElementById('numInverso').value);
    document.getElementById('inversoRes').innerHTML = inverso(num);
}
inversoUI();
