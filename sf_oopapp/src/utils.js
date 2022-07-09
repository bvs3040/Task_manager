import { User } from "./models/User";
import { Task } from "./models/Task";
import { tasks } from "./app";
import { appState } from "./app";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  localStorage.clear();
  const testUser = new User("testUser", "test123");
  User.save(testUser);
};


// создаем кнопку submit и поле ввода

export const addInp = function () {
  const inputField = document.querySelector('.input-wrapper');
  inputField.innerHTML = `<input id="inputField" type="text" placeholder = "введите таску" autofocus autocomplete = "off" > `;
  document.querySelector('.btn-wrapper').innerHTML = `<button class ="btn-submit"> Submit </button> `;
  document.querySelector('.btn-submit').addEventListener('click', addToDo);
}

// создаем тудушки из поля ввода

export const addToDo = function () {
 
  let description = document.querySelector('#inputField').value;
  document.querySelector('#inputField').value = "";
  if (description) {
    document.querySelector('.todos-wrapper-ready').innerHTML += `<div class = "description"> ${description} </div> <br>`;
    tasks.push(new Task(description));
    appState._currentUser.toDo = tasks;
    User.save(appState);
    console.log(appState);
  }
  inputField.outerHTML = '';
  document.querySelector('.btn-wrapper').innerHTML = `<button class="btn-add">+Add card</button>`; 
  
  document.querySelector('.btn-add').addEventListener('click', addInp);
}

