const personajes = [
    {
        nombre: "Logan Roy",
        descripcion: "Founder and CEO of Waystar Royco, a ruthless media mogul who rules his family and empire with an iron fist. His manipulative nature and refusal to cede control drive the central conflict of the series.",
        tipo: "Patriarch",
        imagen: "https://static.wikia.nocookie.net/succession/images/f/f2/LoganRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230613094149",
    },
    {
        nombre: "Kendall Roy",
        descripcion: "Logan's eldest son and perpetual heir apparent, caught between ambition and insecurity. He oscillates between attempting hostile takeovers of Waystar and crawling back to his father's approval.",
        tipo: "Heir",
        imagen: "https://static.wikia.nocookie.net/succession/images/0/09/KendallRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230613093831",
    },
    {
        nombre: "Roman Roy",
        descripcion: "The youngest Roy son, hiding sharp instincts behind a wall of irreverent humor and self-sabotage. He craves his father's love more than the throne but would never admit it.",
        tipo: "Wildcard",
        imagen: "https://static.wikia.nocookie.net/succession/images/e/e8/RomanRoyCharacterInfobox.png/revision/latest/scale-to-width-down/1000?cb=20230617051956",
    },
    {
        nombre: "Siobhan 'Shiv' Roy",
        descripcion: "Logan's only daughter, a political operative who pivots to the family business believing she can outmaneuver her brothers. Her confidence often blinds her to how little power she actually holds.",
        tipo: "Strategist",
        imagen: "https://static.wikia.nocookie.net/succession/images/8/85/SiobhanRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230614211118",
    },
    {
        nombre: "Greg Hirsch",
        descripcion: "Logan's grand-nephew, a bumbling outsider who stumbles into the Roy orbit and quietly accumulates leverage. His apparent naivete masks a surprising talent for self-preservation.",
        tipo: "Wildcard",
        imagen: "https://static.wikia.nocookie.net/succession/images/5/5e/GregHirschCharacterInfobox.png/revision/latest/scale-to-width-down/1000?cb=20230622215700",
    },
];

module.exports = class Modelo {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre, mi_descripcion, mi_tipo, mi_imagen) {
        this.nombre = mi_nombre;
        this.descripcion = mi_descripcion;
        this.tipo = mi_tipo;
        this.imagen = mi_imagen;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        personajes.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return personajes;
    }

}