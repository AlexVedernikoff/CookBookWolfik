/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { useState} from 'react';

import { ArticleController } from '../../ArticleController/ArticleController';
import nolike from '../../../img/nolike.svg';

import classes from './PostItem.module.scss';

export const PostItem = ({ post, controllerFlag, confirmDeletion }) => {
    const { name, description, id, likes, difficulty } = post;
    const paramId = `/articles/${id}`;

    const [likeIcon, setLikeIcon] = useState(nolike);
    const [isLikeDsabled, setLikeDsabled] = useState(true);

    return (
        <>
            <div className={classes['post_title']}>
                <Link to={paramId} className={classes['title_item']}>
                    {name}
                </Link>
                <div className={classes['like_count']}>
                    <button
                        type="button"
                        className={classes['button-likes']}
                        onClick={console.log('click')}
                        disabled={isLikeDsabled}
                    >
                        <img className={classes['post_like']} src={likeIcon} alt='like' />{likes}
                    </button>
                </div>
            </div>
            <h4 className={classes['post_difficulty']}>{difficulty}
                <div className={classes['person_ingredients']}>ingrediens</div>
            </h4>
            <p className={classes['post_description']}>
                {description}
            </p>
            <ArticleController controllerFlag={controllerFlag} confirmDeletion={confirmDeletion} />
        </>
    );
};