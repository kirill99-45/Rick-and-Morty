import { ISeason } from "./types"

export const getSeason = (episode: number) => {
    if (episode < 12) return 1
    if (episode > 11 && episode < 22) return 2
    if (episode > 21 && episode < 32) return 3
    if (episode > 31 && episode < 42) return 4
    else return 5
}

export const createSeasons = (): ISeason[] => {
    return new Array(6).fill(null).map((_, index) => {
        return { id : index, episodes: [] }
    })
}