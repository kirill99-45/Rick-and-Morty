import { ICharacter } from '@/pages/CharactersPage/types';
import { fetchData } from '@/helpers/api';

export const charactersModule  = {
    state() {
        return {
            characters: [] as ICharacter[],
            isFilterActive: false,
            filterState: 'All',
            options: ['All', 'Alive', 'Unknown', 'Dead'],
            searchQuery: '',
            prevPage: null as null | string,
            nextPage: null as null | string,
            isLoading: false,
        }
    },
    getters: {
        allCharacters(state: any) { // TODO PROPS TYPE (!)
            return state.characters
        },
    },
    actions: {
        async fetchCharacters(ctx: any, url = 'https://rickandmortyapi.com/api/character') {
            await fetchData(url).then(({ data }) => {
                const { results, info } = data
                ctx.commit('setCharactes', results)
                ctx.commit('setPrevPage', info.prevPage)
                ctx.commit('setNextPage', info.NextPage)
            }).catch(error => alert(`Что-то пошло не так: ${error}`)).finally(() => ctx.commit('setIsLoading', false))
        },
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
        setNextPage(state: any, nextPage: string) {
            state.nextPage = nextPage
        },
        setPrevPage(state: any, prevPage: string) {
            state.prevPage = prevPage
        },
        setIsLoading(state: any, isLoading: boolean) {
            state.isLoading = isLoading
        },
    }
    // namespaced: true,
}