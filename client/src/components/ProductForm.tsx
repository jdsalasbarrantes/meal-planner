import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../assets/styles';
import { TextField } from 'formik-material-ui';
import { unitScaleTypes } from '../models/product.model';
import {
    Formik,
    Form,
    Field,
    FormikValues,
    FormikProps,
    FormikHelpers,
} from 'formik';

interface ProductFormProps {
    onSubmit: Function;
    onCancel: Function;
    initialValues?: object;
}

const ProductForm: React.FC<ProductFormProps> = ({
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
                            label={t('products:properties.name')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Field
                            component={TextField}
                            name="unitScale"
                            label={t('products:properties.unitScale')}
                            variant="outlined"
                            className={classes.mb3}
                            select
                        >
                            {unitScaleTypes.map(
                                (unitScaleType): JSX.Element => (
                                    <MenuItem
                                        key={unitScaleType.value}
                                        value={unitScaleType.value}
                                    >
                                        {t(unitScaleType.i18n)}
                                    </MenuItem>
                                ),
                            )}
                        </Field>
                        <Field
                            component={TextField}
                            name="unitQuantity"
                            type="number"
                            label={t('products:properties.unitQuantity')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Field
                            component={TextField}
                            name="price"
                            type="number"
                            label={t('products:properties.price')}
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

ProductForm.defaultProps = {
    initialValues: {},
};

ProductForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({}),
};

export default ProductForm;
