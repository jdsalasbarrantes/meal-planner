import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import _find from 'lodash/find';
import { useTranslation } from 'react-i18next';
import Recipe from '../models/recipe.model';
import ScheduledMeal from '../models/scheduled-meal.model';

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
    return (
        <TableContainer component={Paper}>
            <Table size="medium" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {days.map(
                            (day: string): JSX.Element => (
                                <TableCell key={day}>
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
                                {days.map(
                                    (day): JSX.Element => {
                                        const meal = _find(
                                            scheduledMeals,
                                            (meal) =>
                                                meal.position === position &&
                                                meal.day === day,
                                        );
                                        return (
                                            <TableCell key={day}>
                                                <FormControl fullWidth>
                                                    <NativeSelect
                                                        value={
                                                            meal
                                                                ? meal.recipeId
                                                                : ''
                                                        }
                                                    >
                                                        <option value="" />
                                                        {recipes.map(
                                                            (
                                                                recipe: Recipe,
                                                            ): JSX.Element => (
                                                                <option
                                                                    key={
                                                                        recipe.id
                                                                    }
                                                                    value={
                                                                        recipe.id
                                                                    }
                                                                    onClick={onMealChange(
                                                                        recipe.id,
                                                                        day,
                                                                        position,
                                                                    )}
                                                                >
                                                                    {
                                                                        recipe.name
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </NativeSelect>
                                                </FormControl>
                                            </TableCell>
                                        );
                                    },
                                )}
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
