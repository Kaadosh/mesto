export default class UserInfo {
  constructor(nameSelector, profileSelector, avatarSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._profileSelector = document.querySelector(profileSelector);
    this._avatarSelector = avatarSelector;
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      profession: this._profileSelector.textContent,
    };
  }

  setUserInfo({ name, profession }) {
    this._nameSelector.textContent = name;
    this._profileSelector.textContent = profession;
  }

  setUserAvatar(data) {
    if (data.avatar !== undefined) this._avatar.src = data.avatar;
  }
}
