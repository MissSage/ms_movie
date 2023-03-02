import request from "./axios"
export const getMovieTags = (params?: IQueryParams) => {
    return request({
        url: "/api/movietags",
        method: "get",
        params
    })
}
export const postMovieTag = (params: any) => {
    return request({
        url: "/api/movietags",
        method: "post",
        data: params
    })
}

export const updateMovieTag = (id: string, params: any) => {
    return request({
        url: '/api/movietags/' + id,
        method: 'put',
        data: params
    })
}