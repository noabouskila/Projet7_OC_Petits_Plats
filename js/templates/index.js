console.log(recipes)


function createRecipeCards(recipes) {
    recipes.forEach(recipe => {
      createRecipeCard(recipe);
    });
}
  
createRecipeCards(recipes);



function createRecipeCard(recipe){
    // recipes.forEach(recipe => {
        const sectionCards = document.getElementById('sectionCards')
        
        const sectionCard = document.createElement("div")
        sectionCard.classList.add("sectionCard")

        sectionCard.innerHTML =`

            <div>
                <div class="position-relative">
                    <img src="img/${recipe.image}" class="card-img-top object-fit-cover" alt="${recipe.image}" style="height:200px">
                    <span class="position-absolute rounded-pill py-1 px-3 bg-warning end-0 m-2">10 min</span>
                </div>

                <div class="card-body">
                    <h4 class="card-title fw-bold mb-2">${recipe.name}</h4>
                    <h5 class="mb-1 text-secondary">Recette</h5>
                    <p class="card-text">${recipe.description}</p>
                    <h5 class="card-title mb-2 text-secondary">Ingredients</h5>
                    <div class="d-flex flex-wrap justify-content-between">
                        <div class="d-flex flex-column col-5">
                        ${
                            recipe.ingredients.map((ingredient, index) =>{
                               return `<span>${ingredient.ingredient}</span>
                                <span>
                                ${ingredient.quantity!== undefined ? ingredient.quantity : ""}
                                ${ingredient.unit!== undefined ? ingredient.unit : "" }</span>`
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        sectionCards.appendChild(sectionCard)
    
        
    // });
}



// <div class="card col-3 mx-1 my-3 shadow-lg" style="height:535px">
// <div class="position-relative">
//     <img src="img/Recette03.jpg" class="card-img-top object-fit-cover" alt="..." style="height:200px">
//     <span class="position-absolute rounded-pill py-1 px-3 bg-warning end-0 m-2">10 min</span>
// </div>

// <div class="card-body">
//     <h4 class="card-title fw-bold mb-2">Limonade de Coco</h4>
//     <h5 class="mb-1 text-secondary">Recette</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <h5 class="card-title mb-2 text-secondary">Ingredients</h5>
//     <div class="d-flex flex-wrap justify-content-between">
//         <div class="d-flex flex-column col-5">
//             <span>Lait de coco</span>
//             <span>400ml</span>
//         </div>
        
//         <div  class="d-flex flex-column col-5 ">
//             <span>Lait de coco</span>
//             <span>400ml</span>
//         </div>
//         <div  class="d-flex flex-column col-5 ">
//             <span>Lait de coco</span>
//             <span>400ml</span>
//         </div>
//         <div  class="d-flex flex-column col-5 ">
//             <span>Lait de coco</span>
//             <span>400ml</span>
//         </div>
//     </div>
// </div>
// </div>