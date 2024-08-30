//task tracker

const trackerContent: HTMLParagraphElement =
  document.querySelector('#taskTracker')!

const addbutton: HTMLButtonElement = document.querySelector('#addTaskButton')!
const addInput: HTMLInputElement = document.querySelector('#addTaskInput')!
const actualList: HTMLUListElement = document.querySelector('#TaskulParent')!
const SomethingWentWrong: HTMLDivElement = document.querySelector(
  '#liveAlertPlaceholder'
)
const taskTracker: HTMLParagraphElement = document.querySelector('#taskTracker')
taskTracker.textContent = `${getActiveTask()} / ${getTasks()} Completed!`

//I guess this code is useful if you have like data from a jsonfile or a
//local storage but tbh if you're just creating everything from scratch this isn't
//even needed
const checkButton: NodeListOf<HTMLLIElement> =
  document.querySelectorAll('.fa-check-circle')
const trashButton: NodeListOf<HTMLLIElement> =
  document.querySelectorAll('.fa-trash ')

checkButton.forEach((btn) => {
  btn.addEventListener('click', checkedMark)
})
trashButton.forEach((btn) => {
  btn.addEventListener('click', trashedF)
})
//up to here

addbutton.addEventListener('click', addTask)

function reset(): void {
  addInput.value = ''
  console.log(checkButton)
}

function getTasks(): number {
  let count = 0
  document.querySelectorAll('.list-group-item').forEach((e) => {
    count += 1
  })
  return count
}

function getActiveTask(): number {
  let count = 0
  document.querySelectorAll('.inactive').forEach((e) => {
    count += 1
  })
  return count
}

function setTracker(): void {
  taskTracker.textContent = `${getActiveTask()} / ${getTasks()} Completed!`
  // console.log(actualList.children)
}

function addTask(e: Event): void {
  if (addInput.value.length < 1) {
    SomethingWentWrong.innerText = 'Invalid String Input!'
    SomethingWentWrong.style.display = 'block'
    setTimeout((e: Event) => {
      SomethingWentWrong.style.display = 'none'
    }, 2000)
  } else {
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'list-group-item')
    //list-group-item active shadow"
    newLi.classList.add('active')
    newLi.classList.add('shadow')
    const checked = document.createElement('i')
    checked.setAttribute('class', 'fas fa-check-circle fa-lg')
    const trashed = document.createElement('i')
    trashed.setAttribute('class', 'fa-solid fa-trash fa-lg')
    const spanned = document.createElement('span')
    spanned.innerText = `${addInput.value}`
    spanned.setAttribute('class', 'content')
    checked.addEventListener('click', checkedMark)
    trashed.addEventListener('click', trashedF)
    newLi.appendChild(checked)
    newLi.appendChild(trashed)
    newLi.appendChild(spanned)

    actualList.appendChild(newLi)
    reset()
    setTracker()
  }
}

function checkedMark(e: Event) {
  if (e.target instanceof Element) {
    const parent = e.target.parentElement
    if (parent.classList.contains('active')) {
      parent.classList.remove('active')
      parent.classList.add('inactive')
    } else {
      parent.classList.remove('inactive')
      parent.classList.add('active')
    }
  }
  setTracker()
}

function trashedF(e: Event) {
  if (e.target instanceof Element) {
    const parent = e.target.parentElement
    actualList.removeChild(parent)
  }

  setTracker()
}
