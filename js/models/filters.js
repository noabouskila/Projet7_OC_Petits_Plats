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

// Sélectionnez tous les inputs
const dataListInputs = document.querySelectorAll(".dataListInput");

dataListInputs.forEach(dataListInput => {
  dataListInput.addEventListener("input", function() {
    const selectedOption = dataListInput.value.trim().toLowerCase();
    console.log("selectedOption",selectedOption)

    if (optionsArrayIngr.some(option => option.value.trim().toLowerCase() === selectedOption)) {
      createTag(selectedOption);
    } else if (optionsArrayUst.some(option => option.value.trim().toLowerCase() === selectedOption)) {
      createTag(selectedOption);
    } else if (optionsArrayApp.some(option => option.value.trim().toLowerCase() === selectedOption)) {
      createTag(selectedOption);
    }
    else{
      console.log("L'élément ", selectedOption, "n'est pas présent dans la liste d'options.");
    }
  });
});


function createTag(selectedOption) {
  const tags = document.querySelector(".tags");
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.innerHTML = `
      <div class="badge text-bg-warning  p-2">
          <span>${selectedOption}</span>
          <img src="img/close.svg" alt="close button" style="width: 15px;" class="closeBtn" onClick="closeBtn()">
      </div>`;
  tags.appendChild(tag);
}


// MARCHE BOF : EVENT EST DEPRECIE ET NE SE REAFFICHE PAS SI ON RECLIQUE SUR LE BOUTON 
function closeBtn() {
  var closeBtn = event.target;
  var tagDiv = closeBtn.closest(".tag");
  tagDiv.style.display = "none";
}
  