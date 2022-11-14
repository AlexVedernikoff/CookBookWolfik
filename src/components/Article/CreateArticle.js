import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import { db } from '../../firebase';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

import NewArticle from './NewArticle';

function CreateArticle() {
    const [isSuccessAlert, setSuccessAlert] = useState(false);

    const createArticle = async (val) => {
        const docData = {
            recipes: {
                name: val.title.trim(),
                description: val.description,
                body: val.body,
                difficulty: val.difficulty,
                likes: 0,
                favorite: false,
                ingredients: val.ingredients.map((el) => el.trim()).filter((el) => el && el !== ''),
                image: val.image || '',
            }
        };
        await addDoc(collection(db, '1'), docData);
        setSuccessAlert(true);
    };

    const atCloseAletr = () => {
        setSuccessAlert(false);
    };

    const form = !isSuccessAlert && (
        <NewArticle transferData={createArticle} title="Create new recipe" />
    );

    const successAlert = isSuccessAlert && (
        <SuccessMessage description="Recipe created successfully!" closingAlert={atCloseAletr} closable />
    );
    return (
        <>
            {successAlert}
            {form}
        </>
    );
}

export default CreateArticle;