import { getMovieTags, postMovieTag } from "@/api/movieTags"
import { ElMessage } from "element-plus"
import { computed, ref } from "vue"

export const useTags = () => {
    const tagList = ref<any[]>([])
    const getTagList = async () => {
        const res = await getMovieTags({
            page: 1,
            size: 999
        })
        tagList.value = res.data.data?.data || []
    }
    const hasTag = (name: string) => {
        return tagList.value.findIndex(item => item.name === name) !== -1
    }
    const addTag = async (name?: string) => {
        if (!name) return
        try {
            const res = await postMovieTag({
                name: name
            })
            getTagList()
        } catch (error: any) {
            throw new Error(error.message)
        }

    }
    return {
        tagList,
        getTagList,
        hasTag,
        addTag
    }
}