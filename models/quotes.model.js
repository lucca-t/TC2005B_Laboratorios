const db = require('../util/database');

module.exports = class Modelo {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(my_character, my_text) {
        this.character = my_character;
        this.text = my_text;

    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(
            'INSERT INTO quotes (character, text) VALUES (?, ?)',
            [this.character, this.text]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM quotes');
    }

}