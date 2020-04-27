import React, { Suspense, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import LogInPage from './pages/LogInPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import AppBar from './components/AppBar';
import { User } from './models/user.model';
import _isEmpty from 'lodash/isEmpty';
import * as routes from './constants/routes';
import PropTypes from 'prop-types';

interface RoutesProps {
    user: User;
}

const Routes: React.FC<RoutesProps> = ({ user }): JSX.Element => (
    <BrowserRouter>
        <Suspense fallback={<span />}>
            {_isEmpty(user) ? (
                <Route path={routes.LOGIN_PAGE} component={LogInPage} />
            ) : (
                <Fragment>
                    <AppBar />
                    <Route
                        path={routes.LANDING_PAGE}
                        exact
                        component={DashboardPage}
                    />
                    <Route
                        path={routes.PRODUCTS_PAGE}
                        exact
                        component={ProductsPage}
                    />
                    <Route
                        path={routes.ADD_PRODUCT}
                        exact
                        component={AddProductPage}
                    />
                </Fragment>
            )}
        </Suspense>
    </BrowserRouter>
);

Routes.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Routes;
