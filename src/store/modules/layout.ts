import { defineStore } from "pinia"
import { reactive, toRefs } from "vue"
export interface Store_Layout {
  collapse: boolean
}
export const useLayoutStore = defineStore("layoutStore", () => {
  const initialState: Store_Layout = {
    collapse: false
  }
  const state = reactive<Store_Layout>(initialState)
  const actions = {
    Set_Colllapse: (payload: boolean) => {
      state.collapse = !!payload
    },
    Toggle_Collapse: () => {
      state.collapse = !state.collapse
    }
  }
  return {
    ...toRefs(state),
    ...actions
  }
})
