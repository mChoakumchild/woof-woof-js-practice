let dogNC = document.querySelector("div#dog-bar")
let dogIC = document.querySelector("div#dog-info")
let dogMoral;
let goodString = "Good Dog!"
let badString = "Bad Dog!"
//get request
document.addEventListener('DOMContentLoaded', () => {
  
fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(res => {
    res.forEach(puppyObject => { 
    puppies(puppyObject)
    //console.log(puppyObject)
    })
})
function puppyMoral (morality) {
  
  if (morality == false){
    dogMoral = badString

  }
  else {
    dogMoral = goodString
  }
return dogMoral
}
function puppies(puppyObject) { 
    let dogBar = document.createElement('span')
    dogBar.innerText = puppyObject.name
    dogBar.dataset.id = puppyObject.id - 1 
    dogNC.append(dogBar)
    dogBar.addEventListener('click', (e)=> {
      puppyInfo(puppyObject)
    })
    
}
//Dog Info

function puppyInfo (dogObject) { 
    let morality = dogObject.isGoodDog
    let puppyImage = document.createElement('img')
    let puppyTitle = document.createElement('h2')
    let puppyButton = document.createElement('button')
  //h2
    puppyTitle.innerText = dogObject.name
  //image
    puppyImage.src = dogObject.image
    puppyImage.className = "toy-avatar"
    // button
    puppyButton.className = dogObject.name
    puppyButton.dataset.id = dogObject.id
    puppyButton.innerText = puppyMoral(morality)
    //Appending
    dogIC.append(puppyImage, puppyTitle, puppyButton)

    puppyButton.addEventListener('click', (e) => {
      morality = !morality
      puppyMoral(morality)
      puppyButton.innerText = dogMoral
        fetch(`http://localhost:3000/pups/${dogObject.id}`,
        {method: "PATCH",
        headers: {
          "Content-Type" : "application/json"
        },
          body: JSON.stringify({
            isGoodDog: morality   //update backend json
          })
        })
        .then(res => res.json())
        .then(res => {
          dogObject.isGoodDog = res.isGoodDog //update object in memory
        console.log(res)
        })
    })
  }
  
})
