
// Moteur de recherche principal
const mainSearchEngine = document.getElementById("mainSearchEngine")
mainSearchEngine.addEventListener("input",searchRecipe)
let searchTerm =""

// fonction de recherche moteur de recherche principale
function searchRecipe(){
    
    // mot clé tapé par le user
     searchTerm = document.querySelector('input[type="text"]').value.trim().replace(/\s+/g, ' ').toLowerCase();
    // let searchTerm = e.target.value.trim().replace(/\s+/g, ' ').toLowerCase()
    // console.log("searchTerm : " , searchTerm)

    // verification  motclé > de 3 caracteres et  motclé valide
    if(searchTerm.length !== '' && searchTerm.length >= 3 && validateEntry(searchTerm)){
        // console.log("+ que 3 caracteres")

        // FONCTION FILTER : filterRecipe
        const filterRecipe = recipes.filter(recipe =>{
           const filterName = recipe.name.toLowerCase()
           const filterDescription = recipe.description.toLowerCase()
           const filterIngredient = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        //    console.log(filterName)
           
           return filterName.includes(searchTerm) || filterDescription.includes(searchTerm) || filterIngredient.includes(searchTerm);
        })
        // console.log(filterRecipe)

        // affichage du contenu ET du nombre total de recettes
        if (filterRecipe.length === 0) {
            sectionCards.innerHTML = `Aucune recette ne contient '${searchTerm}'avec les éléments selctionnés. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
            countRecipes.innerHTML = `${filterRecipe.length} recettes`;
        }
        else{
            updateRecipeDisplay(filterRecipe);
            updateFilterLists(filterRecipe)
        }
    }
    else{
        // console.log("- que 3 caracteres")
        resetRecipeDisplay();
        resetFilterList();
    }  
}

// Fonction pour l'affichage des recettes filtrées
function updateRecipeDisplay(filterRecipe) {
    sectionCards.innerHTML = "";
    createRecipeCards(filterRecipe);
    countRecipes.innerHTML = `${filterRecipe.length} recettes`;
}

// Fonction pour réinitialiser l'affichage des recettes
function resetRecipeDisplay() {
    sectionCards.innerHTML = "";
    createRecipeCards(recipes);
    countRecipes.innerHTML = `${recipes.length} recettes`;
}

//Fonction pour verifier les caractères non autorisés
function validateEntry(str) {
    var letters =
      /[^a-zA-Z'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ]+/;
    if (str.match(letters)) {
      return false;
    }
    return true;
}

// fonction pour  réinitialiser les filtres
function resetFilterList(){

    // 1) enlever tous les options des filtres =""
    datalistOptionsApp.innerHTML=""
    datalistOptionsIngr.innerHTML = ""
    datalistOptionsUst.innerHTML= ""

    // 2) remettre le tableaux de filtres : allAppliances dans les filtres
    allAppliances.forEach(appliance => {
        const option = document.createElement("option");
        option.value = appliance;
        datalistOptionsApp.appendChild(option);
    });

    // 3) remettre le tableaux de filtres : allIngredients dans les filtres
    allIngredients.forEach(ingredient => {
        const option = document.createElement("option");
        option.value = ingredient;
        datalistOptionsIngr.appendChild(option);
    });

    // 4) remettre le tableaux de filtres : allUstensils dans les filtres
    allUstensils.forEach(ustensil => {
        const option = document.createElement("option");
        option.value = ustensil;
        datalistOptionsUst.appendChild(option);
    });

}

// fonction pour  mettre à jour les filtres en fonction de la recherche principale
function updateFilterLists(filterRecipe){

    // 1) new Set() permet d'enlever les doublons
    const uniqueIngredients = new Set();
    const uniqueUstensils = new Set();
    const uniqueAppliances = new Set();
    

    // 2) parcourir tous les ingredients , appliance et ustensils des recette filtrées pour LES AJOUTER (add) DANS LES TABLEAUX A VALEURS UNIQUES (new Set)
    filterRecipe.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => uniqueIngredients.add(ingredient.ingredient.toLowerCase()));
        recipe.ustensils.forEach(ustensil => uniqueUstensils.add(ustensil.toLowerCase()));
        uniqueAppliances.add(recipe.appliance.toLowerCase());
    });


    // 3) inserer les tableaux d'options uniques dans les datalists
    updateOptions(uniqueIngredients, datalistOptionsIngr);
    updateOptions(uniqueUstensils, datalistOptionsUst);
    updateOptions(uniqueAppliances, datalistOptionsApp);
}

// 4) fonction updateOptions qui remet à jour les options  
    // optionSet === uniqueIngredients OU uniqueUstensils OU uniqueAppliances
    // datalist ===  datalistOptionsApp ou datalistOptionsIngr OU datalistOptionsUsté

function updateOptions(optionsSet, datalist) {
    // A) vider les filtres de base
    datalist.innerHTML = "";

    // B) pour chaque ingredients/utensil/appareil du tableau de filtre mis a jour , creer une option 
    optionsSet.forEach(optionValue => {
        const option = document.createElement("option");
        option.value = optionValue;
        datalist.appendChild(option);
    });
}
