import { getMoviePlatForms, postMoviePlatForm } from '@/api/modules/moviePlatForms'

export const usePlatForms = () => {
  const newPlatForm = ref<string>('')
  const curPlatForms = ref<string[]>([])
  const platFormList = ref<{ _id: string; name: string }[]>([])
  const getPlatFormList = async () => {
    const res = await getMoviePlatForms({
      page: 1,
      size: 999,
      sortField: 'name',
      sortType: 'asc',
    })
    platFormList.value = res.data.data || []
  }
  const hasPlatForm = (name: string) => {
    return platFormList.value.findIndex((item) => item.name === name) !== -1
  }
  const addPlatForm = async (name?: string) => {
    if (!name) return
    try {
      await postMoviePlatForm([name])
      getPlatFormList()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  const addPlatForms = async (PlatForms?: string[]) => {
    const tos = PlatForms?.filter(
      (item) => platFormList.value.findIndex((o) => o.name === item) === -1,
    )
    tos?.length && (await postMoviePlatForm(tos))
  }
  return {
    platFormList,
    newPlatForm,
    curPlatForms,
    getPlatFormList,
    hasPlatForm,
    addPlatForm,
    addPlatForms,
  }
}
