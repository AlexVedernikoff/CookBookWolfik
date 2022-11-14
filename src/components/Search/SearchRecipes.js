import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import _debounce from 'lodash.debounce';

import { searchRecipes } from '../../store/userSlice';

import classes from './SearchRecipes.module.scss';

const SearchRecipes = () => {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const { posts } = useStateUser();
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const query = e.target.value;

        let check = [];
        for (let item of posts) {
            if (query && item.name.includes(query)) {
                dispatch(searchRecipes({
                    search: [...posts].filter(el => el.name.includes(item.name)),
                }));
            } else if (!query) {
                dispatch(searchRecipes({
                    search: [],
                }));
            } else if (item.name.includes(query) === false) {
                check.push(false);
            }
            if (check.length === posts.length) {
                dispatch(searchRecipes({
                    search: [],
                    searchResult: 'Совпадений не найдено',
                }));
            }
        }
    };

    return (
        <>
            <Input placeholder="Type to search" className={classes['search']} onChange={_debounce(onChangeHandler, 500)} />;
        </>
    );

};

export default SearchRecipes;