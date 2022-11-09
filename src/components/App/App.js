import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import './App.scss';
import { PostsList } from '../Post/PostList/PostsList';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Header from '../Header/Header';
import { baseRoute, articleRoute, signInRoute, signUpRoute } from '../../constants';

function App() {

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
                </main>
            </div>
        </Router>
    );
}

export default App;
