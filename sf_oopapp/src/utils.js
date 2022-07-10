import { User } from "./models/User";
import { Task } from "./models/Task";
import { todoWrapper, btnWrapper } from "./app";
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
  const testUser = new User("testUser4", "test123");
  User.save(testUser);
};

// создаем кнопку submit и поле ввода

export const addInp = function () {
  const inputWrapper = document.querySelector('.input-wrapper');
  inputWrapper.innerHTML = `<input id="inputField" type="text" placeholder = "введите задачу" autofocus autocomplete = "off" > `;
  btnWrapper.innerHTML = `<button class ="btn-submit"> Submit </button> `;
  document.querySelector('.btn-submit').addEventListener('click', addToDo);
}

// создаем тудушки из поля ввода

export const addToDo = function () {
  let description = document.querySelector('#inputField').value;
  document.querySelector('#inputWrapper').value = "";
  if (description) {
    todoWrapper.innerHTML += `<div class = "description"> ${description} </div> <br>`;
    tasksArr.push(new Task(description));
    trueUser.toDo = tasksArr;
    for (let user of usersArr) {
      if (trueUser.id == user.id) {
        user = trueUser;
        localStorage.clear();
        localStorage.setItem(user.storageKey, JSON.stringify(usersArr));
        break;
      };
    }; 
  };
  inputWrapper.outerHTML = '';
  btnWrapper.innerHTML = `<button class="btn-add">+Add card</button>`; 
  document.querySelector('.btn-add').addEventListener('click', addInp);
}

//заполнение todo листа из localstorage
export const fillHtmlList = () => {
  todoWrapper.innerHTML = '';
  if (tasksArr.length > 0) {
    tasksArr.forEach((item, index) => {
      todoWrapper.innerHTML += `<div class = "description"> ${item.description} </div> <br>`;
    });
  };
};