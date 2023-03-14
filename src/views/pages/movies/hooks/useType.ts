import { getMovieTypes, postMovieType } from '@/api/modules/movieTypes'

export const useTypes = () => {
  const newType = ref<string>('')
  const curTypes = ref<string[]>([])
  const typeList = ref<{ _id: string; name: string }[]>([])
  const getTypeList = async () => {
    const res = await getMovieTypes({
      page: 1,
      size: 999,
      sortField: 'name',
      sortType: 'asc',
    })
    typeList.value = res.data.data || []
  }
  const hasType = (name: string) => {
    return typeList.value.findIndex((item) => item.name === name) !== -1
  }
  const addType = async (name?: string) => {
    if (!name) return
    try {
      await postMovieType([name])
      getTypeList()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  return {
    typeList,
    newType,
    curTypes,
    getTypeList,
    hasType,
    addType,
  }
}
