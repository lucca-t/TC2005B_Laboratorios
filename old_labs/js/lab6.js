
function sumItems() {
    var c0Input = Number(document.getElementById("cart0").value);
    var c1Input = Number(document.getElementById("cart1").value);
    var c2Input = Number(document.getElementById("cart2").value);

    var c0Cost = Number(document.getElementById("cart0").parentElement.dataset.price);
    var c1Cost = Number(document.getElementById("cart1").parentElement.dataset.price);
    var c2Cost = Number(document.getElementById("cart2").parentElement.dataset.price);

    var subtotal = (c0Input * c0Cost) + (c1Input * c1Cost) + (c2Input * c2Cost);
    var subtotalStr = "$" + subtotal.toFixed(2).toString();
    document.getElementById("subtotal").innerHTML = subtotalStr;
    
    var IVAStr  = "$" + (subtotal*.29).toFixed(2).toString();
    document.getElementById("IVA").innerHTML = IVAStr;
    
    var totalStr  = "$" + (subtotal*.29 + subtotal).toFixed(2).toString();
    document.getElementById("total").innerHTML = totalStr;
    
    //console.log(`matcha count = ${c0Input} labubu count = ${c1Input} angela davis count = ${c2Input} subtotal ${subtotal}` );
}

document.getElementById("cart0").addEventListener("input",sumItems);
document.getElementById("cart1").addEventListener("input",sumItems);
document.getElementById("cart2").addEventListener("input",sumItems);

// Ver cada pregunta
var questionItems = document.getElementsByClassName("question-item");
for (var i = 0; i < questionItems.length; i++) {
    questionItems[i].addEventListener("click", function() {
        var answer = this.nextElementSibling;
        var icon = this.querySelector(".toggle-icon");
        
        if (answer.style.display === "none") {
            answer.style.display = "block";
            icon.textContent = " ▲";
        } else {
            answer.style.display = "none";
            icon.textContent = " ▼";
        }
    });
}


