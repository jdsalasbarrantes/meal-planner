import React from 'react';
import { useHistory } from 'react-router-dom';
import productsService from '../services/products.service';
import Product from '../models/product.model';
import PageContainer from '../components/PageContainer';
import ProductForm from '../components/ProductForm';
import { useTranslation } from 'react-i18next';
import { PRODUCTS_PAGE } from '../constants/routes';
import { useSnackbar } from '../contexts/SnackbarContext';

const AddProductPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    const snackbar = useSnackbar();

    const redirectToProducts = (): void => {
        history.push(PRODUCTS_PAGE);
    };

    const handleSubmit = async (product: Product): Promise<void> => {
        const added = await productsService.addProduct(product);
        if (added) {
            snackbar.showMessage(
                t('products:notifications.productAdded'),
                'success',
            );
            redirectToProducts();
        } else {
            snackbar.showMessage(t('common:notifications.error'), 'error');
        }
    };

    return (
        <PageContainer lgSize={5}>
            <ProductForm
                onSubmit={handleSubmit}
                onCancel={redirectToProducts}
            />
        </PageContainer>
    );
};

AddProductPage.propTypes = {};

export default AddProductPage;
