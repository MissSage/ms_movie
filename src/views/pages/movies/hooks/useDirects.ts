import { getMovieDirects } from '@/api/modules/movie/movieDirects'

const useDirects = () => {
  const directs = ref<{ path: string }[]>([])
  const path = ref<string>('')
  const curDirect = ref<string>('')
  const getDirects = async () => {
    const res = await getMovieDirects({
      path: path.value
    })
    directs.value = res.data.data
  }
  return {
    getDirects,
    directs,
    curDirect,
    path
  }
}
export default useDirects
