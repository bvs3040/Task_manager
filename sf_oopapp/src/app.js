import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateTestUser } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { addInp } from "./utils";
import { addToDo } from "./utils";
import { Task } from "./models/Task";
import { fillHtmlList } from "./utils";
import { getFromStorage } from "./utils";


export const appState = new State();
export let trueUser; //авторизованный юзер
export let usersArr;    //массив юзеров из Localstorage
export let tasksArr;    //массив задач авторизованного юзера
export let todoWrapper; //div для вывода задач
export let btnWrapper;  //div для кнопки Add/Submit

//generateTestUser(User);

//авторизация юзера
const loginForm = document.querySelector("#app-login-form");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  
  let fieldHTMLContent = authUser(login, password)
  ? taskFieldTemplate
  : noAccessTemplate ;
  document.querySelector("#content").innerHTML = fieldHTMLContent;

  if (fieldHTMLContent == noAccessTemplate) return; // если нет дотупа возврат к началу

  //получаем авторизованного юзера из базы
  usersArr = getFromStorage(appState._currentUser.storageKey);
  for (let user of usersArr) {
    if (user.login == login && user.password == password) {
      trueUser = user;
      break;
    };
  }; 

  //получаем массив заданий
  tasksArr = trueUser.toDo ?  trueUser.toDo  : [] ;

  // отбражение заданий из local storage
  todoWrapper = document.querySelector('.todos-wrapper-ready');
  fillHtmlList();
 
  // создаем кнопку
  btnWrapper = document.querySelector('.btn-wrapper')
  btnWrapper.innerHTML = `<button class="btn-add">+Add card</button>`;
  
  // меняем вид кнопки, создаем тудушки
  document.querySelector('.btn-add').addEventListener ('click', addInp);
  document.querySelector ('.btn-submit').addEventListener('click', addToDo);    
  
});







