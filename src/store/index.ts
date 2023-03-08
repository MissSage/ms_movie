import { useLayoutStore } from './modules/layout'
export interface IPiniaStore {
  layout: ReturnType<typeof useLayoutStore>
}
const store: IPiniaStore = {} as IPiniaStore

export const registerPiniaStore = () => {
  store.layout = useLayoutStore()
}

export default store
