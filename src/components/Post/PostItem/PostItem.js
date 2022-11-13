/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { useState, useEffect } from 'react';
import { doc, increment, updateDoc, onSnapshot } from 'firebase/firestore';
import { Tag } from 'antd';

import { db } from '../../../firebase';
import nolike from '../../../img/nolike.svg';
import likeic from '../../../img/like.svg';

import classes from './PostItem.module.scss';

export const PostItem = ({ post }) => {
    console.log('post = ', post);
    const {
        name,
        description,
        id,
        likes,
        favorite,
        difficulty,
        ingredients,
        elId,
        image
    } = post;

    console.log('elId_PostItem = ', elId);
    const ingredientsList = ingredients.map((el, i) => (
        <Tag className="post_tag" key={i}>
            {' '}
            {el}{' '}
        </Tag>
    ));
    const paramId = `/articles/${elId}`;
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

    const onlikeClick = async (event) => {
        console.log('event.target = ', event.currentTarget);
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
            <li className={classes['recipeCard']}>
                <div
                    className={classes['image__container']}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className={classes['recipeCard__information']}>
                    <div className={classes['recipeCard__header']}>
                        <div>
                            <Link to={paramId} className={classes['title_item']}>
                                {name}
                            </Link>
                        </div>
                    </div>
                    <div className={classes['recipeCard__description']}>{description}</div>
                    <div className={classes['recipeCard__prefixText']}>
                        Вам понадобится:
                    </div>
                    <div className={classes['recipeCard__ingredients']}>{ingredients}</div>
                    <div className={classes['recipeCard__footer']}>
                        <div className={classes['recipeCard__likes']}>
                            <button
                                type="button"
                                className={classes['button-likes']}
                                onClick={onlikeClick}
                                disabled={isLikeDsabled}
                            >
                                <img
                                    className={classes['post_like']}
                                    src={likeIcon}
                                    alt="like"
                                />
                            </button>
                            {likeCount}
                        </div>
                        <div className={classes['recipeCard__difficulty']}>{difficulty}</div>
                    </div>
                </div>
            </li>
        </>
    );
};