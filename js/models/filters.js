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

  // affichage du tag en etiquette jaune

  //SOIT JE CIBLE L'INPUT : dataListInput
  // let dataListInputs = document.querySelectorAll(".dataListInput");

  // SOIT JE CIBLE LA DATALIST : datalistOptions
  let dataListOptions = document.querySelectorAll(".datalistOptions option");
  // console.log(dataListOptions)

  dataListOptions.forEach(dataListOption => {
    // console.log(dataListOption)

    dataListOption.addEventListener("click", function(e){
      
      let selectedOption = e.target.value
      console.log(selectedOption);

      // DEBUT TAG CREATION
      const tags = document.querySelector(".tags")
      const tag = document.createElement("div")
      tag.classList.add('tag')
      tag.innerHTML = `
      <div class="badge text-bg-warning  p-2">
          <span>${selectedOption}</span>
          <img src="img/close.svg" alt="close button" style="width: 15px;" class="closeBtn" onClick="closeBtn()">
      </div>`
      tags.appendChild(tag) 
      // FIN TAG CREATION

    })
  })


// OU///////////////////////////////


// dataListInputs.forEach(dataListInput => { // je liste sur les trois filtre

//     dataListInput.addEventListener("input", function() {  // ici juste faire le filtre /!\ pas l'ajout du tag (ça se fait sur le click de l'option)
//         let selectedOption = dataListInput.value;
//         createTags(selectedOption)
//     });

    // creation de tag
    // function createTags(selectedOption){
    //     const tags = document.querySelector(".tags");
    //     const tag = document.createElement("div");
    //     tag.classList.add('tag');
    //     let divE =   document.createElement('div');
    //     let spanE =  document.createElement('span');
    //     spanE.textContent = selectedOption;
    //     let imgE =  document.createElement('img');
    //     imgE.src ="img/close.svg";
    //     imgE.addEventListener("click",closeBtn)
    //     divE.appendChild(spanE)
    //     divE.appendChild(imgE)
    //     tag.appendChild(divE)
    //     tags.appendChild(tag)
    //     dataListInput.value = ""
    // }
// })



// MARCHE BOF : EVENT EST DEPRECIE ET NE SE REAFFICHE PAS SI ON RECLIQUE SUR LE BOUTON 
function closeBtn() {
    var closeBtn = event.target;
    var tagDiv = closeBtn.closest(".tag");
    tagDiv.style.display = "none";
}
  