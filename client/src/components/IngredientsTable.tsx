import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Ingredient from '../models/ingredient.model';
import Product from '../models/product.model';
import _findIndex from 'lodash/findIndex';

interface IngredientsTableProps {
    ingredients: Ingredient[];
    products: Product[];
    onDeleteIngredient: Function;
    recipeCost: number;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({
    ingredients,
    products,
    recipeCost,
    onDeleteIngredient,
}): JSX.Element => {
    const { t } = useTranslation();

    const getProduct = (productId: number): Product => {
        const index = _findIndex(
            products,
            (product: Product) => product.id === productId,
        );
        return products[index];
    };

    return ingredients.length === 0 ? (
        <Typography>{t('ingredients:emptyIngredients')}</Typography>
    ) : (
        <Fragment>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {t('products:properties.name')}
                            </TableCell>
                            <TableCell>
                                {t('ingredients:properties.quantity')}
                            </TableCell>
                            <TableCell>{t('common:actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingredients.map(
                            (ingredient: Ingredient): JSX.Element => {
                                const product = getProduct(
                                    ingredient.productId,
                                );
                                return (
                                    <TableRow key={ingredient.id}>
                                        <TableCell component="th" scope="row">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            {`${ingredient.quantity} ${t(
                                                `products:unitScales.${product.unitScale}`,
                                            )}`}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={(): void =>
                                                    onDeleteIngredient(
                                                        ingredient,
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            },
                        )}
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography>
                                    {`${t(
                                        'recipes:properties.cost',
                                    )}:  ${recipeCost}`}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
};

IngredientsTable.defaultProps = {
    ingredients: [],
    products: [],
    recipeCost: 0,
};

IngredientsTable.propTypes = {
    onDeleteIngredient: PropTypes.func.isRequired,
    ingredients: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    recipeCost: PropTypes.number.isRequired,
};

export default IngredientsTable;
