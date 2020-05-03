import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '../assets/styles';
import { useTranslation } from 'react-i18next';
import Recipe from '../models/recipe.model';
import { TextField } from 'formik-material-ui';
import {
    Formik,
    Form,
    Field,
    FormikValues,
    FormikProps,
    FormikHelpers,
} from 'formik';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Product from '../models/product.model';

interface AddIngredientsToRecipeProps {
    recipe: Recipe;
    products: Product[];
    onSubmit: Function;
}

const AddIngredientsToRecipe: React.FC<AddIngredientsToRecipeProps> = ({
    recipe,
    products,
    onSubmit,
}): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleSubmit = (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>,
    ): void => {
        onSubmit({ ...values, recipeId: recipe.id });
        actions.setSubmitting(false);
    };

    return (
        <Formik initialValues={{}} onSubmit={handleSubmit}>
            {({ isSubmitting }: FormikProps<FormikValues>): JSX.Element => (
                <Form>
                    <Grid container direction="column">
                        <Field
                            component={TextField}
                            name="productId"
                            label={t('common:product')}
                            variant="outlined"
                            className={classes.mb3}
                            select
                        >
                            {products.map(
                                (product: Product): JSX.Element => (
                                    <MenuItem
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {`${product.name} (${
                                            product.unitQuantity
                                        } ${t(
                                            `products:unitScales.${product.unitScale}`,
                                        )})`}
                                    </MenuItem>
                                ),
                            )}
                        </Field>
                        <Field
                            component={TextField}
                            name="quantity"
                            type="number"
                            label={t('ingredients:properties.quantity')}
                            variant="outlined"
                            className={classes.mb3}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {t('common:submit')}
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

AddIngredientsToRecipe.defaultProps = {
    products: [],
};

AddIngredientsToRecipe.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
    }).isRequired,
    products: PropTypes.array.isRequired,
};

export default AddIngredientsToRecipe;
