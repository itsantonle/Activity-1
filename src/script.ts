//task tracker

document.addEventListener('DOMContentLoaded', (e: Event) => {
  displayItems()
})

type listItem = {
  value: string
  expiry: string
  completed: boolean
}

const trackerContent: HTMLParagraphElement =
  document.querySelector('#taskTracker')!

const listItemCollection: (listItem | null)[] = []

const addbutton: HTMLButtonElement = document.querySelector('#addTaskButton')!
const addInput: HTMLInputElement = document.querySelector('#addTaskInput')!
const datePicker: HTMLInputElement = document.querySelector('#expire-date')
const actualList: HTMLUListElement = document.querySelector('#TaskulParent')!
const SomethingWentWrong: HTMLDivElement = document.querySelector(
  '#liveAlertPlaceholder'
)
const sortSelect: HTMLSelectElement = document.querySelector('#sort-select')
const taskTracker: HTMLParagraphElement = document.querySelector('#taskTracker')
taskTracker.textContent = `${getActiveTask()} / ${getTasks()} Completed!`

sortSelect.addEventListener('change', sortit)

addbutton.addEventListener('click', addTask)

function reset(): void {
  addInput.value = ''
  datePicker.value = ''
}

function sortit(): void {
  const items = document.querySelectorAll('.list-group-item')
  if (sortSelect.value === 'completed') {
    items.forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.add('hide')
      } else {
        item.classList.remove('hide')
      }
    })
  } else if (sortSelect.value === 'pending') {
    items.forEach((item) => {
      if (item.classList.contains('inactive')) {
        item.classList.add('hide')
      } else {
        item.classList.remove('hide')
      }
    })
  } else {
    items.forEach((item) => {
      if (item.classList.contains('hide')) {
        item.classList.remove('hide')
      }
    })
  }
  setTracker()
}

function compareDates(date: string): string {
  const compareDate = new Date(date)
  const current = new Date()
  if (compareDate < current) {
    return 'expired '
  } else {
    return 'nonexpired'
  }
}

function displayItems(): void {
  actualList.innerHTML = ''
  const tasks = JSON.parse(localStorage.getItem('tasks'))

  tasks.sort((a: listItem, b: listItem) => a.value.localeCompare(b.value))
  console.log(tasks)
  tasks.forEach((task) => {
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'list-group-item shadow')
    if (task.completed) {
      newLi.classList.add('inactive')
    } else {
      newLi.classList.add('active')
    }

    newLi.setAttribute('id', `${tasks.indexOf(task)}`)
    newLi.setAttribute('name', `${task.value}`)
    const checked = document.createElement('i')
    checked.setAttribute('class', 'fas fa-check-circle fa-lg')
    const trashed = document.createElement('i')
    trashed.setAttribute('class', 'fa-solid fa-trash fa-lg')
    const expirespan = document.createElement('span')
    const spanned = document.createElement('span')
    spanned.innerText = `${task.value}`
    spanned.setAttribute('class', 'content')
    expirespan.innerText = ` Due ${task.expiry}`

    expirespan.setAttribute('class', compareDates(task.expiry))

    checked.addEventListener('click', checkedMark)
    trashed.addEventListener('click', trashedF)
    newLi.appendChild(checked)
    newLi.appendChild(trashed)
    newLi.appendChild(expirespan)
    newLi.appendChild(spanned)
    actualList.appendChild(newLi)
  })
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

function throwError(error: string): void {
  SomethingWentWrong.innerText = error
  SomethingWentWrong.style.display = 'block'
  setTimeout((e: Event) => {
    SomethingWentWrong.style.display = 'none'
  }, 2000)
}

function setTracker(): void {
  taskTracker.textContent = `${getActiveTask()} / ${getTasks()} Completed!`
}

function addTask(e: Event): void {
  e.preventDefault()

  if (addInput.value.trim().length < 1) {
    throwError('Invalid String input')
  } else {
    if (datePicker.value.split('-').length < 3) {
      throwError('Invalid Date Inputted!')
    } else {
      if (!localStorage.tasks) {
        localStorage.setItem('tasks', JSON.stringify([]))
        const list = JSON.parse(localStorage.getItem('tasks'))
        list.push({
          value: addInput.value,
          expiry: datePicker.value,
          completed: false,
        })
        localStorage.setItem('tasks', JSON.stringify(list))
      } else {
        const list = JSON.parse(localStorage.getItem('tasks'))
        list.push({
          value: addInput.value,
          expiry: datePicker.value,
          completed: false,
        })
        localStorage.setItem('tasks', JSON.stringify(list))
      }
    }
  }
  reset()
  setTracker()
  displayItems()
}

function checkedMark(e: Event) {
  if (e.target instanceof Element) {
    const parent = e.target.parentElement
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (parent.classList.contains('active')) {
      parent.classList.remove('active')
      parent.classList.add('inactive')
      tasks.forEach((task) => {
        if (parent.id === String(tasks.indexOf(task))) {
          task.completed = true
        }
      })
    } else {
      parent.classList.remove('inactive')
      parent.classList.add('active')
      tasks.forEach((task) => {
        if (parent.id === String(tasks.indexOf(task))) {
          task.completed = false
        }
      })
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  setTracker()
}

function trashedF(e: Event) {
  if (e.target instanceof Element) {
    const parent = e.target.parentElement
    actualList.removeChild(parent)
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    console.log(tasks)

    tasks.forEach((task) => {
      if (parent.id === String(tasks.indexOf(task))) {
        tasks.pop(tasks.indexOf(task))
      }
      localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    setTracker()
  }
}
