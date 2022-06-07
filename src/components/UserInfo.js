export class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }
  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent };
  }
  setUserInfo({ name, job }) {
    const nameInput = document.querySelector(name);
    const jobInput = document.querySelector(job);
    this._name.textContent = nameInput.value;
    this._job.textContent = jobInput.value;
  }
}
