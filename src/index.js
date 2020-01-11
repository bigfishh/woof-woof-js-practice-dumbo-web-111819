
const dogBarDiv = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')
const dogsUrl = "http://localhost:3000/pups"

// ###### FETCH ALL DOGS ######
const showDogs = () => {
    fetch(dogsUrl)
    .then(resp => resp.json())
    .then(dogsData => {
        dogsData.forEach(dog => {
            slapItOnTheDom(dog)
        })
    })
}
showDogs()

// ###### FILTER GOOD DOGS ######
const showOnlyGoodDogFilter = () => {
    goodDogFilter.addEventListener("click", (e) => {
        filterOnorOff()
    })
}
showOnlyGoodDogFilter()

// ----------------------- showOnlyGoodDogFilter HELPERS -----------------------

const filterOnorOff = () => {
    if (goodDogFilter.innerText === "Filter good dogs: ON"){
        goodDogFilter.innerText = "Filter good dogs: OFF"
        dogBarDiv.innerText = ""
        showDogs()
    } else {
        goodDogFilter.innerText = "Filter good dogs: ON"
        dogBarDiv.innerText = ""
        goodDogs()
    }
}

// ### helper of filterOnorOff ###
const goodDogs = () => {
    fetch(dogsUrl)
    .then(resp => resp.json())
    .then(dogsData => {
        dogsData.forEach(dog => {
            if (dog.isGoodDog){slapItOnTheDom(dog)}
        })
    })
}
// ----------------------- END showOnlyGoodDogFilter HELPERS -----------------------


// ----------------------- showDogs HELPERS -----------------------

// ### helper of showDogs ###
const slapItOnTheDom = (dog) => {
    const span = document.createElement('span')
    span.innerText = dog.name
    span.addEventListener('click', (e) => {
        displayDogInfo(dog)
    })
    dogBarDiv.append(span)
}
// ### helper of slapItOnTheDom ###
const displayDogInfo = (dog) => {
    dogInfoDiv.innerText = ""
    const img = document.createElement('img')
        img.src = dog.image
    const h2 = document.createElement('h2')
        h2.innerText = dog.name
    const button = document.createElement('button')
        button.innerText = goodOrNah(dog)
        button.addEventListener('click', () => {
            changeGoodDog(dog)
            fetch(`${dogsUrl}/${dog.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    isGoodDog : dog.isGoodDog
                })
            })
            .then(resp => resp.json())
            .then(changedBehavior => {
                button.innerText = goodOrNah(dog)
            })
        })
    dogInfoDiv.append(img, h2, button)
}
// ### helpers of displayDogInfo ###
const goodOrNah = (dog) => {
    if (dog.isGoodDog === false){
        return "Bad Dog!"
    } else {
        return "Good Dog!"
    }
}

const changeGoodDog = (dog) => {
    if (dog.isGoodDog === false){
        dog.isGoodDog =  true
        // console.log("is good")
    } else {
        dog.isGoodDog =   false
        // console.log("is bad")
    }
}
// ----------------------- END showDogs HELPERS -----------------------

