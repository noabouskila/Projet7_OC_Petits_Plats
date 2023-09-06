


// GESTION CHEVRONS FILTRES 

// Sélectionnez tous les chevrons des filtres
const heads = document.querySelectorAll(".filterBtn .head");

// Parcourez chaque chevron et ajoutez un événement de clic
heads.forEach((head) => {
  head.addEventListener("click", (event) => {
    event.preventDefault();
    const parent = head.parentNode;
    // Ajoutez ou supprimez la classe 'open' pour ouvrir ou fermer le filtre
    parent.classList.toggle("open");
  });
});


// NB RECETTES
const countRecipes = document.getElementById('countRecipes')
let totalRecipes = 0


// console.log(recipes)
function createRecipeCards(recipes) {
    recipes.forEach(recipe => {
      createRecipeCard(recipe);
      totalRecipes++;
    });
}
createRecipeCards(recipes);


// generer les cards
function createRecipeCard(recipe){

    const sectionCards = document.getElementById('sectionCards')
    const sectionCard = document.createElement("div")
    sectionCard.classList.add("sectionCard")

    sectionCard.innerHTML =`

        <div class="position-relative">
            <img src="img/${recipe.image}" class="card-img-top object-fit-cover rounded-top" alt="${recipe.image}" style="height:200px">
            <span class="position-absolute rounded-pill py-1 px-3 bg-warning end-0 m-2">${recipe.time} min</span>
        </div>

        <div class="card-body p-3">
            <h4 class="card-title fw-bold mb-2">${recipe.name}</h4>
            <h5 class="mb-1 text-secondary">Recette</h5>
            <p class="card-text">${recipe.description}</p>
            <h5 class="card-title mb-2 text-secondary">Ingredients</h5>
            <div class="d-flex flex-wrap justify-content-between">
                ${
                    recipe.ingredients.map((ingredient, index) =>{
                        return `<div class="d-flex flex-column col-5">
                                    <span id="${index}">${ingredient.ingredient}</span>
                                    <span>
                                        ${ingredient.quantity!== undefined ? ingredient.quantity : ""}
                                        ${ingredient.unit!== undefined ? ingredient.unit : "" }
                                    </span>
                                </div>`
                    }).join(' ')
                }
            </div>
        </div>
    `;
    
    sectionCards.appendChild(sectionCard)
}


// total du nombre de recettes affichées à l'ecran
countRecipes.append(totalRecipes , " Recettes")









// FONCTIONS POUR QUE LA BALISE DATALIST FONCTIONNE MEME AVEC LE CHANGEMENT DE CSS

// Selection des input de chaque filtre 
const inputIngredient = document.getElementById("ingredients")
const inputUstensil = document.getElementById("Ustentiles")
const inputAppliance = document.getElementById("Appareils")

// INGREDIENTS
inputIngredient.onfocus = function () {
    datalistOptionsIngr.style.display = 'block';
    inputIngredient.style.borderRadius = "5px 5px 0 0";  
};
for (let option of datalistOptionsIngr.options) {
    option.onclick = function () {
        inputIngredient.value = option.value;
        datalistOptionsIngr.style.display = 'none';
        inputIngredient.style.borderRadius = "5px";
    }
};
  
inputIngredient.oninput = function() {
    currentFocus = -1;
    var text = inputIngredient.value.toUpperCase();
    for (let option of datalistOptionsIngr.options) {
        if(option.value.toUpperCase().indexOf(text) > -1){
        option.style.display = "block";
    }else{
        option.style.display = "none";
        }
    };
}
var currentFocus = -1;
inputIngredient.onkeydown = function(e) {
    if(e.keyCode == 40){
      currentFocus++
     addActive(datalistOptionsIngr.options);
    }
    else if(e.keyCode == 38){
      currentFocus--
     addActive(datalistOptionsIngr.options);
    }
    else if(e.keyCode == 13){
        e.preventDefault();
        if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (datalistOptionsIngr.options) datalistOptionsIngr.options[currentFocus].click();
        }
    }
}
  

// 2 )  USTENSILS
inputUstensil.onfocus = function () {
    datalistOptionsUst.style.display = 'block';
    inputUstensil.style.borderRadius = "5px 5px 0 0";  
};
for (let option of datalistOptionsUst.options) {
    option.onclick = function () {
        inputUstensil.value = option.value;
        datalistOptionsUst.style.display = 'none';
        inputUstensil.style.borderRadius = "5px";
    }
};
  
inputUstensil.oninput = function() {
    currentFocus = -1;
    var text = inputUstensil.value.toUpperCase();
    for (let option of datalistOptionsUst.options) {
        if(option.value.toUpperCase().indexOf(text) > -1){
        option.style.display = "block";
    }else{
        option.style.display = "none";
        }
    };
}
var currentFocus = -1;
inputUstensil.onkeydown = function(e) {
    if(e.keyCode == 40){
      currentFocus++
     addActive(datalistOptionsUst.options);
    }
    else if(e.keyCode == 38){
      currentFocus--
     addActive(datalistOptionsUst.options);
    }
    else if(e.keyCode == 13){
        e.preventDefault();
        if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (datalistOptionsUst.options) datalistOptionsUst.options[currentFocus].click();
        }
    }
}



// 3 )  APPAREILS
inputAppliance.onfocus = function () {
    datalistOptionsApp.style.display = 'block';
    inputAppliance.style.borderRadius = "5px 5px 0 0";  
};
for (let option of datalistOptionsApp.options) {
    option.onclick = function () {
        inputAppliance.value = option.value;
        datalistOptionsApp.style.display = 'none';
        inputAppliance.style.borderRadius = "5px";
    }
};
  
inputAppliance.oninput = function() {
    currentFocus = -1;
    var text = inputAppliance.value.toUpperCase();
    for (let option of datalistOptionsApp.options) {
        if(option.value.toUpperCase().indexOf(text) > -1){
        option.style.display = "block";
    }else{
        option.style.display = "none";
        }
    };
}
var currentFocus = -1;
inputAppliance.onkeydown = function(e) {
    if(e.keyCode == 40){
      currentFocus++
     addActive(datalistOptionsApp.options);
    }
    else if(e.keyCode == 38){
      currentFocus--
     addActive(datalistOptionsApp.options);
    }
    else if(e.keyCode == 13){
        e.preventDefault();
        if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (datalistOptionsApp.options) datalistOptionsApp.options[currentFocus].click();
        }
    }
}


//////////////////////////////////////////////////////////


// FONCTIONS COMMUNES AU 3 INPUT
function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("active");
}
function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
    }
}