/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from '../styles/global-styles';
import 'styles/app.scss';

import {
  Auth as AuthProvider,
  RedirectIfAuth,
  ProtectedRoute,
} from './containers/Auth';
import { NotFoundPage } from './containers/NotFoundPage/Loadable';
import { Editor } from './containers/Editor/Loadable';
import { Presentation } from './containers/Presentation/Loadable';
import { Login } from './containers/Login/Loadable';
import { Register } from './containers/Register/Loadable';
import { Home } from './containers/Home/Loadable';
import { Trash } from './containers/Trash/Loadable';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Helmet
          titleTemplate="%s - Slide Presentation"
          defaultTitle="Slide Presentation"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A Slide Presentation application" />
        </Helmet>

        <Switch>
          <RedirectIfAuth path="/login">
            <Login />
          </RedirectIfAuth>
          <Route exact={false} path="/register" component={Register} />

          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trash" component={Trash} />
          <ProtectedRoute
            exact
            path="/slide/:slideId/editor"
            component={Editor}
          />
          <ProtectedRoute
            exact
            path="/slide/:slideId/presentation"
            component={Presentation}
          />

          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
        <ToastContainer position="bottom-left" />
      </AuthProvider>
    </BrowserRouter>
  );
}
