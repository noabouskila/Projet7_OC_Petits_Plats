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

// creation de tableau stockant le filtre selectionné trié par catégorie
const activeFiltersUstensils = [];
const activeFiltersIngredients = [];
const activeFiltersAppareils = [];

// creation de tableau stockant les filtres (tous les filtres)
let filtres = [];
// creation de tableau stockant les recettes filtrés par les filtres
let filteredRecipes = [];


// Sélectionnez tous les inputs
const dataListInputs = document.querySelectorAll(".dataListInput");

// appeler la cration de tag au click du filtre
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
      // console.log("L'élément ", selectedOption, "n'est pas présent dans la liste d'options.");
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
          <img src="img/close.svg" alt="close button" style="width: 15px;" class="closeBtn" onClick="closeBtn(filterRecipe)">
      </div>`;
  tags.appendChild(tag);


  //2) Ajouter les filtres selectionnés dans leurs tableaux correspondants
  if (index === 1) {
    activeFiltersIngredients.push(selectedOption);
    console.log("activeFiltersIngredients",activeFiltersIngredients)
  } else if (index === 2) {
    activeFiltersUstensils.push(selectedOption);
    console.log("activeFiltersUstensils",activeFiltersUstensils)
  } else if (index === 3) {
    activeFiltersAppareils.push(selectedOption);
    console.log("activeFiltersAppareils",activeFiltersAppareils)
  }

  // mettre tous les filtres confudus dans le tableau filtre avec son index
  filtres.push({selectedOption,index});
  
  // Mettre à jour les recettes affichées en fonction des filtres actifs
  // updateFilteredRecipes(filterRecipe,filtres);
  // updateFilteredRecipes(filteredRecipes,filtres);
  updateFilteredRecipes();

  console.log("filteredRecipes" ,filteredRecipes)
}


// Fonction closeBtn pour effacer un filtre
function closeBtn() {
  const tagDiv = event.target.closest(".tag");
  const tagValue = tagDiv.querySelector("span").textContent;

  // Retirer le filtre du tableau filtres
  const filterToRemove = filtres.find(filter => filter.selectedOption === tagValue);
  const filterIndex = filtres.indexOf(filterToRemove);
  filtres.splice(filterIndex, 1);

  // Retirer le filtre des tableaux de filtres actifs
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

  // Supprimer l'élément DOM du tag
  tagDiv.remove();

  // Mettre à jour les recettes affichées en fonction des filtres actifs restants
  updateFilteredRecipes();
}

// Fonction pour mettre à jour les recettes filtrées
function updateFilteredRecipes() {
  // Filtrer les recettes en fonction des filtres actifs

  // si il passse par le moteur de recherche principale 
  if(filterRecipe == 0){
    console.log("je NE passse PAS par le moteur de recherche principale")
    console.log('filtre restant',filtres)

    filteredRecipes = recipes.filter((recette) => {
      return filtres.every((filtre) => {
        console.log(recette.appliance.toLowerCase().includes(filtre.selectedOption))
        if (filtre.index === 1) {
          return recette.ingredients.some(
            (ingredient) =>
              ingredient.ingredient.toLowerCase() === filtre.selectedOption
          );
        } else if (filtre.index === 2) {
          return recette.ustensils.some(
            (ustensil) => ustensil.toLowerCase() === filtre.selectedOption
          );
        } else if (filtre.index === 3) {
          return recette.appliance.toLowerCase().includes(filtre.selectedOption);
        }
      });
    });
    
  }
  // si il NE passse PAS par le moteur de recherche principale 
  else{
    console.log("je passse par le moteur de recherche principale ")
    console.log('filtre restant',filtres)

    filteredRecipes = filterRecipe.filter((recette) => {
      return filtres.every((filtre) => {
        if (filtre.index === 1) {
          return recette.ingredients.some(
            (ingredient) =>
              ingredient.ingredient.toLowerCase() === filtre.selectedOption
          );
        } else if (filtre.index === 2) {
          return recette.ustensils.some(
            (ustensil) => ustensil.toLowerCase() === filtre.selectedOption
          );
        } else if (filtre.index === 3) {
          // return recette.appliance.includes(filtre.selectedOption);
          return recette.appliance.toLowerCase().includes(filtre.selectedOption);
        }
      });
    });
  }
 


  // Mettre à jour l'affichage des recettes et des filtres
  updateRecipeDisplay(filteredRecipes);
  updateFilterLists(filteredRecipes);
}
