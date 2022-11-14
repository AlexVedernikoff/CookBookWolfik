import { useDispatch, useSelector } from 'react-redux';

import { sortPosts } from '../../store/userSlice';

import classes from './SortRecipes.module.scss';
const SortRecipes = () => {

    const useStateUser = () => {
        const stateUserst = useSelector(state => state.user);
        return stateUserst;
    };
    const { posts, search } = useStateUser();
    const dispatch = useDispatch();

    const onSortName = () => {
        if (search && search.length > 0) {
            dispatch(sortPosts({
                search: [...search].sort((prev, next) => {
                    if (prev.name < next.name) return -1;
                    if (prev.name < next.name) return 1;
                }),
                posts: posts,
            }));
        } else {
            dispatch(sortPosts({
                posts: [...posts].sort((prev, next) => {
                    if (prev.name < next.name) return -1;
                    if (prev.name < next.name) return 1;
                })
            }));
        }

    };

    const onSortPopular = () => {
        if (search && search.length > 0) {
            dispatch(sortPosts({
                search: [...search].sort((prev, next) => next.likes - prev.likes),
                posts: posts,
            }));
        } else {
            dispatch(sortPosts({
                posts: [...posts].sort((prev, next) => next.likes - prev.likes),
                search: search,
            }));
        }

    };
    return (
        <div className={classes['container']}>
            <button className={classes['sorts']} onClick={onSortName} >
                По названию
            </button>
            <button className={classes['sorts']} onClick={onSortPopular} >
                По популярности
            </button>
        </div>
    );


};

export default SortRecipes;