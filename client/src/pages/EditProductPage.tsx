import React, { useEffect, useState } from 'react';
import productsService from '../services/products.service';
import Product from '../models/product.model';
import PageContainer from '../components/PageContainer';
import ProductForm from '../components/ProductForm';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarContext';
import { PRODUCTS_PAGE } from '../constants/routes';
import _isEmpty from 'lodash/isEmpty';

const EditProductPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const snackbar = useSnackbar();

    const [product, setProduct] = useState();

    useEffect((): void => {
        (async (): Promise<void> => {
            const id: number = parseInt(location.search.split('=')[1]);
            const product = await productsService.getProductById(id);
            if (product) {
                setProduct(product);
            }
        })();
    }, [location.search]);

    const redirectToProducts = (): void => {
        history.push(PRODUCTS_PAGE);
    };

    const handleSubmit = async (product: Product): Promise<void> => {
        const added = await productsService.updateProduct(product);
        if (added) {
            snackbar.showMessage(
                t('products:notifications.productUpdated'),
                'success',
            );
            redirectToProducts();
        } else {
            snackbar.showMessage(t('common:notifications.error'), 'error');
        }
    };

    return (
        <PageContainer lgSize={5}>
            {!_isEmpty(product) && (
                <ProductForm
                    onSubmit={handleSubmit}
                    onCancel={redirectToProducts}
                    initialValues={product}
                />
            )}
        </PageContainer>
    );
};

EditProductPage.propTypes = {};

export default EditProductPage;
