//task tracker
document.addEventListener('DOMContentLoaded', function (e) {
    displayItems();
});
var trackerContent = document.querySelector('#taskTracker');
var listItemCollection = [];
var addbutton = document.querySelector('#addTaskButton');
var addInput = document.querySelector('#addTaskInput');
var datePicker = document.querySelector('#expire-date');
var actualList = document.querySelector('#TaskulParent');
var SomethingWentWrong = document.querySelector('#liveAlertPlaceholder');
var sortSelect = document.querySelector('#sort-select');
var taskTracker = document.querySelector('#taskTracker');
taskTracker.textContent = "".concat(getActiveTask(), " / ").concat(getTasks(), " Completed!");
sortSelect.addEventListener('change', sortit);
addbutton.addEventListener('click', addTask);
function reset() {
    addInput.value = '';
    datePicker.value = '';
}
function sortit() {
    var items = document.querySelectorAll('.list-group-item');
    if (sortSelect.value === 'completed') {
        items.forEach(function (item) {
            if (item.classList.contains('active')) {
                item.classList.add('hide');
            }
            else {
                item.classList.remove('hide');
            }
        });
    }
    else if (sortSelect.value === 'pending') {
        items.forEach(function (item) {
            if (item.classList.contains('inactive')) {
                item.classList.add('hide');
            }
            else {
                item.classList.remove('hide');
            }
        });
    }
    else {
        items.forEach(function (item) {
            if (item.classList.contains('hide')) {
                item.classList.remove('hide');
            }
        });
    }
    setTracker();
}
function compareDates(date) {
    var compareDate = new Date(date);
    var current = new Date();
    if (compareDate < current) {
        return 'expired ';
    }
    else {
        return 'nonexpired';
    }
}
function displayItems() {
    actualList.innerHTML = '';
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks.length < 1) {
        actualList.innerHTML = 'No tasks to show!';
    }
    tasks.sort(function (a, b) { return a.value.localeCompare(b.value); });
    console.log(tasks);
    tasks.forEach(function (task) {
        var newLi = document.createElement('li');
        newLi.setAttribute('class', 'list-group-item shadow');
        if (task.completed) {
            newLi.classList.add('inactive');
        }
        else {
            newLi.classList.add('active');
        }
        newLi.setAttribute('id', "".concat(tasks.indexOf(task)));
        newLi.setAttribute('name', "".concat(task.value));
        var checked = document.createElement('i');
        checked.setAttribute('class', 'fas fa-check-circle fa-lg');
        var trashed = document.createElement('i');
        trashed.setAttribute('class', 'fa-solid fa-trash fa-lg');
        var expirespan = document.createElement('span');
        var spanned = document.createElement('span');
        spanned.innerText = "".concat(task.value);
        spanned.setAttribute('class', 'content');
        expirespan.innerText = " Due ".concat(task.expiry);
        expirespan.setAttribute('class', compareDates(task.expiry));
        checked.addEventListener('click', checkedMark);
        trashed.addEventListener('click', trashedF);
        newLi.appendChild(checked);
        newLi.appendChild(trashed);
        newLi.appendChild(expirespan);
        newLi.appendChild(spanned);
        actualList.appendChild(newLi);
    });
    setTracker();
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
function throwError(error) {
    SomethingWentWrong.innerText = error;
    SomethingWentWrong.style.display = 'block';
    setTimeout(function (e) {
        SomethingWentWrong.style.display = 'none';
    }, 2000);
}
function setTracker() {
    taskTracker.textContent = "".concat(getActiveTask(), " / ").concat(getTasks(), " Completed!");
}
function addTask(e) {
    e.preventDefault();
    if (addInput.value.trim().length < 1) {
        throwError('Invalid String input');
    }
    else {
        if (datePicker.value.split('-').length < 3) {
            throwError('Invalid Date Inputted!');
        }
        else {
            if (!localStorage.tasks) {
                localStorage.setItem('tasks', JSON.stringify([]));
                var list = JSON.parse(localStorage.getItem('tasks'));
                list.push({
                    value: addInput.value,
                    expiry: datePicker.value,
                    completed: false,
                });
                localStorage.setItem('tasks', JSON.stringify(list));
            }
            else {
                var list = JSON.parse(localStorage.getItem('tasks'));
                list.push({
                    value: addInput.value,
                    expiry: datePicker.value,
                    completed: false,
                });
                localStorage.setItem('tasks', JSON.stringify(list));
            }
        }
    }
    reset();
    setTracker();
    displayItems();
}
function checkedMark(e) {
    if (e.target instanceof Element) {
        var parent_1 = e.target.parentElement;
        var tasks_1 = JSON.parse(localStorage.getItem('tasks'));
        if (parent_1.classList.contains('active')) {
            parent_1.classList.remove('active');
            parent_1.classList.add('inactive');
            tasks_1.forEach(function (task) {
                if (parent_1.id === String(tasks_1.indexOf(task))) {
                    task.completed = true;
                }
            });
        }
        else {
            parent_1.classList.remove('inactive');
            parent_1.classList.add('active');
            tasks_1.forEach(function (task) {
                if (parent_1.id === String(tasks_1.indexOf(task))) {
                    task.completed = false;
                }
            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks_1));
    }
    setTracker();
}
function trashedF(e) {
    if (e.target instanceof Element) {
        var parent_2 = e.target.parentElement;
        actualList.removeChild(parent_2);
        var tasks_2 = JSON.parse(localStorage.getItem('tasks'));
        console.log(tasks_2);
        tasks_2.forEach(function (task) {
            if (parent_2.id === String(tasks_2.indexOf(task))) {
                tasks_2.pop(tasks_2.indexOf(task));
            }
            localStorage.setItem('tasks', JSON.stringify(tasks_2));
        });
        setTracker();
    }
}
