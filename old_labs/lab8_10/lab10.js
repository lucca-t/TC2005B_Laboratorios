const http = require('http');
const fs = require('fs');

// Array de items que NO son de LOL
const items = [
  {
    nombre: 'Labubu',
    descripcion: 'El adorable monstruito de peluche que todos aman',
    categoria: 'juguete',
    imagen: '../media/labubu.png',
  },
  {
    nombre: 'Angela Davis',
    descripcion: 'Icono de los derechos civiles y activista revolucionaria',
    categoria: 'persona',
    imagen: '../media/angela.jpg',
  },
  {
    nombre: 'Matcha',
    descripcion: 'Delicioso té verde japonés en polvo, perfecto para cualquier momento',
    categoria: 'bebida',
    imagen: '../media/matcha.png',
  },
];

// Plantillas HTML
const html_header = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Lab 10</title>
    <style>
        body { font-family: Arial; margin: 40px; }
        .item { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
        .item img { max-width: 200px; height: auto; border-radius: 8px; }
    </style>
</head>
<body>
    <h1><a href="/">Lab 10 - Rutas y Formas</a></h1>
`;

const html_footer = `
</body>
</html>
`;

// TODO: Crea tu formulario aquí
const html_form = `
    <h2>Agregar nuevo item</h2>
    <form action="/submit" method="POST">
        <label>Nombre:</label><br>
        <input type="text" name="nombre" required><br><br>
        
        <label>Descripción:</label><br>
        <input type="text" name="descripcion" required><br><br>
        
        <label>Categoría:</label><br>
        <input type="text" name="categoria" required><br><br>
        
        <label>Imagen (ruta):</label><br>
        <input type="text" name="imagen" placeholder="/media/ejemplo.jpg" required><br><br>
        
        <input type="submit" value="Guardar">
    </form>
    <a href="/">Regresar</a>
`;

// Crear el servidor
const server = http.createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  // Ruta 1: Página principal
  if (request.url == '/' && request.method == 'GET') {
    // TODO: Muestra todos los items del array
    let html_content = `
            <a href="/new">Agregar nuevo item</a>
            <div>
        `;

    // Loop de items y muestra cada uno
    for (const item of items) {
      html_content += `
                <div class="item">
                    <h3>${item.nombre}</h3>
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <p><strong>Descripción:</strong> ${item.descripcion}</p>
                    <p><strong>Categoría:</strong> ${item.categoria}</p>
                </div>
            `;
    }

    html_content += `</div>`;

    response.setHeader('Content-Type', 'text/html');
    response.write(html_header + html_content + html_footer);
    response.end();
  }

  // Ruta 2: Mostrar el formulario
  else if (request.url == '/new' && request.method == 'GET') {
    response.setHeader('Content-Type', 'text/html');
    response.write(html_header + html_form + html_footer);
    response.end();
  }

  // Ruta 3: Recibir el POST del formulario
  else if (request.url == '/submit' && request.method == 'POST') {
    const datos_completos = [];

    // 1. Junta los chunks de datos
    request.on('data', (chunk) => {
      console.log('Recibiendo chunk de datos...');
      datos_completos.push(chunk);
    });

    // 2. Cuando termina de recibir datos
    request.on('end', () => {
      // Convertir los chunks a string
      const string_datos = Buffer.concat(datos_completos).toString();
      console.log('Datos recibidos:', string_datos);

      // 3. Parsear los datos (viene como: nombre=Test&descripcion=...&categoria=...&imagen=...)
      const params = string_datos.split('&');
      const nuevo_item = {
        nombre: decodeURIComponent(params[0].split('=')[1]),
        descripcion: decodeURIComponent(params[1].split('=')[1]),
        categoria: decodeURIComponent(params[2].split('=')[1]),
        imagen: decodeURIComponent(params[3].split('=')[1]),
      };

      // 4. Agregar al array de items
      items.push(nuevo_item);
      console.log('Item agregado:', nuevo_item);

      // 5. Guardar en archivo
      const texto_para_archivo = `${nuevo_item.nombre}|${nuevo_item.descripcion}|${nuevo_item.categoria}|${nuevo_item.imagen}\n`;
      fs.appendFileSync('items.txt', texto_para_archivo);
      console.log('Guardado en items.txt');

      // 6. Mandar respuesta
      response.setHeader('Content-Type', 'text/html');
      response.write(html_header);
      response.write(`
                <h2>Item guardado exitosamente</h2>
                <div class="item">
                    <h3>${nuevo_item.nombre}</h3>
                    <img src="${nuevo_item.imagen}" alt="${nuevo_item.nombre}">
                    <p><strong>Descripción:</strong> ${nuevo_item.descripcion}</p>
                    <p><strong>Categoría:</strong> ${nuevo_item.categoria}</p>
                </div>
                <a href="/">Ver todos los items</a> | <a href="/new">Agregar otro</a>
            `);
      response.write(html_footer);
      response.end();
    });
  }

  // Ruta para servir archivos de media (imágenes)
  else if (request.url.startsWith('/media/')) {
    const filePath = `..${request.url}`; // ../media/labubu.png

    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end('Imagen no encontrada');
      } else {
        // Determinar el tipo de contenido según la extensión
        if (request.url.endsWith('.png')) {
          response.setHeader('Content-Type', 'image/png');
        } else if (request.url.endsWith('.jpg') || request.url.endsWith('.jpeg')) {
          response.setHeader('Content-Type', 'image/jpeg');
        } else if (request.url.endsWith('.gif')) {
          response.setHeader('Content-Type', 'image/gif');
        }
        response.write(data);
        response.end();
      }
    });
  }

  // 404 - Página no encontrada
  else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.write(html_header + '<h2>404 - Página no encontrada</h2>' + html_footer);
    response.end();
  }
});

server.listen(3000);
console.log('Servidor corriendo en http://localhost:3000');
