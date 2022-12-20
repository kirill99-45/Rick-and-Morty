import { fetchData } from "@/helpers/api"
import { createSeasons, getSeason } from "@/pages/EpisodesPage/helpers"
import { IEpisode, ISeason } from "@/pages/EpisodesPage/types"

export const episodesModule = {
    state() {
        return {
            episodes: [] as IEpisode[],
            searchQuery: '',
            isLoading: false,
            currentPage: 1,
            totalPages: 0,
            url: '',
        }
    },
    getters: {
        getSortedSeasons(state: any): ISeason[] {
            const seasons = createSeasons()
            state.episodes.forEach((episode: IEpisode) => {
                seasons[getSeason(episode.id)].episodes.push(episode)
            })
            return seasons
        },
    },
    mutations: {
        setIsLoading(state: any, bool: boolean) {
            state.isLoading = bool
        },
        setSearchQuery(state: any, query: string) {
            state.searchQuery = query
        },
        setCurrentPage(state: any, pageNumber: number | string) {
            state.currentPage = pageNumber
        },
        setTotalPages(state: any, totalPages: number) {
            state.totalPages = totalPages
        },
        setEpisodes(state: any, episodes: IEpisode[]) {
            state.episodes = episodes
        },
        setUrl(state: any, url: string) {
            state.url = url
        },
    },
    actions: {
        async fetchEpisodes(ctx: any, url = 'https://rickandmortyapi.com/api/episode') {
            const { commit } = ctx

            commit('setIsLoading', true)
            await fetchData(url)
                .then(({ data }) => {
                    const { results, info } = data
                    const url = info.next || info.prev

                    commit('setEpisodes', results)
                    commit('setUrl', url)
                    commit('setTotalPages', info.pages)
                })
                .catch(error => alert(`Что-то пошло не так: ${error}`))
                .finally(() => commit('setIsLoading', false))
        },
        searchEpisode(ctx: any, query: string) {
            const URL = 'https://rickandmortyapi.com/api/episode/?name='
            ctx.dispatch('fetchEpisodes', URL + query)
        },
        changePage(ctx: any, { url, page }: { url: string, page: number }) {
            ctx.dispatch('fetchEpisodes', url)
            ctx.commit('setCurrentPage', page)
        }
    },
    namespaced: true,
}