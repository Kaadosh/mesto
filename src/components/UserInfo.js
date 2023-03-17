export default class UserInfo {
  constructor({nameSelector, profileSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._profileSelector = document.querySelector(profileSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      profession: this._profileSelector.textContent
    }
  }

  setUserInfo({name, profession}) {
    this._nameSelector.textContent = name;
    this._profileSelector.textContent = profession;
  };
}