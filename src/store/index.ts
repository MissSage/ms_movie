import { useLayoutStore } from './modules/layout'
export interface IPiniaStore {
  layout: ReturnType<typeof useLayoutStore>
}
const store: IPiniaStore = {} as IPiniaStore
/**
 * 把各模块注册到store中
 */
export const registerPiniaStore = () => {
  store.layout = useLayoutStore()
}

export default store
