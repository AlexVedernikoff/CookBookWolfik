import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.scss';
import { PostsList } from '../Post/PostList/PostsList';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Header from '../Header/Header';
import { baseRoute, articleRoute, signInRoute, signUpRoute, newArticleRoute } from '../../constants';
import CreateArticle  from '../Article/CreateArticle';

function App() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const { userData } = useStateUser();

    return (
        <Router>
            <div className="app">
                <header className="app_header">
                    <Link to='/' className='header_name'> CookBook </Link>
                    <Header />
                </header>
                <main className='app_main'>
                    <Route path={baseRoute} exact render={() => <Redirect to='/articles' />} />
                    <Route path={articleRoute} component={PostsList} exact />
                    <Route path={signInRoute} component={SignIn} exact />
                    <Route path={signUpRoute} component={SignUp} exact />
                    <Route path={newArticleRoute} exact>{userData ? <CreateArticle /> : <Redirect to={'/sign-in'} />} </Route>
                </main>
            </div>
        </Router>
    );
}

export default App;
