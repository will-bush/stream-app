// URL'S
const usersURL = "http://localhost:3000/users/"
const streamsURL = "http://localhost:3000/streams/"
const entriesURL = "http://localhost:3000/entries/"

// CONSTANTS
let addEntry = false
let signedIn = false
// forms
const userForm = document.querySelector('.container')
const entryForm = document.querySelector('.newentrycontainer')
// buttons
const signInButton = document.querySelector('#signInButton')
const newEntryButton = document.querySelector('#addEntryButton')
// Main Stream
const mainStream = document.getElementById("main-stream")

// EVENT LISTENERS
// forms
userForm.addEventListener("submit", handleFormSubmit)
entryForm.addEventListener("submit", handleNewEntryForm)
// buttons
// signInButton.addEventListener("click", handleSignInClick)
// newEntryButton.addEventListener("click", handleMakeEntryClick)

// API FUNCTIONS
// get
	function get(url) {
  return fetch(url).then(response => response.json())
}
// post
function post(url, entryData) {
    return fetch(url, {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(entryData)
    }).then(response => response.json())
  }

//delete
function destroy(url, id) {
  return fetch(`${url}${id}`, {
    method: "DELETE"
    })
  }
  
API = { get, post, destroy }

function handleNewEntryForm(event) {
  event.preventDefault()
  let dataObject = {
    title: event.target[0].value,
    content: event.target[1].value,
    stream_id: 1,
    user_id: 1,
    feels: event.target[2].value,
    is_professional: event.target[3].value,
    image_url: event.target[4].value,
    date: new Date()
  }
  API.post(entriesURL, dataObject).then((entry) => {
    event.target.reset()
    renderEntry(entry)
  })
}

function getAndRenderEntries() {
  mainStream.innerHTML = "";
    get(entriesURL).then(entryList => entryList.forEach(renderEntry))
  }

function renderEntry(entry) {
    let div = document.createElement("div")
    div.className = "flow"
    let context = document.createElement("h5")
    if (entry.is_professional) {
      context.innerText = "Work"
    }
    else {
      context.innerText = "Play"
    }
    // let icon = document.createElement("img")
    // if (entry.is_professional) {
    //   icon.src = "baseline_business_center_black_18dp.png"
    // }
    // else {
    //   icon.src = "baseline_house_black_18dp.png"
    // }
    let title = document.createElement("h2")
    if (entry.feels === "negative") {
      title.className = "negative";
    }
    if (entry.feels === "positive") {
      title.className = "positive";
    }
    else {}
    title.innerText = `${entry.title}`
    let date = document.createElement("h6")
    date.className = "date-class"
    let bigdate = entry.date
    let smalldate = bigdate.split("T")[0]
    date.innerText = smalldate
    let content = document.createElement("p")
    content.innerText = entry.content
    let image = document.createElement("img")
    image.className = "display"
    image.src = entry.image_url
    if (entry.image_url === "") {
      image.className = "hidden"
    }
    let buttonDiv = document.createElement("div")
    buttonDiv.className = "buttonDiv"
    // let editButton = document.createElement("button")
    // editButton.className = "button"
    // editButton.innerText = "Edit"
    let deleteButton = document.createElement("button")
    deleteButton.className = "button"
    deleteButton.innerText = "Delete"
    deleteButton.id = `${entry.id}`
    deleteButton.addEventListener("click", deleteEntry)
    buttonDiv.append(deleteButton)
    div.append(title, context, date, image, content, buttonDiv)
    mainStream.prepend(div)
}

// HANDLE MAKE-ENTRY CLICK
function handleMakeEntryClick() {
console.log("Make Entry button clicked")
addEntry = !addEntry
  if (addEntry) {
    entryForm.style.display = 'block'
    entryForm.addEventListener('submit', event => {
      postEntry(event.target)
      console.log("submit button clicked")
    })
  } else {
    entryForm.style.display = 'none'
  }
}

function deleteEntry(event) {
let id = event.target.id
console.log(id + " has been selected")
API.destroy(entriesURL, id)
.then(resp => {
  getAndRenderEntries()
})
console.log(id + " has been deleted")
}

// LOGIN STUFF

// HANDLE SIGN-IN CLICK
function handleSignInClick() {
    console.log("sign in button clicked")
    signedIn = !signedIn
  if (signedIn) {
    userForm.style.display = 'block'
    userForm.addEventListener('submit', handleFormSubmit)
  } else {
    userForm.style.display = 'none'
    userForm.removeEventListener("submit", handleFormSubmit)
  }
}

function handleFormSubmit(event) {
  event.preventDefault()
  let dataObject = {
    username: event.target[0].value
  }
  console.log(dataObject)
  API.post(usersURL, dataObject).then((user) => {
    // createStream(user)
  })
}


// function createStream(user) {
// let dataObject = {
//   user_id: user.id
// }
// API.post(streamsURL, dataObject).then((user) => {
// }

document.body.onload = getAndRenderEntries()
