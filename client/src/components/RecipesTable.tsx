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
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Recipe from '../models/recipe.model';
import { EDIT_RECIPE } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../assets/styles';

interface RecipesTableProps {
    recipes: Recipe[];
    onDelete: Function;
}

const RecipesTable: React.FC<RecipesTableProps> = ({
    recipes,
    onDelete,
}): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    return recipes.length === 0 ? (
        <Typography>{t('recipes:emptyRecipes')}</Typography>
    ) : (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('recipes:properties.name')}</TableCell>
                        <TableCell>
                            {t('recipes:properties.preparationTime')}
                        </TableCell>
                        <TableCell>{t('recipes:properties.cost')}</TableCell>
                        <TableCell>{t('common:actions')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recipes.map(
                        (recipe: Recipe): JSX.Element => (
                            <TableRow key={recipe.id}>
                                <TableCell component="th" scope="row">
                                    {recipe.name}
                                </TableCell>
                                <TableCell>{recipe.preparationTime}</TableCell>
                                <TableCell>
                                    {t('common:currencyFormat', {
                                        amount: recipe.cost,
                                    })}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        className={classes.p1}
                                        onClick={(): void =>
                                            history.push(
                                                `${EDIT_RECIPE}?id=${recipe.id}`,
                                            )
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        className={`${classes.p1} ${classes.ml2}`}
                                        onClick={(): void =>
                                            onDelete(recipe.id)
                                        }
                                    >
                                        <DeleteIcon />
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
    onDelete: PropTypes.func.isRequired,
};

export default RecipesTable;
