import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import _debounce from 'lodash.debounce';

import { searchRecipes } from '../../store/userSlice';

const SearchRecipes = () => {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const { posts } = useStateUser();
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {

        const query = e.target.value;
        let arrSearch = [];

        for (let item of posts) {
            if (query && item.name.toLowerCase().includes(query)
                || item.difficulty.toLowerCase().includes(query)
                || item.ingredients.includes(query)) {
                arrSearch.push(item);
            } else if (!query) {
                dispatch(searchRecipes({
                    search: [],
                }));
                return;
            }
        }

        if (!arrSearch.length) {
            dispatch(searchRecipes({
                search: [],
                searchResult: 'Совпадений не найдено',
            }));
        } else {
            dispatch(searchRecipes({
                search: arrSearch,
            }));
        }
    };

    return (
        <>
            <Input placeholder="Type to search" onChange={_debounce(onChangeHandler, 500)} />;
        </>
    );

};

export default SearchRecipes;