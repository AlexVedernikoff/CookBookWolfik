import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDoc } from 'firebase/firestore';

import NewArticle from '../Article/NewArticle';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { db } from '../../firebase';

function EditArticle() {
    const { id } = useParams();
    console.log(id, 'USEPARAM');
    const [articleTitle, setArticleTitle] = useState('');
    const [description, setDescription] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [isSuccessAlert, setSuccessAlert] = useState(false);


    const updateFormData = async () => {

        console.log(typeof id, 'ELE');
        let docSnap = await getDoc(db, '1', id);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
        }
    };

    useEffect(() => {
        updateFormData();
    }, []);

    const articleUpdate = (val) => {
        const modifiedArticle = {
            title: val.title.trim(),
            description: val.description.trim(),
            body: val.body,
            tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
        };

        // putArticleUpdate(id, modifiedArticle)
        //     .then((res) => {
        //         if (res.article) {
        //             setSuccessAlert(true);

        //             updateFormData();
        //         }
        //     });
    };

    const atCloseAletr = () => {
        setSuccessAlert(false);
    };

    const form = !isSuccessAlert && (
        <NewArticle
            title="Edit recipes"
            ingredients={ingredients}
            description={description}
            articleTitle={articleTitle}
            articleBody={articleBody}
            transferData={articleUpdate}
        />
    );

    const successAlert = isSuccessAlert && (
        <SuccessMessage description="Recipe update successfully!" closingAlert={atCloseAletr} closable={true} />
    );
    return (
        <>
            {successAlert}
            {form}
        </>
    );
}

export default EditArticle;