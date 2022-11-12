import { Alert } from 'antd';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { collection, getDocs } from 'firebase/firestore';
import { v4 } from 'uuid';

import { db } from '../../../firebase';
import { PostItem } from '../PostItem/PostItem';

import classes from './PostList.module.scss';

export const PostsList = () => {
    let elId = '';
    const [post, setPost] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postsUpdate();
    }, []);

    const postsUpdate = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, '1'));
            querySnapshot.forEach((doc) => {
                let el = doc.data().recipes;
                el.elId = doc.id;
                setPost((post) => [...post, el]);

                console.log(doc.id, '=>', doc.data().recipes);

                console.log('elId', '=>', elId);
            });
            setLoading(false);
        } catch (e) {
            console.log(e, 'ERROR');
            setError(true);
            setLoading(false);
        }
    };

    const postlist = post && (
        <>
            {post.map((el) => (
                <div className={classes['post_item']} key={v4()}>
                    {/* {console.log("elId_2", "=>", elId)} */}
                    {/* //el.elId = elId; */}
                    <PostItem post={el} />
                </div>
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
            </div>
        </>
    );
};