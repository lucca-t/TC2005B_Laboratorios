const quotes = [
    { character: "Logan Roy", text: "I love you but you are not serious people." },
    { character: "Kendall Roy", text: "I am the eldest boy." },
    { character: "Roman Roy", text: "Everything is always about everything, all the time." },
    { character: "Siobhan Roy", text: "I don't get embarrassed." },
    { character: "Greg Hirsch", text: "You can't make a Tomelette without breaking some Greggs." },
    { character: "Logan Roy", text: "What you're feeling right now, that's the pain of losing." },
    { character: "Kendall Roy", text: "We are nothing." },
];


module.exports = class Modelo {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(my_character, my_text) {
        this.character = my_character;
        this.text = my_text;

    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        quotes.push({
            character: this.character,
            text: this.text
        });
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return quotes;
    }

}