import axios from 'axios';

export const fetchPage = async (url: string) => {
    const { data } = await axios.get(url)
    const { prev, next } = data.info

    return { data: data.results, prev, next }
}

export const fetchData = async (url: string) => {
    const response = await axios.get(url).then(response => {
        return response
    }).catch(error => {
        return error
    })
    return response
}