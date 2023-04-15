import { GUI } from 'dat.gui'
export const useGUI = () => {
  const gui = new GUI({
    name: 'ThreeJS',
  })
  onBeforeUnmount(() => {
    gui.destroy()
  })
  return {
    gui,
  }
}
