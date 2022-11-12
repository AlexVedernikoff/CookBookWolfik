import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../../firebase';

import classes from './PostFull.module.scss';

export const PostFull = ({ itemId }) => {
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [post, setPost] = useState([]);
    console.log('itemId = ', itemId);
    console.log('Мы здесь!');

    useEffect(() => {
        postsUpdate();
    }, []);

    const postsUpdate = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, '1'));
            querySnapshot.forEach((doc) => {
                let el = doc.data().recipes;
                setPost((post) => [...post, el]);

                console.log(doc.id, '=>', doc.data().recipes);
            });
            setLoading(false);
        } catch (e) {
            console.log(e, 'ERROR');
            // setError(true);
            setLoading(false);
        }
    };

    const receiptCard = post.filter((el) => {
        return el.id === itemId;
    })[0];

    console.log('receiptCard ', receiptCard);

    return (
        <div className={classes['wrapper']}>
            {!loading ? (
                <>
                    <div className={classes['image-container']}>
                        <img src={receiptCard.image} alt="" />
                    </div>

                    <div className={classes['text-container']}>
                        <div className={classes['title']}>
                            <h1>{receiptCard.name}</h1>
                        </div>
                        <div className={classes['ingredients']}>
                            <div className={classes['ingredients-left']}>
                                краткое описание
                            </div>
                            <div className={classes['ingredients-right']}>
                                {receiptCard.description}
                            </div>
                        </div>
                        <div className={classes['ingredients']}>
                            <div className={classes['ingredients-left']}>ингредиенты</div>
                            <div className={classes['ingredients-right']}>
                                {receiptCard.ingredients}
                            </div>
                        </div>
                        <div className={classes['ingredients']}>
                            <div className={classes['ingredients-left']}>
                                процесс приготовления
                            </div>
                            <div className={classes['ingredients-right']}>
                                {receiptCard.body}
                            </div>
                        </div>
                        <div className={classes['footer']}>
                            <div>Оценили {receiptCard.likes}</div>
                            <div> {receiptCard.difficulty}</div>
                            <div>
                                <button type="button" className="user-data__button">
                                    Редактировать рецерт
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};