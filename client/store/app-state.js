import {
  observable,
  computed,
  autorun,
  action,
} from 'mobx'

export class AppState {
  @observable count = 0

  @observable name='rocky'

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(name) {
    this.name = name
  }
}

const appState = new AppState()
autorun(() => {
  // eslint-disable-next-line no-console
  console.log(appState.msg)
})

// setInterval(() => {
//   appState.add()
// }, 500)

export default appState
