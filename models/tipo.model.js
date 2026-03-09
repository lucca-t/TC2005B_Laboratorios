const db = require('../util/database');

class Tipo {
    constructor(id, tipo) {
        this.id = id;
        this.tipo = tipo;
    }

    // Fetch all tipos from the database
    static fetchAll() {
        return db.execute('SELECT * FROM tipo');
    }
}

module.exports = Tipo;
