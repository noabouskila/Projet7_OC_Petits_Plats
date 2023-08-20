// Selectionner les datalists
const datalistOptionsIngr = document.getElementById("datalistOptionsIngr");
const datalistOptionsUst = document.getElementById("datalistOptionsUst");
const datalistOptionsApp = document.getElementById("datalistOptionsApp");

// Récupérer la liste de tous les ingrédients du fichier JSON
const allIngredients = recipes.reduce((ingredients, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
        if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
        }
    });
    return ingredients;
}, []);

// console.log(allIngredients)

// Parcourir le tableau d'ingrédients et créer une option pour chaque ingrédient
allIngredients.forEach((ingredient) => {
  const optionIngr = document.createElement("option");
  optionIngr.value = ingredient;
  datalistOptionsIngr.appendChild(optionIngr);
});

//////////////////////USTENSILS /////////////////////////////////

// Récupérer la liste de tous les ustensils du fichier JSON
const allUstensils = recipes.reduce((ustensils, recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
      }
    });
    return ustensils;
}, []);

// console.log(allUstensils)

// Parcourir le tableau d'ingrédients et créer une option pour chaque ingrédient
allUstensils.forEach((ustensil) => {
  const optionUst = document.createElement("option");
  optionUst.value = ustensil;
  datalistOptionsUst.appendChild(optionUst);
});


///////////////////// APPAREILS/////////////////////////////////////

// Récupérer la liste de tous les ingrédients du fichier JSON
const allAppliances = recipes.reduce((appliances, recipe) => {
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }
    return appliances;
}, []);

// console.log(allAppliances)

// Parcourir le tableau d'ingrédients et créer une option pour chaque ingrédient
allAppliances.forEach((appliance) => {
  const optionApp = document.createElement("option");
  optionApp.value = appliance;
  datalistOptionsApp.appendChild(optionApp);
});



//////////////////////////TAGS//////////////////////


// Créez un tableau d'options pour chaque datalist
const optionsArrayIngr = Array.from(datalistOptionsIngr.options);
const optionsArrayUst = Array.from(datalistOptionsUst.options);
const optionsArrayApp = Array.from(datalistOptionsApp.options);

// stocker les filtres actifs  / selectionnés:
const activeFiltersUstensils = [];
const activeFiltersIngredients = [];
const activeFiltersAppareils = [];


// Sélectionnez tous les inputs
const dataListInputs = document.querySelectorAll(".dataListInput");

dataListInputs.forEach(dataListInput => {
  dataListInput.addEventListener("input", function() {
    const selectedOption = dataListInput.value.trim().toLowerCase();
    // console.log("selectedOption",selectedOption)

    // si la valeur ecrite est egale a un des filtres des ingredients presents : creer Tag
    if (optionsArrayIngr.some(option => option.value.trim().toLowerCase() === selectedOption)) {
      createTag(selectedOption, 1);
    } 
    // si la valeur ecrite est egale a un des filtres des ustensils presents : creer Tag
    else if (optionsArrayUst.some(option => option.value.trim().toLowerCase() === selectedOption)){
      createTag(selectedOption , 2);
    }
    // si la valeur ecrite est egale a un des filtres des Appareils presents : creer Tag
    else if (optionsArrayApp.some(option => option.value.trim().toLowerCase() === selectedOption)) {
      createTag(selectedOption , 3);
    }
    else{
      console.log("L'élément ", selectedOption, "n'est pas présent dans la liste d'options.");
    }
  });
});

// Creation de tags  et affichages des recettes en fonction des tags
function createTag(selectedOption, index) {

  console.log("selectedOption : ",   selectedOption, "index :", index)
  // 1) Creation de Tags
  const tags = document.querySelector(".tags");
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.innerHTML = `
      <div class="badge text-bg-warning  p-2">
          <span>${selectedOption}</span>
          <img src="img/close.svg" alt="close button" style="width: 15px;" class="closeBtn" onClick="closeBtn()">
      </div>`;
  tags.appendChild(tag);


  //2) Ajouter les filtres selectionnés dans leurs tableaux correspondants
  if (index === 1) {
    activeFiltersIngredients.push(selectedOption);
    // console.log(activeFiltersIngredients)
  } else if (index === 2) {
    activeFiltersUstensils.push(selectedOption);
    // console.log(activeFiltersUstensils)
  } else if (index === 3) {
    activeFiltersAppareils.push(selectedOption);
    // console.log(activeFiltersAppareils)
  }
  
  // Mettre à jour les recettes affichées en fonction des filtres actifs
  updateFilteredRecipes(filterRecipe);
}

