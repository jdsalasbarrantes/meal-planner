import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Recipe from '../models/recipe.model';
import { EDIT_RECIPE } from '../constants/routes';

interface RecipesTableProps {
    recipes: Recipe[];
}

const RecipesTable: React.FC<RecipesTableProps> = ({
    recipes,
}): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    return recipes.length === 0 ? (
        <Typography>{t('recipes:emptyRecipes')}</Typography>
    ) : (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('recipes:properties.name')}</TableCell>
                        <TableCell align="right">
                            {t('recipes:properties.preparationTime')}
                        </TableCell>
                        <TableCell align="right">
                            {t('recipes:properties.cost')}
                        </TableCell>
                        <TableCell align="right">
                            {t('common:actions')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recipes.map(
                        (recipe: Recipe): JSX.Element => (
                            <TableRow key={recipe.id}>
                                <TableCell component="th" scope="row">
                                    {recipe.name}
                                </TableCell>
                                <TableCell align="right">
                                    {recipe.preparationTime}
                                </TableCell>
                                <TableCell align="right">
                                    {recipe.cost}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={(): void =>
                                            history.push(
                                                `${EDIT_RECIPE}?id=${recipe.id}`,
                                            )
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

RecipesTable.defaultProps = {
    recipes: [],
};

RecipesTable.propTypes = {
    recipes: PropTypes.array.isRequired,
};

export default RecipesTable;
