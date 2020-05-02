import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
    Formik,
    Form,
    Field,
    FormikHelpers,
    FormikValues,
    FormikProps,
} from 'formik';
import { TextField } from 'formik-material-ui';
import { useStyles } from '../assets/styles';

interface CredentialsFormProps {
    onSubmit: Function;
    submitButtonLabel: string;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
    onSubmit,
    submitButtonLabel,
}): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();
    const handleSubmit = (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>,
    ): void => {
        if (!_isEmpty(values.username) && !_isEmpty(values.password)) {
            onSubmit(values);
        }
        actions.setSubmitting(false);
    };
    const initialValues: FormikValues = {
        username: '',
        password: '',
    };
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }: FormikProps<FormikValues>): JSX.Element => (
                <Form>
                    <Grid container direction="column">
                        <Field
                            component={TextField}
                            name="username"
                            label={t('common:username')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Field
                            component={TextField}
                            name="password"
                            type="password"
                            label={t('common:password')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Grid container wrap="nowrap">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {submitButtonLabel}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

CredentialsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default CredentialsForm;
