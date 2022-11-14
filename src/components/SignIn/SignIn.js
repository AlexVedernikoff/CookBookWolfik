import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { setUser, errorNull, errorFail } from '../../store/userSlice';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

import FormSignIn from './FormSignIn';

function SignIn() {
    
    const userLogin = (val) => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, val.email.trim(), val.password.trim())
            .then(({ user }) => {
                dispath(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
            })
            .catch(() => {
                dispath(errorFail());
            });
    };

    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const { error, userData } = useStateUser();

    const onCloseMessage = () => {
        dispath(errorNull());
    };
    
    const errorAlert = error && <Alert description="Something has gone wrong" type="error" showIcon closable onClose={() => onCloseMessage()} />;
    const successAlert = userData && <SuccessMessage description="Authorization was successful!" closable={false} />;
    const signInForm = !successAlert && <FormSignIn userLogin={userLogin} />;

    return (
        <>
            {errorAlert}
            {successAlert}
            {signInForm}
        </>
    );
};

export default SignIn;