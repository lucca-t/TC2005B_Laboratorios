const db = require('../util/database');

module.exports = class Modelo {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre, mi_descripcion, mi_tipo, mi_imagen) {
        this.nombre = mi_nombre;
        this.descripcion = mi_descripcion;
        this.tipo = mi_tipo;
        this.imagen = mi_imagen;
    }


    //Este método servirá para guardar de manera persistente el nuevo objeto en la base de datos.
    save() {
        return db.execute(
            'INSERT INTO personajes (nombre, descripcion, tipo_id, imagen) VALUES (?, ?, ?, ?)',
            [this.nombre, this.descripcion, this.tipo, this.imagen]
        );
    }

    static fetchAll() {
        return db.execute(
            'SELECT p.id, p.nombre, p.descripcion, t.tipo, p.imagen FROM personajes p JOIN tipo t ON p.tipo_id = t.id'
        );
    }

    static fetchByName(nombre) {
        return db.execute(
            `SELECT p.id, p.nombre, p.descripcion, t.tipo, p.imagen 
            FROM personajes p 
                JOIN tipo t ON p.tipo_id = t.id 
            WHERE p.nombre LIKE ?`,
            [`%${nombre}%`]
        );
    }

    static fetchById(id) {
        return db.execute(
            'SELECT p.id, p.nombre, p.descripcion, p.tipo_id, p.imagen FROM personajes p WHERE p.id = ?',
            [id]
        );
    }

    update(id) {
        return db.execute(
            'UPDATE personajes SET nombre = ?, descripcion = ?, tipo_id = ?, imagen = ? WHERE id = ?',
            [this.nombre, this.descripcion, this.tipo, this.imagen, id]
        );
    }

}