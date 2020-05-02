import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import productsService from '../services/products.service';
import ProductsTable from '../components/ProductsTable';
import PageContainer from '../components/PageContainer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../assets/styles';
import { ADD_PRODUCT } from '../constants/routes';

const ProductsPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    const classes = useStyles();
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

    return (
        <PageContainer>
            <Grid container justify="flex-end" className={classes.mb5}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProduct}
                >
                    {t('products:addProduct')}
                </Button>
            </Grid>
            <ProductsTable products={products} />
        </PageContainer>
    );
};

ProductsPage.propTypes = {};

export default ProductsPage;
