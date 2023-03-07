import request from "./axios"
export const toggleFavourMovie = (id: string) => {
    return request({
        url: '/api/favorite/toggle',
        method: 'post',
        data: {
            movieId: id
        }
    })
}
export const getFavour = (movieId: string) => {
    return request({
        url: '/api/favorite',
        method: 'get',
        params: {
            movieId: movieId
        }
    })
}