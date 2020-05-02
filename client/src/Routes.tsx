import React, { Suspense, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import LogInPage from './pages/LogInPage';
import MealPlannerPage from './pages/MealPlannerPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import RecipesPage from './pages/RecipesPage';
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import AppBar from './components/AppBar';
import { User } from './models/user.model';
import * as routes from './constants/routes';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

interface RoutesProps {
    user: User | {};
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
                        component={MealPlannerPage}
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
                    <Route
                        path={routes.RECIPES_PAGE}
                        exact
                        component={RecipesPage}
                    />
                    <Route
                        path={routes.ADD_RECIPE}
                        exact
                        component={AddRecipePage}
                    />
                    <Route
                        path={routes.EDIT_RECIPE}
                        exact
                        component={EditRecipePage}
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
