//task tracker
var trackerContent = document.querySelector('#taskTracker');
var addbutton = document.querySelector('#addTaskButton');
var addInput = document.querySelector('#addTaskInput');
var actualList = document.querySelector('#TaskulParent');
var SomethingWentWrong = document.querySelector('#liveAlertPlaceholder');
var taskTracker = document.querySelector('#taskTracker');
taskTracker.textContent = "".concat(getActiveTask(), " / ").concat(getTasks(), " Completed!");
//I guess this code is useful if you have like data from a jsonfile or a
//local storage but tbh if you're just creating everything from scratch this isn't
//even needed
var checkButton = document.querySelectorAll('.fa-check-circle');
var trashButton = document.querySelectorAll('.fa-trash ');
checkButton.forEach(function (btn) {
    btn.addEventListener('click', checkedMark);
});
trashButton.forEach(function (btn) {
    btn.addEventListener('click', trashedF);
});
//up to here
addbutton.addEventListener('click', addTask);
function reset() {
    addInput.value = '';
    console.log(checkButton);
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
    if (addInput.value.length < 1) {
        SomethingWentWrong.innerText = 'Invalid String Input!';
        SomethingWentWrong.style.display = 'block';
        setTimeout(function (e) {
            SomethingWentWrong.style.display = 'none';
        }, 2000);
    }
    else {
        var newLi = document.createElement('li');
        newLi.setAttribute('class', 'list-group-item');
        //list-group-item active shadow"
        newLi.classList.add('active');
        newLi.classList.add('shadow');
        var checked = document.createElement('i');
        checked.setAttribute('class', 'fas fa-check-circle fa-lg');
        var trashed = document.createElement('i');
        trashed.setAttribute('class', 'fa-solid fa-trash fa-lg');
        var spanned = document.createElement('span');
        spanned.innerText = "".concat(addInput.value);
        spanned.setAttribute('class', 'content');
        checked.addEventListener('click', checkedMark);
        trashed.addEventListener('click', trashedF);
        newLi.appendChild(checked);
        newLi.appendChild(trashed);
        newLi.appendChild(spanned);
        actualList.appendChild(newLi);
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
