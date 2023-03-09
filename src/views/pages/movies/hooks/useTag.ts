import { getMovieTags, postMovieTag } from '@/api/modules/movieTags'

export const useTags = () => {
  const tagList = ref<{ _id: string; name: string }[]>([])
  const getTagList = async () => {
    const res = await getMovieTags({
      page: 1,
      size: 999,
    })
    tagList.value = res.data.data?.data || []
  }
  const hasTag = (name: string) => {
    return tagList.value.findIndex((item) => item.name === name) !== -1
  }
  const addTag = async (name?: string) => {
    if (!name) return
    try {
      await postMovieTag([name])
      getTagList()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  const addTags = async (tags?: string[]) => {
    const tos = tags?.filter((item) => tagList.value.findIndex((o) => o.name === item) === -1)
    await postMovieTag({ names: tos })
  }
  return {
    tagList,
    getTagList,
    hasTag,
    addTag,
    addTags,
  }
}
