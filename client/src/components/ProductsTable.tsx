import React from 'react';
import PropTypes from 'prop-types';
import Product from '../models/product.model';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

interface ProductsTableProps {
    products: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({
    products,
}): JSX.Element => {
    const { t } = useTranslation();
    return products.length === 0 ? (
        <Typography>{t('products:emptyProducts')}</Typography>
    ) : (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('products:properties.name')}</TableCell>
                        <TableCell>
                            {t('products:properties.quantity')}
                        </TableCell>
                        <TableCell>{t('products:properties.price')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product: Product) => (
                        <TableRow key={product.id}>
                            <TableCell component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell>
                                {`${product.unitQuantity} ${t(
                                    `products:unitScales.${product.unitScale}`,
                                )}`}
                            </TableCell>
                            <TableCell>
                                {t('common:currencyFormat', {
                                    amount: product.price,
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ProductsTable.defaultProps = {
    products: [],
};

ProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductsTable;
