import {  Alert } from 'antd';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../../firebase';
import { PostItem } from '../PostItem/PostItem';

import classes from './PostList.module.scss';

export const PostsList = () => {
    const [post, setPost] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postsUpdate();
    }, []);

    const postsUpdate = async () => {
        
        try {
            setLoading(true);
            const docRef = doc(db, '1', 'bG1yt5hBMi2hPFcYjCWi');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log('Document data:', typeof(docSnap.data));
                setPost(docSnap.data().recipes);
                console.log(post, 'post');
            } else {
                console.log('No such document!');
                setError(true);
            }
            setLoading(false);
        } catch (e) {
            console.log(e, 'ERROR');
            setError(true);
            setLoading(false);
        }
    };
    const posts = post;

    const postlist = post && (
        <>
            {[posts].map((el) => (
                <div className={classes['post_item']} key={el.id} >
                    <PostItem post={el} />
                </div>
            ))}
        </>
    );

    return (
        <>
            <div className={classes['post_list']}>
                {error
                    ? <Alert className='alert' message='Something has gone wrong' type="error" showIcon />
                    : null}
                {loading
                    ? <TailSpin color='#00BFFF' height={80} width={80} />
                    : postlist
                }
            </div>
        </>
    );

};