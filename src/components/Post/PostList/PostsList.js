import { Alert } from 'antd';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { setFavorite, getPosts } from '../../../store/userSlice';
import { db } from '../../../firebase';
import { PostItem } from '../PostItem/PostItem';


import classes from './PostList.module.scss';

export const PostsList = () => {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };

    const { posts, search, searchResult, filters } = useStateUser();
    const dispath = useDispatch();

    useEffect(() => {
        postsUpdate();
    }, []);

    const postsUpdate = async () => {
        let postsArray = [];
        let favoritesArray = {};
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, '1'));
            querySnapshot.forEach((doc) => {
                let el = doc.data().recipes;
                el.elId = doc.id;
                postsArray.push(el);
                favoritesArray[el.elId] = el.favorite;
            });
            dispath(
                getPosts({
                    posts: postsArray
                })
            );
            dispath(
                setFavorite({
                    favoritesArray: favoritesArray
                })
            );

            setLoading(false);
        } catch (e) {
            setError(true);
            setLoading(false);
        }
    };

    let result = search && search.length ? search : posts;
    if (searchResult) {
        result = [];
    }
    let filteredResult = result.filter((el) => {

        if (filters.hard && el.difficulty == 'Сложный') {
            return true;
        } else if (filters.lite && el.difficulty == 'Легкий') {
            return true;
        } else if (filters.lite && filters.hard) {
            return true;
        } else {
            return false;
        }
    });

    const postlist = posts && (
        filteredResult.map((el) => (
            <PostItem post={el} key={el.elId} />
        ))
    );

    return (
        <>
            <div className={classes['post_list']}>
                {error ? (
                    <Alert
                        className="alert"
                        message="Something has gone wrong"
                        type="error"
                        showIcon
                    />
                ) : null}
                {loading ? (
                    <TailSpin color="#00BFFF" height={80} width={80} />
                ) : (
                    postlist
                )}
                {!loading && (searchResult || !filteredResult.length) ? (
                    <Alert
                        className="alert"
                        message={'Совпадений не найдено!'}
                        showIcon
                    />
                ) : null}
            </div>
        </>
    );
};