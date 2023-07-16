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

// INSERTION INITIALE DES RECETTES
// console.log(recipes)

function createRecipeCards(recipes) {
    recipes.forEach(recipe => {
      createRecipeCard(recipe);
      totalRecipes++;
    });
}
createRecipeCards(recipes);



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
                    })
                }
            </div>
        </div>
    `;
    
    sectionCards.appendChild(sectionCard)
}


// total du nombre de recettes affichées à l'ecran
countRecipes.append(totalRecipes , " Recettes")


// affichage du tag en etiquette jaune
let dataListInputs = document.querySelectorAll(".dataListInput");
// console.log(dataListInputs)

dataListInputs.forEach(dataListInput => {
    dataListInput.addEventListener("change", function() {
        let selectedOption = dataListInput.value;
        // console.log(selectedOption);

        const tags = document.querySelector(".tags")
        // console.log(tags)

        const tag = document.createElement("div")
        tag.classList.add('tag')
        // console.log(tag)

        tag.innerHTML = `
        <div class="badge text-bg-warning  p-2">
            <span>${selectedOption}</span>
            <img src="img/close.svg" alt="close button" style="width: 15px;" class="closeBtn" onClick="closeBtn()">
        </div>`
       
        tags.appendChild(tag) 
        
    });
})

// MARCHE BOF : EVENT EST DEPRECIE ET NE SE REAFFICHE PAS SI ON RECLIQUE SUR LE BOUTON 
function closeBtn() {
    var closeBtn = event.target;
    var tagDiv = closeBtn.closest(".tag");
    tagDiv.style.display = "none";
}
  



