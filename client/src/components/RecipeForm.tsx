import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../assets/styles';
import { TextField } from 'formik-material-ui';
import {
    Formik,
    Form,
    Field,
    FormikValues,
    FormikProps,
    FormikHelpers,
} from 'formik';

interface RecipeFormProps {
    onSubmit: Function;
    onCancel: Function;
    initialValues?: object;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
    onSubmit,
    onCancel,
    initialValues,
}): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleSubmit = (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>,
    ): void => {
        onSubmit(values);
        actions.setSubmitting(false);
    };

    const handleCancel = (): void => {
        onCancel();
    };

    return (
        <Formik
            initialValues={initialValues as FormikValues}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }: FormikProps<FormikValues>): JSX.Element => (
                <Form>
                    <Grid container direction="column">
                        <Field
                            component={TextField}
                            name="name"
                            label={t('recipes:properties.name')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Field
                            component={TextField}
                            name="description"
                            label={t('recipes:properties.description')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Field
                            component={TextField}
                            name="resources"
                            label={t('recipes:properties.resources')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Field
                            component={TextField}
                            name="preparationTime"
                            type="number"
                            label={t('recipes:properties.preparationTime')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Grid container wrap="nowrap">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                                className={classes.mr3}
                            >
                                {t('common:submit')}
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleCancel}
                            >
                                {t('common:cancel')}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

RecipeForm.defaultProps = {
    initialValues: {},
};

RecipeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({}),
};

export default RecipeForm;
