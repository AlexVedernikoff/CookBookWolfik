import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    userData: null,
    error: null,
    posts: [],
    search: [],
    favoritesArray: {},
    searchResult:'',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.userData = true;
            state.error = null;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.userData = null;
            state.error = null;
        },
        logOutUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.userData = null;
            state.error = null;
        },
        errorFail(state) {
            state.error = true;
        },
        errorNull(state) {
            state.error = null;
        },
        getPosts(state, action) {
            state.posts = action.payload.posts;
        },
        sortPosts(state, action) {
            state.posts = action.payload.posts;
            state.search = action.payload.search;
        },
        searchRecipes(state, action) {
            state.search = action.payload.search;
            state.searchResult = action.payload.searchResult;
        },
        setFavorite(state, action) {
            state.favoritesArray = action.payload.favoritesArray;
        }
    },
});

export const { setUser, removeUser, logOutUser, errorNull, errorFail, getPosts, sortPosts, searchRecipes, setFavorite } = userSlice.actions;

export default userSlice.reducer;