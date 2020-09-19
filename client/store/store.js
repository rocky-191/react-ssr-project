import AppStateClass from './app-state'

export const AppState = AppStateClass

export default {
  AppState,
}

export const Createstoremap = () => ({
  appState: new AppState(),
})
