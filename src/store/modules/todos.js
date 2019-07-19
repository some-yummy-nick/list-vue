import Axios from 'axios';
const state = {
    todos: null
};
const getters = {
    TODOS: state => {
        return state.todos;
    }
};
const mutations = {
    SET_TODO: (state, payload) => {
        state.todos = payload;
    },
    ADD_TODO: (state, payload) => {
        state.todos.push(payload);
    },
};
const actions = {
    GET_TODO: async (context, payload) => {
        let data = [
            {
                name: "кефир",
                category: "мои",
                time: "2019-07-16",
                editable: false
            },
            {
                name: "кроссы",
                category: "мои",
                time: "2019-07-15",
                editable: false
            },
            {
                name: "велик",
                category: "мои",
                time: "2019-07-15",
                editable: false
            },
            {
                name: "перчатки",
                category: "мои",
                time: "2019-07-16",
                editable: false
            },
            {
                name: "тур",
                category: "общие",
                time: "2019-07-16",
                editable: false
            },
            {
                name: "квартира",
                category: "общие",
                time: "2019-07-16",
                editable: false
            },
            {
                name: "фильтр",
                category: "общие",
                time: "2019-07-17",
                editable: false
            }
        ]
        context.commit('SET_TODO', data);
    },
    SAVE_TODO: async (context, payload) => {
        let {data} = await Axios.post('https://jsonplaceholder.typicode.com/todos/');
        context.commit('ADD_TODO', payload);
    }
};
export default {
    state, getters, mutations, actions
};
