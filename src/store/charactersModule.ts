import { ICharacter } from '@/pages/CharactersPage/types';
import { fetchData } from '@/helpers/api';
import router from '@/router/index'

export const charactersModule = {
    state() {
        return {
            characters: [] as ICharacter[],
            isFilterActive: false,
            filterState: 'All',
            options: ['All', 'Alive', 'Unknown', 'Dead'],
            searchQuery: '',
            currentPage: 1,
            totalPages: 1,
            isLoading: false,
            url: '',
        }
    },
    getters: {

    },
    mutations: {
        setCharacters(state: any, characters: ICharacter[]) {
            state.characters = characters
        },
        setFilterState(state: any, filterState: string) {
            state.filterState = filterState
        },
        setSearchQuery(state: any, searchQuery: string) {
            state.searchQuery = searchQuery
        },
        setCurrentPage(state: any, page: number) {
            state.currentPage = page
        },
        setTotalPages(state: any, count: number) {
            state.totalPages = count
        },
        setIsLoading(state: any, bool: boolean) {
            state.isLoading = bool
        },
        setUrl(state: any, url: string) {
            state.url = url
        },
    },
    actions: {
        async fetchCharacters(ctx: any, url = 'https://rickandmortyapi.com/api/character') {
            const currentPage = Number(router.currentRoute.value.query.page)

            if (currentPage !== 1 && url === 'https://rickandmortyapi.com/api/character') {
                url = `https://rickandmortyapi.com/api/character?page=${currentPage}`
                ctx.commit('setCurrentPage', currentPage)
            }

            ctx.commit('setIsLoading', true)
            await fetchData(url)

                .then(({ data }) => {
                    const { results, info } = data

                    ctx.commit('setCharacters', results)
                    ctx.commit('setTotalPages', info.pages)

                    const url = info.prev || info.next
                    ctx.commit('setUrl', url)

                    ctx.commit('setFilterState', router.currentRoute.value.query.status || 'All')
                })
                .catch(error => alert(`Что-то пошло не так: ${error}`))
                .finally(() => ctx.commit('setIsLoading', false))
        },
        setFilterState(ctx: any, option: string) {

            if (option === ctx.state.filterState) return
            router.push({ query: { page: 1, status: option } })

            if (option === 'All') ctx.dispatch('fetchCharacters')

            else {
                const URL = 'https://rickandmortyapi.com/api/character/?status='
                ctx.dispatch('fetchCharacters', URL + option)
                ctx.commit('setCurrentPage', 1)

            }
        },
        changePage(ctx: any, { url, page }: { url: string, page: number }) {
            router.push({ query: { page: page, status: ctx.state.filterState } })
            ctx.commit('setCurrentPage', page)
            ctx.dispatch('fetchCharacters', url)

        },
        searchCharacters(ctx: any, query: string) {
            const URL = 'https://rickandmortyapi.com/api/character/?name='
            ctx.dispatch('fetchCharacters', URL + query)
        },
    },
    namespaced: true,
}