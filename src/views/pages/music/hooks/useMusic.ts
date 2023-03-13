import { editMusic, getMusic as getMusicDetail } from '@/api'
import { ElMessage } from 'element-plus'
export const useMusic = () => {
  const music = ref<Record<string, any> | undefined>()
  const getMusic = async (id: string) => {
    if (!id) {
      music.value = {}
      return
    }
    const res = await getMusicDetail(id)
    music.value = res.data || {}
  }
  const putMusic = async (id: string, params: any) => {
    const res = await editMusic(id, params)
    if (res.data) {
      ElMessage.success('保存成功')
    } else {
      ElMessage.error('保存失败')
    }
    return res
  }
  return {
    music,
    getMusic,
    putMusic,
  }
}
