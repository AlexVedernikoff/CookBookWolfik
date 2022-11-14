import { Alert } from 'antd';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { db } from '../../../firebase';
import { PostItem } from '../PostItem/PostItem';
import { getPosts } from '../../../store/userSlice';

import classes from './PostList.module.scss';

export const PostsList = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const { posts, search, searchResult } = useStateUser();
    const dispath = useDispatch();
    useEffect(() => {
        postsUpdate();
    }, []);

    const postsUpdate = async () => {
        let postsArray = [];
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, '1'));
            querySnapshot.forEach((doc) => {
                let el = doc.data().recipes;
                el.elId = doc.id;
                postsArray.push(el);
            });
            dispath(getPosts({
                posts: postsArray
            }));
            setLoading(false);
        } catch (e) {
            console.log(e, 'ERROR');
            setError(true);
            setLoading(false);
        }
    };
    let result = search && search.length ? search : posts;
    if (searchResult) {
        result = [];
    }

    const postlist = posts && (
        <>
            {result.map((el) => (
                < >
                    <PostItem post={el} key={el.elId} />
                </>
            ))}
        </>
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
                {searchResult ? (
                    <Alert
                        className="alert"
                        message={searchResult}
                        showIcon
                    />
                ) : null}
            </div>
        </>
    );
};