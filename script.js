//MODEL


// If localstorage has a todos array, then use it
// Otherwise use the default array.
let todos;
// Retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos'));
if (Array.isArray(savedTodos)) {
    todos = savedTodos;
}
else {
    todos = [
        { title: 'gym', dueDate: '2020-8-23', isdone: false, isediting: false, id: 'id1' },
        { title: 'ge home needs', dueDate: '2020-8-23', isdone: false, isediting: false, id: 'id2' },
        { title: 'clean the house', dueDate: '2020-8-23', isdone: false, isediting: false, id: 'id3' }
    ];
}


const createTodo = (title, dueDate) => {
    const id = new Date().getTime() + '';
    todos.push({ title: title, dueDate: dueDate, isdone: false, id: id });

    saveTodos();
}

const deleteTodo = (idToDelete) => {
    console.log(idToDelete)
    todos = todos.filter(todo => {
        console.log(todo.id)
        if (todo.id === idToDelete) return false;
        else return true;
    });

    saveTodos();
}

const setEditing = (idToEdit) => {
    todos.forEach(element => {

        if (element.id === idToEdit) {
            element.isediting = true;
        }

    });
    saveTodos();
}

const updateTodo = (idToEdit, newTitle, newDate) => {
    todos.forEach(element => {
        if (element.id === idToEdit) {
            element.title = newTitle;
            element.dueDate = newDate;
            element.isediting = false;
        }
    });
    saveTodos();
}

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}


//CONTROLER

const addTodo = () => {
    const textBox = document.getElementById('todoTitle');
    const title = textBox.value;

    const datePicker = document.getElementById('datePicker');
    const dueDate = datePicker.value;

    if (title.trim() === "" || dueDate === "") {
        alert("Please enter both a task and a due date before adding.");
        return; // Exit the function if either field is empty
    }

    createTodo(title, dueDate);
    render();
}

const removeTodo = (event) => {
    const idToDelete = event.target.id;
    console.log("remove todo function working")
    console.log(idToDelete)
    deleteTodo(idToDelete);
    render();
}

const toggleCheckBox = (event) => {
    let checkBoxid = event.target.id;

    todos.forEach(element => {
        if (element.id === checkBoxid) {
            if (element.isdone === true) {
                element.isdone = false;
            }
            else {
                element.isdone = true;
            }
        }
    });
    saveTodos();
    render();
}

let onUpdate = (idToEdit) => {
    let newTitle = document.getElementById('textBoxToEdit').value;
    let newDate = document.getElementById('DatePickerToEdit').value;

    if (newTitle.trim() === "" || newDate === "") {
        alert("Please enter both a task and a due date before adding.");
        return; // Exit the function if either field is empty
    }

    updateTodo(idToEdit, newTitle, newDate)
    render();
}


const onEdit = (idToEdit) => {
    setEditing(idToEdit);
    render();
}




//VIEW

const render = () => {
    // reset our list
    document.getElementById('todoLists').innerHTML = '';

    todos.forEach(todo => {

        // If this todo is being edited, render a textbox, date picker and a
        // button for saving the edits.
        if (todo.isediting === true) {
            const element = document.createElement('div');
            element.classList.add('todosection');

            let inputTextBox = document.createElement('input')
            inputTextBox.classList.add('todosection-input');
            inputTextBox.type = 'text'
            inputTextBox.placeholder = 'Enter your task'
            inputTextBox.id = 'textBoxToEdit'

            let inputDatePicker = document.createElement('input')
            inputDatePicker.classList.add('datePicker-Add');
            inputDatePicker.classList.add('datePicker-Edit');
            inputDatePicker.type = 'date'
            inputDatePicker.id = 'DatePickerToEdit'

            let updateButton = document.createElement('button');
            let imgElement = document.createElement('img');
            imgElement.src = "icons/square-check-solid.svg";
            updateButton.appendChild(imgElement);

            updateButton.id = todo.id;
            updateButton.onclick = updateButton.onclick = () => onUpdate(todo.id);

            element.appendChild(inputTextBox)
            element.appendChild(inputDatePicker)
            element.appendChild(updateButton)

            const todoLists = document.getElementById('todoLists');
            todoLists.appendChild(element);
        }

        // If this todo is not being edited, render what we had before
        // and add an "Edit" button.
        else {
            const element = document.createElement('div');
            element.classList.add('todo')

            let checkBox = document.createElement('input')
            checkBox.type = "checkbox";
            checkBox.id = todo.id;
            checkBox.onchange = toggleCheckBox;
            if (todo.isdone === true) {
                checkBox.checked = true;
            }
            else {
                checkBox.checked = false;
            }

            element.appendChild(checkBox);



            let textbox = document.createElement('div')
            textbox.style.display = 'inline-block';
            textbox.classList.add('todo-content');

            if (todo.isdone === true) {
                textbox.innerHTML = `<strike>${todo.title}  ${todo.dueDate}</strike>`;
            } else {
                textbox.innerText = todo.title + ' ' + todo.dueDate;
            }

            element.appendChild(textbox);


            let editbutton = document.createElement('button')
            let imgElement = document.createElement('img');
            imgElement.src = "icons/edit-solid.svg";
            editbutton.appendChild(imgElement);
            editbutton.id = todo.id
            editbutton.onclick = () => onEdit(todo.id);

            element.appendChild(editbutton);



            let deletButton = document.createElement('button');
            let deleteimgElement = document.createElement('img');
            deleteimgElement.src = "icons/trash-solid.svg";
            deleteimgElement.id = todo.id;
            deletButton.appendChild(deleteimgElement);
            deletButton.id = todo.id;
            deleteimgElement.onclick = removeTodo;
            deletButton.onclick = removeTodo;

            element.appendChild(deletButton);

            const todoLists = document.getElementById('todoLists');
            todoLists.appendChild(element);
        }

    });
}

render();


