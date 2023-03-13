import { getMovieStarrings, postMovieStarring } from '@/api/modules/movieStarrings'

export const useStarrings = () => {
  const newStarring = ref<string>('')
  const curStarrings = ref<string[]>([])
  const starringList = ref<{ _id: string; name: string }[]>([])
  const getStarringList = async () => {
    const res = await getMovieStarrings({
      page: 1,
      size: 999,
      sortField: 'name',
      sortType: 'asc',
    })
    starringList.value = res.data.data || []
  }
  const hasStarring = (name: string) => {
    return starringList.value.findIndex((item) => item.name === name) !== -1
  }
  const addStarring = async (name?: string) => {
    if (!name) return
    try {
      await postMovieStarring([name])
      getStarringList()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  const addStarrings = async (starrings?: string[]) => {
    const tos = starrings?.filter(
      (item) => starringList.value.findIndex((o) => o.name === item) === -1,
    )
    await postMovieStarring({ names: tos })
  }
  return {
    starringList,
    newStarring,
    curStarrings,
    getStarringList,
    hasStarring,
    addStarring,
    addStarrings,
  }
}
