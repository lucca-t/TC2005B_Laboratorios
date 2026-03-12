const db = require('../util/database');
const bcrypt = require('bcryptjs');


module.exports = class User {

    constructor(mi_username, mi_nombre, mi_password, mi_correo) {
        this.username = mi_username;
        this.nombre = mi_nombre;
        this.password = mi_password;
        this.correo = mi_correo;
    }

    save() {
        return bcrypt.hash(this.password, 12).then((password_cifrado) => {
            return db.execute(
                "INSERT INTO usuarios(username, nombre, password, correo) VALUES (?, ?, ?, ?)",
                [this.username, this.nombre, password_cifrado, this.correo]
            );
        });
    }
    
    static fetchOne(username) {
        return db.execute("SELECT * FROM usuarios WHERE username = ?", [username]);
    }

    static getPermisos(username) {
        return db.execute(
            `SELECT DISTINCT pr.nombre_privilegio
             FROM tiene t
             JOIN posee p ON t.id_rol = p.id_rol
             JOIN privilegios pr ON p.id_privilegio = pr.id
             WHERE t.id_usuario = ?`,
            [username]
        );
    }

}