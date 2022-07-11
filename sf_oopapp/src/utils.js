import { User } from "./models/User";
import { Task } from "./models/Task";
import { todoWrapper, btnWrapper, inputWrapper } from "./app";
import { appState } from "./app";
import { trueUser, tasksArr, usersArr } from "./app";



export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  //localStorage.clear();
  const testUser = new User("testUser3", "test123");
  User.save(testUser);
};

// создаем кнопку submit и поле ввода

export const addInp = function () {
  inputWrapper.innerHTML = `<input id="inputField" type="text" placeholder = "введите задачу" autofocus autocomplete = "off" > `;
  btnWrapper.innerHTML = `<button class ="btn-submit"> Submit </button> `;
  document.querySelector('.btn-submit').addEventListener('click', addToDo);
}

//сохранение изменений в todo листе
export const saveChadgeToDoList = function () {
  trueUser.toDo = tasksArr;
  localStorage.setItem(trueUser.storageKey, JSON.stringify(usersArr));
}

// создаем тудушки из поля ввода

export const addToDo = function () {
  let description = document.querySelector('#inputField').value;
  if (description) {
    tasksArr.push(new Task(description));
    saveChadgeToDoList();
  };
  inputWrapper.innerHTML = '';
  btnWrapper.innerHTML = `<button class="btn-add">+Add card</button>`; 
  fillHtmlList();
  document.querySelector('.btn-add').addEventListener('click', addInp);
}

//заполнение todo листа 
export const fillHtmlList = () => {
  console.log('обновляем список')
  todoWrapper.innerHTML = '';
  if (tasksArr.length > 0) {
    tasksArr.forEach((item, index) => {
      todoWrapper.innerHTML += `<div  class = "description"> ${item.description} </div> <br>`;
    });
  };
};

//изменение  задачи
export const changeTask = (event) =>{
  let changedTask = event.target;
  if (changedTask == todoWrapper) return;
 // todoWrapper.removeEventListener ('click', changeTask );
 // changedTask.innerHTML += 
//document.querySelector('.dropdown-toggle').addEventListener 
    console.log(changedTask) 
 // saveChadgeToDoList();
 //todoWrapper.addEventListener ('click', changeTask );
}