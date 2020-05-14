import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Recipe from '../models/recipe.model';
import ScheduledMeal from '../models/scheduled-meal.model';
import _find from 'lodash/find';
import _map from 'lodash/map';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../assets/styles';

interface MealPlannerTableProps {
    recipes: Recipe[];
    scheduledMeals: ScheduledMeal[];
    onMealChange: Function;
}

const MealPlannerTable: React.FC<MealPlannerTableProps> = ({
    recipes,
    scheduledMeals,
    onMealChange,
}): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();

    //TODO: Fix these arrays
    const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ];
    const positions = [0, 1, 2, 3, 4];
    const recipeIds = _map(recipes, 'id') as number[];

    const handleChange = (day: string, position: number) => (
        event: React.ChangeEvent<{}>,
        recipeIds: number[],
    ): void => {
        onMealChange(recipeIds, day, position);
    };

    const getRecipeName = (recipeId: number): string => {
        const recipe = _find(recipes, (r) => r.id === recipeId);
        return recipe ? recipe.name : '';
    };

    return (
        <TableContainer component={Paper}>
            <Table size="medium" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {days.map(
                            (day: string): JSX.Element => (
                                <TableCell key={day} align="center">
                                    {t(`common:days.${day}`)}
                                </TableCell>
                            ),
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {positions.map(
                        (position: number): JSX.Element => (
                            <TableRow key={position}>
                                {days.map((day): JSX.Element | null => {
                                    const meal = _find(
                                        scheduledMeals,
                                        (meal) =>
                                            meal.position === position &&
                                            meal.day === day,
                                    );

                                    return meal ? (
                                        <TableCell
                                            key={day}
                                            className={classes.maxWidth200}
                                        >
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    multiple
                                                    id="tags-outlined"
                                                    options={recipeIds}
                                                    getOptionLabel={(
                                                        recipeId: number,
                                                    ): string =>
                                                        getRecipeName(recipeId)
                                                    }
                                                    defaultValue={
                                                        meal.recipeIds
                                                    }
                                                    filterSelectedOptions
                                                    disableClearable
                                                    renderInput={(
                                                        params,
                                                    ): JSX.Element => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label={t(
                                                                'common:recipes',
                                                            )}
                                                        />
                                                    )}
                                                    onChange={handleChange(
                                                        day,
                                                        position,
                                                    )}
                                                />
                                            </FormControl>
                                        </TableCell>
                                    ) : null;
                                })}
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

MealPlannerTable.defaultProps = {
    recipes: [],
    scheduledMeals: [],
};

MealPlannerTable.propTypes = {
    recipes: PropTypes.array.isRequired,
    scheduledMeals: PropTypes.array.isRequired,
    onMealChange: PropTypes.func.isRequired,
};

export default MealPlannerTable;
