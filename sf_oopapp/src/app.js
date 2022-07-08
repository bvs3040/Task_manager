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

export const appState = new State();

const loginForm = document.querySelector("#app-login-form");

generateTestUser(User);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  
  let fieldHTMLContent = authUser(login, password)
  ? taskFieldTemplate
  : noAccessTemplate;
  
  document.querySelector("#content").innerHTML = fieldHTMLContent;
    
  // создаем кнопку
  document.querySelector('.btn-wrapper').innerHTML = `<button class="btn-add">+Add card</button>`;
   
  // меняем кнопку, создаем тудушки
  document.querySelector('.btn-add').addEventListener ('click', addInp);
  document.querySelector ('.btn-submit').addEventListener('click', addToDo);  
  
  
  
  
  
  
  
   
  
  
});







