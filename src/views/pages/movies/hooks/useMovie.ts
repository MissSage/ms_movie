import { editMovie, getMovie as getMovieDetail } from '@/api'
import { ElMessage } from 'element-plus'
import { useTags } from './useTag'
export const useMovie = () => {
  const movie = ref<Record<string, any> | undefined>()
  const tags = useTags()
  const getMovie = async (id: string) => {
    if (!id) {
      movie.value = {}
      return
    }

    const res = await getMovieDetail(id)
    movie.value = res.data || {}
  }
  const putMovie = async (id: string, params: any) => {
    const res = await editMovie(id, params)
    if (res.data) {
      ElMessage.success('保存成功')
    } else {
      ElMessage.error('保存失败')
    }
    return res
  }
  const newTag = ref<string>('')
  const addTag = async () => {
    if (!newTag.value || !movie.value) return
    try {
      if (curTags.value.indexOf(newTag.value) !== -1) return
      movie.value.tags = [...curTags.value, newTag.value].join(',')
      await putMovie(movie.value._id, { tags: movie.value.tags })
      if (!tags.hasTag(newTag.value)) {
        tags.addTag(newTag.value)
      }
      ElMessage.success('添加成功')
    } catch (error: any) {
      ElMessage.error('添加失败')
      throw new Error(error.message)
    }
  }
  const curTags = ref<string[]>([])
  watch(
    () => movie.value?.tags,
    () => {
      curTags.value =
        movie.value?.tags?.split(',')?.filter((item: string) => !!item) || []
    },
  )
  onMounted(() => {
    tags.getTagList()
  })
  return {
    tags,
    movie,
    curTags,
    getMovie,
    putMovie,
    newTag,
    addTag,
  }
}
