import { createStore } from 'vuex';
import { charactersModule } from './charactersModule';

export default createStore({
    modules : {
        characters: charactersModule,
    }
})