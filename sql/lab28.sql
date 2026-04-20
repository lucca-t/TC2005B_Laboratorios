
USE lab17;

CREATE TABLE IF NOT EXISTS bitacora_personajes (
  id INT NOT NULL AUTO_INCREMENT,
  personaje_id INT NOT NULL,
  accion ENUM('UPDATE') NOT NULL,
  nombre_anterior VARCHAR(100) NULL,
  nombre_nuevo VARCHAR(100) NULL,
  descripcion_anterior VARCHAR(500) NULL,
  descripcion_nueva VARCHAR(500) NULL,
  tipo_anterior INT NULL,
  tipo_nuevo INT NULL,
  imagen_anterior VARCHAR(500) NULL,
  imagen_nueva VARCHAR(500) NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  changed_by VARCHAR(100) NOT NULL DEFAULT 'system',
  PRIMARY KEY (id),
  KEY idx_bitacora_personaje (personaje_id),
  CONSTRAINT fk_bitacora_personaje
    FOREIGN KEY (personaje_id) REFERENCES personajes(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELIMITER $$

DROP TRIGGER IF EXISTS trg_personajes_validate_insert$$
CREATE TRIGGER trg_personajes_validate_insert
BEFORE INSERT ON personajes
FOR EACH ROW
BEGIN
  SET NEW.nombre = TRIM(NEW.nombre);
  SET NEW.descripcion = TRIM(NEW.descripcion);

  IF NEW.nombre IS NULL OR NEW.nombre = '' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'nombre is required';
  END IF;

  IF NEW.descripcion IS NULL OR NEW.descripcion = '' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'descripcion is required';
  END IF;
END$$

DROP TRIGGER IF EXISTS trg_personajes_audit_update$$
CREATE TRIGGER trg_personajes_audit_update
AFTER UPDATE ON personajes
FOR EACH ROW
BEGIN
  IF NOT (
    OLD.nombre <=> NEW.nombre
    AND OLD.descripcion <=> NEW.descripcion
    AND OLD.tipo_id <=> NEW.tipo_id
    AND OLD.imagen <=> NEW.imagen
  ) THEN
    INSERT INTO bitacora_personajes (
      personaje_id,
      accion,
      nombre_anterior,
      nombre_nuevo,
      descripcion_anterior,
      descripcion_nueva,
      tipo_anterior,
      tipo_nuevo,
      imagen_anterior,
      imagen_nueva,
      changed_by
    )
    VALUES (
      NEW.id,
      'UPDATE',
      OLD.nombre,
      NEW.nombre,
      OLD.descripcion,
      NEW.descripcion,
      OLD.tipo_id,
      NEW.tipo_id,
      OLD.imagen,
      NEW.imagen,
      CURRENT_USER()
    );
  END IF;
END$$

DELIMITER ;


INSERT INTO personajes (nombre, descripcion, tipo_id, imagen)
VALUES ('Stewy Hosseini', 'Investor and strategic rival of Kendall', 3, '/uploads/stewy.png');

SET @lab28_personaje_id = LAST_INSERT_ID();

UPDATE personajes
SET descripcion = 'Investor and strategic rival of Kendall Roy'
WHERE id = @lab28_personaje_id;

SELECT id, personaje_id, accion, nombre_anterior, nombre_nuevo, changed_at, changed_by
FROM bitacora_personajes
WHERE personaje_id = @lab28_personaje_id
ORDER BY id DESC
LIMIT 1;

