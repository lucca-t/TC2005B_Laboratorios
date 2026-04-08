const db = require('../util/database');
const bcrypt = require('bcryptjs');


module.exports = class User {
  constructor(mi_username, mi_nombre, mi_password, mi_correo) {
    this.username = mi_username;
    this.nombre = mi_nombre;
    this.password = mi_password;
    this.correo = mi_correo;
  }

  saveWithStoredProcedure(defaultRoleId = 1) {
    return bcrypt.hash(this.password, 12).then((passwordCifrado) => {
      return db.execute(
          'CALL sp_register_user(?, ?, ?, ?, ?)',
          [this.username, this.nombre, passwordCifrado, this.correo, defaultRoleId],
      ).then(([resultSets]) => {
        const statusRows = Array.isArray(resultSets) && Array.isArray(resultSets[0]) ? resultSets[0] : [];
        return statusRows[0] || null;
      });
    });
  }

  static fetchAuthContext(username) {
    return db.execute('CALL sp_get_user_auth_context(?)', [username]).then(([resultSets]) => {
      const userRows = Array.isArray(resultSets) && Array.isArray(resultSets[0]) ? resultSets[0] : [];
      const permisoRows = Array.isArray(resultSets) && Array.isArray(resultSets[1]) ? resultSets[1] : [];
      return {
        user: userRows[0] || null,
        permisos: permisoRows,
      };
    });
  }
};
