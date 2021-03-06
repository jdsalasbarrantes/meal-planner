import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import productsService from '../services/products.service';
import ProductsTable from '../components/ProductsTable';
import PageContainer from '../components/PageContainer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../assets/styles';
import { useSnackbar } from '../contexts/SnackbarContext';
import { ADD_PRODUCT } from '../constants/routes';
import _filter from 'lodash/filter';

const ProductsPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    const classes = useStyles();
    const snackbar = useSnackbar();

    const [products, setProducts] = useState();
    useEffect((): void => {
        (async (): Promise<void> => {
            const data = await productsService.getAllProducts();
            setProducts(data);
        })();
    }, []);

    const handleAddProduct = (): void => {
        history.push(ADD_PRODUCT);
    };

    const handleDelete = async (productId: number): Promise<void> => {
        const deleted = await productsService.deleteProduct(productId);
        if (deleted) {
            snackbar.showMessage(
                t('products:notifications.productDeleted'),
                'success',
            );
            setProducts(_filter(products, (p) => p.id !== productId));
        } else {
            snackbar.showMessage(t('common:notifications.error'), 'error');
        }
    };

    return (
        <PageContainer>
            <Grid container>
                <Typography variant="h4" className={classes.ml1}>
                    {t('common:products')}
                </Typography>
            </Grid>
            <Grid container justify="flex-end" className={classes.mb5}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProduct}
                >
                    {t('products:addProduct')}
                </Button>
            </Grid>
            <ProductsTable products={products} onDelete={handleDelete} />
        </PageContainer>
    );
};

ProductsPage.propTypes = {};

export default ProductsPage;
