import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import { ProductSummary } from '../models/product-summary.model';

interface ProductsSummaryTableProps {
    productsSummary: ProductSummary[];
}

const ProductsSummaryTable: React.FC<ProductsSummaryTableProps> = ({
    productsSummary,
}): JSX.Element => {
    const { t } = useTranslation();
    return (
        <TableContainer component={Paper}>
            <Table size="medium" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('mealPlanner:summary.name')}</TableCell>
                        <TableCell>{t('mealPlanner:summary.units')}</TableCell>
                        <TableCell>
                            {t('mealPlanner:summary.surplus')}
                        </TableCell>
                        <TableCell>{t('mealPlanner:summary.cost')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productsSummary.map(
                        (product: ProductSummary): JSX.Element => (
                            <TableRow key={product.name}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.units}</TableCell>
                                <TableCell>{`${Math.floor(
                                    product.surplus,
                                )}%`}</TableCell>
                                <TableCell>{product.cost}</TableCell>
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ProductsSummaryTable.defaultProps = {
    productsSummary: [],
};

ProductsSummaryTable.propTypes = {
    productsSummary: PropTypes.array.isRequired,
};

export default ProductsSummaryTable;
