import { editMovie, getMovie as getMovieDetail } from '@/api'
import { ElMessage } from 'element-plus'
import { usePlatForms } from './usePlatForm'
import { useTags } from './useTag'
import { useTypes } from './useType'
export const useMovie = () => {
  const movie = ref<Record<string, any> | undefined>()
  const tags = useTags()
  const types = useTypes()
  const platforms = usePlatForms()
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
  const addTag = async () => {
    if (!tags.newTag.value || !movie.value) return
    try {
      if (tags.curTags.value.indexOf(tags.newTag.value) !== -1) return
      movie.value.tags = [...tags.curTags.value, tags.newTag.value].join(',')
      await putMovie(movie.value._id, { tags: movie.value.tags })
      if (!tags.hasTag(tags.newTag.value)) {
        await tags.addTag(tags.newTag.value)
      }
      ElMessage.success('添加成功')
    } catch (error: any) {
      ElMessage.error('添加失败')
      throw new Error(error.message)
    }
  }
  const addType = async () => {
    if (!types.newType.value || !movie.value) return
    try {
      if (types.curTypes.value.indexOf(types.newType.value) !== -1) return
      movie.value.types = [...types.curTypes.value, types.newType.value]
      await putMovie(movie.value._id, { types: movie.value.types })
      if (!types.hasType(types.newType.value)) {
        await types.addType(types.newType.value)
      }
      ElMessage.success('添加成功')
    } catch (error: any) {
      ElMessage.error('添加失败')
      throw new Error(error.message)
    }
  }
  const addPlatForm = async () => {
    if (!platforms.newPlatForm.value || !movie.value) return
    try {
      if (platforms.curPlatForms.value.indexOf(platforms.newPlatForm.value) !== -1) return
      movie.value.platforms = [...platforms.curPlatForms.value, platforms.newPlatForm.value]
      await putMovie(movie.value._id, { platforms: movie.value.platforms })
      if (!platforms.hasPlatForm(platforms.newPlatForm.value)) {
        await platforms.addPlatForm(platforms.newPlatForm.value)
      }
      ElMessage.success('添加成功')
    } catch (error: any) {
      ElMessage.error('添加失败')
      throw new Error(error.message)
    }
  }
  const setMovieTags = (value: any[]) => {
    if (!movie.value) return
    movie.value.tags = value.join(',')
  }
  const setMovieTypes = (value: any[]) => {
    if (!movie.value) return
    movie.value.types = value
  }
  const setMoviePlatForms = (value: any[]) => {
    if (!movie.value) return
    movie.value.platforms = value
  }
  watch(
    () => movie.value?.tags,
    () => {
      tags.curTags.value = movie.value?.tags?.split(',')?.filter((item: string) => !!item) || []
    },
  )
  watch(
    () => movie.value?.types,
    (newVal: any) => {
      if (typeof newVal === 'object') {
        types.curTypes.value = movie.value?.types?.filter((item: string) => !!item) || []
      } else {
        types.curTypes.value = []
      }
    },
  )
  watch(
    () => movie.value?.platforms,
    (newVal: any) => {
      if (typeof newVal === 'object') {
        platforms.curPlatForms.value =
          movie.value?.platforms?.filter((item: string) => !!item) || []
      } else {
        platforms.curPlatForms.value = []
      }
    },
  )
  onMounted(() => {
    tags.getTagList()
    types.getTypeList()
    platforms.getPlatFormList()
  })
  return {
    tags,
    movie,
    getMovie,
    putMovie,
    addTag,
    setMovieTags,
    types,
    setMovieTypes,
    addType,
    platforms,
    setMoviePlatForms,
    addPlatForm,
  }
}
