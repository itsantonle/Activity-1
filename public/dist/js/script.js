//task tracker
document.addEventListener('DOMContentLoaded', function (e) { return getItems(); });
var trackerContent = document.querySelector('#taskTracker');
var addbutton = document.querySelector('#addTaskButton');
var addInput = document.querySelector('#addTaskInput');
var datePicker = document.querySelector('#expire-date');
var actualList = document.querySelector('#TaskulParent');
var SomethingWentWrong = document.querySelector('#liveAlertPlaceholder');
var taskTracker = document.querySelector('#taskTracker');
taskTracker.textContent = "".concat(getActiveTask(), " / ").concat(getTasks(), " Completed!");
// //I guess this code is useful if you have like data from a jsonfile or a
// //local storage but tbh if you're just creating everything from scratch this isn't
// //even needed
// const checkButton: NodeListOf<HTMLLIElement> =
//   document.querySelectorAll('.fa-check-circle')
// const trashButton: NodeListOf<HTMLLIElement> =
//   document.querySelectorAll('.fa-trash ')
// checkButton.forEach((btn) => {
//   btn.addEventListener('click', checkedMark)
// })
// trashButton.forEach((btn) => {
//   btn.addEventListener('click', trashedF)
// })
// //up to here
addbutton.addEventListener('click', addTask);
function reset() {
    addInput.value = '';
    // console.log(checkButton)
}
function getItems() {
    // the display function
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
    tasks.forEach(function (task) {
        var newLi = document.createElement('li');
        newLi.setAttribute('class', 'list-group-item active shadow');
        var checked = document.createElement('i');
        checked.setAttribute('class', 'fas fa-check-circle fa-lg');
        var trashed = document.createElement('i');
        trashed.setAttribute('class', 'fa-solid fa-trash fa-lg');
        var expirespan = document.createElement('span');
        var spanned = document.createElement('span');
        spanned.innerText = "".concat(task.value);
        spanned.setAttribute('class', 'content');
        checked.addEventListener('click', checkedMark);
        trashed.addEventListener('click', trashedF);
        newLi.appendChild(checked);
        newLi.appendChild(trashed);
        newLi.appendChild(spanned);
        actualList.appendChild(newLi);
    });
    // const newLi = document.createElement('li')
    // newLi.setAttribute('class', 'list-group-item')
    // //list-group-item active shadow"
    // newLi.classList.add('active')
    // newLi.classList.add('shadow')
    // const checked = document.createElement('i')
    // checked.setAttribute('class', 'fas fa-check-circle fa-lg')
    // const trashed = document.createElement('i')
    // trashed.setAttribute('class', 'fa-solid fa-trash fa-lg')
    // const spanned = document.createElement('span')
    // spanned.innerText = `${addInput.value}`
    // spanned.setAttribute('class', 'content')
    // checked.addEventListener('click', checkedMark)
    // trashed.addEventListener('click', trashedF)
    // newLi.appendChild(checked)
    // newLi.appendChild(trashed)
    // newLi.appendChild(spanned)
    // actualList.appendChild(newLi)
}
function getTasks() {
    var count = 0;
    document.querySelectorAll('.list-group-item').forEach(function (e) {
        count += 1;
    });
    return count;
}
function getActiveTask() {
    var count = 0;
    document.querySelectorAll('.inactive').forEach(function (e) {
        count += 1;
    });
    return count;
}
function setTracker() {
    taskTracker.textContent = "".concat(getActiveTask(), " / ").concat(getTasks(), " Completed!");
    // console.log(actualList.children)
}
function addTask(e) {
    e.preventDefault();
    if (addInput.value.length < 1) {
        SomethingWentWrong.innerText = 'Invalid String Input!';
        SomethingWentWrong.style.display = 'block';
        setTimeout(function (e) {
            SomethingWentWrong.style.display = 'none';
        }, 2000);
    }
    else {
        var newLi = document.createElement('li');
        newLi.setAttribute('class', 'list-group-item active shadow');
        var checked = document.createElement('i');
        checked.setAttribute('class', 'fas fa-check-circle fa-lg');
        var trashed = document.createElement('i');
        trashed.setAttribute('class', 'fa-solid fa-trash fa-lg');
        var expirespan = document.createElement('span');
        var spanned = document.createElement('span');
        spanned.innerText = "".concat(addInput.value);
        spanned.setAttribute('class', 'content');
        checked.addEventListener('click', checkedMark);
        trashed.addEventListener('click', trashedF);
        newLi.appendChild(checked);
        newLi.appendChild(trashed);
        newLi.appendChild(spanned);
        actualList.appendChild(newLi);
        // Calculations for the expiery
        // const today = new Date()
        // const stringtoday = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`
        // console.log(stringtoday, datePicker.value)
        // console.log(Date.parse(stringtoday) > Date.parse(datePicker.value))
        //local storage
        // type listItem = {
        //   value: string
        //   expiry: string
        // }
        // const listItemCollection: (listItem | null)[] = []
        // listItemCollection.push({ value: addInput.value, expiry: datePicker.value })
        // localStorage.setItem('tasks', JSON.stringify(listItemCollection))
        reset();
        setTracker();
    }
}
function checkedMark(e) {
    if (e.target instanceof Element) {
        var parent_1 = e.target.parentElement;
        if (parent_1.classList.contains('active')) {
            parent_1.classList.remove('active');
            parent_1.classList.add('inactive');
        }
        else {
            parent_1.classList.remove('inactive');
            parent_1.classList.add('active');
        }
    }
    setTracker();
}
function trashedF(e) {
    if (e.target instanceof Element) {
        var parent_2 = e.target.parentElement;
        actualList.removeChild(parent_2);
    }
    setTracker();
}
