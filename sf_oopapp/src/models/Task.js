import { BaseModel } from "./BaseModel";


export class Task extends BaseModel {
    constructor(login, password, description) {
      super();
      this.description = description;
      this.login = login;
      this.password = password;
      this.stage = 1;
      this.storageKey = "users";
    }
}