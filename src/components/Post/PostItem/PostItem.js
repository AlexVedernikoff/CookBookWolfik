import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { useState, useEffect } from 'react';
import { doc, increment, updateDoc, onSnapshot } from 'firebase/firestore';
import { Tag } from 'antd';

import { db } from '../../../firebase';
import { ArticleController } from '../../ArticleController/ArticleController';
import nolike from '../../../img/nolike.svg';
import likeic from '../../../img/like.svg';

import classes from './PostItem.module.scss';

export const PostItem = ({ post, controllerFlag, confirmDeletion }) => {
    console.log('post = ', post);
    const {
        name,
        description,
        id,
        likes,
        favorite,
        difficulty,
        ingredients,
        elId
    } = post;

    console.log('elId_PostItem = ', elId);
    const ingredientsList = ingredients.map((el, i) => (
        <Tag className="post_tag" key={i}>
            {' '}
            {el}{' '}
        </Tag>
    ));
    const paramId = `/articles/${id}`;
    const recipesRef = doc(db, '1', elId);
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };

    const { userData } = useStateUser();

    const [like, setLike] = useState(favorite);
    const [likeIcon, setLikeIcon] = useState(nolike);
    const [likeCount, setLikeCount] = useState(likes);
    const [isLikeDsabled, setLikeDsabled] = useState(true);

    // eslint-disable-next-line no-unused-vars
    const unsub = onSnapshot(doc(db, '1', elId), (doc) => {
        setLikeCount(doc.data().recipes.likes);
    });

    useEffect(() => {
        if (post.favorite) {
            setLike(true);
            setLikeIcon(likeic);
        }

        if (userData) {
            setLikeDsabled(false);
        }
        if (!userData) {
            setLikeIcon(nolike);
            setLikeDsabled(true);
        }
    }, [userData, post.favorite]);

    const onlikeClick = async () => {
        if (!like) {
            await updateDoc(recipesRef, { 'recipes.favorite': true }),
            await updateDoc(recipesRef, { 'recipes.likes': increment(1) }),
            setLike(true);
            setLikeIcon(likeic);
        } else {
            await updateDoc(recipesRef, { 'recipes.favorite': false }),
            await updateDoc(recipesRef, { 'recipes.likes': increment(-1) }),
            setLike(false);
            setLikeIcon(nolike);
        }
    };
    return (
        <>
            <div className={classes['post_title']}>
                <Link
                    to={paramId}
                    className={classes['title_item']}
                >
                    {name}
                </Link>
                <div className={classes['like_count']}>
                    <button
                        type="button"
                        className={classes['button-likes']}
                        onClick={onlikeClick}
                        disabled={isLikeDsabled}
                    >
                        <img className={classes['post_like']} src={likeIcon} alt="like" />
                        {likeCount}
                    </button>
                </div>
            </div>
            <h4 className={classes['post_difficulty']}>
                {difficulty}
                <div className={classes['person_ingredients']}>{ingredientsList}</div>
            </h4>
            <p className={classes['post_description']}>{description}</p>
            <ArticleController
                controllerFlag={controllerFlag}
                confirmDeletion={confirmDeletion}
            />
        </>
    );
};