import {
  observable,
  computed,
  action,
} from 'mobx'

export default class Appstate {
  @observable count = 0

  @observable name='rocky'

  @observable user= {
    isLogin: false,
  }

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(name) {
    this.name = name
  }

  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}

// const appState = new AppState()
// autorun(() => {
//   // eslint-disable-next-line no-console
//   console.log(appState.msg)
// })

// setInterval(() => {
//   appState.add()
// }, 500)