let filteredRecipes = [];


function updateFilteredRecipes(filterRecipe) {
  // Mettre à jour les recettes affichées avec les recettes filtrées par le moteur de recherche principal
  console.log("filterRecipe" ,filterRecipe)
  console.log("recipes" , recipes)

  // INGREDIENTS
  // si il ya des filtres ingredients selectionnés
  if (activeFiltersIngredients.length > 0) {

    // si l'utilisateur nest pas passsé par le moteur de recherche principal : filtrer a partir de toutes les 50 recettes
    if(filterRecipe.length == 0){
      console.log("l'utilisateur n'est pas passé par le moteur de recherche principal")
      filteredRecipes = recipes.filter(recipe =>
        activeFiltersIngredients.every(filter =>
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === filter)
        )
      );
    }
    else{
      console.log("l'utilisateur est pas passé par le moteur de recherche principale")
      filteredRecipes = filterRecipe.filter(recipe =>
        activeFiltersIngredients.every(filter =>
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === filter)
        )
      );
    }
    
  }
 

  // USTENTILS
  // si il ya des filtres ustentils selectionnés
  if (activeFiltersUstensils.length > 0) {

    // si l'utilisateur nest pas passsé par le moteur de recherche principal : filtrer a partir de toutes les 50 recettes
    if(filterRecipe.length == 0){
      console.log("l'utilisateur n'est pas passé par le moteur de recherche principal")
      filteredRecipes = recipes.filter(recipe =>
        activeFiltersUstensils.every(filter =>
          recipe.ustensils.some(ustensil => ustensil.toLowerCase() === filter)
        )
      );
    }
    else{
      console.log("l'utilisateur est pas passé par le moteur de recherche principale")
      filteredRecipes = filterRecipe.filter(recipe =>
        activeFiltersUstensils.every(filter =>
          recipe.ustensils.some(ustensil => ustensil.toLowerCase() === filter)
        )
      );
    }
    
  }
 

  // APPAREILS
  // si il ya des filtres appareils selectionnés
  if (activeFiltersAppareils.length > 0) {

    // si l'utilisateur nest pas passsé par le moteur de recherche principal : filtrer a partir de toutes les 50 recettes
    if(filterRecipe.length == 0){
      console.log("l'utilisateur n'est pas passé par le moteur de recherche principal")
      filteredRecipes = recipes.filter(recipe =>
        activeFiltersAppareils.includes(recipe.appliance.toLowerCase())
      );
    }
    else{
      console.log("l'utilisateur est pas passé par le moteur de recherche principale")
      filteredRecipes = filterRecipe.filter(recipe =>
        activeFiltersAppareils.includes(recipe.appliance.toLowerCase())
      );
    }
   
  }


  // Mettre à jour les recettes affichées avec les recettes filtrées
  updateRecipeDisplay(filteredRecipes);
}


// Effacer un filtre 
function closeBtn() {
  const tagDiv = event.target.closest(".tag");
  const tagValue = tagDiv.querySelector("span").textContent;

  if (activeFiltersIngredients.includes(tagValue)) {
    const index = activeFiltersIngredients.indexOf(tagValue);
    if (index > -1) {
      activeFiltersIngredients.splice(index, 1);
    }
  } else if (activeFiltersUstensils.includes(tagValue)) {
    const index = activeFiltersUstensils.indexOf(tagValue);
    if (index > -1) {
      activeFiltersUstensils.splice(index, 1);
    }
  } else if (activeFiltersAppareils.includes(tagValue)) {
    const index = activeFiltersAppareils.indexOf(tagValue);
    if (index > -1) {
      activeFiltersAppareils.splice(index, 1);
    }
  }

  // Mettre à jour les recettes affichées en fonction des filtres actifs restants
  updateFilteredRecipes();

  tagDiv.remove();
}


  