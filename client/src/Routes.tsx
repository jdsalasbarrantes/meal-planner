import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import LogInPage from './pages/LogInPage';
import DashboardPage from './pages/DashboardPage';
import { User } from './models/user.model';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

interface RoutesProps {
    user: User;
}

const Routes: React.FC<RoutesProps> = ({ user }): JSX.Element => (
    <BrowserRouter>
        <Suspense fallback={<span />}>
            {_isEmpty(user) ? (
                <Route path="/" component={LogInPage} />
            ) : (
                <Route path="/" component={DashboardPage} />
            )}
        </Suspense>
    </BrowserRouter>
);

Routes.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Routes;
