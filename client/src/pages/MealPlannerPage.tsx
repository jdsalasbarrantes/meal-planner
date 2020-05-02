import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import PageContainer from '../components/PageContainer';
import mealPlannerService from '../services/meal-planner.service';
import recipesService from '../services/recipes.service';
import authService from '../services/auth.service';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import { useTranslation } from 'react-i18next';
import Recipe from '../models/recipe.model';
import ScheduledMeal from '../models/scheduled-meal.model';

const MealPlannerPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
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
    const [scheduledMeals, setScheduledMeals] = useState([] as ScheduledMeal[]);
    const [recipes, setRecipes] = useState([] as Recipe[]);
    useEffect((): void => {
        (async (): Promise<void> => {
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                const storedMealPlanner = await mealPlannerService.getMealPlannerByUser(
                    currentUser.id,
                );
                if (storedMealPlanner) {
                    const storedRecipes = await recipesService.getAllRecipes();
                    setScheduledMeals(storedMealPlanner.scheduledMeals);
                    setRecipes(storedRecipes);
                }
            }
        })();
    }, []);

    const handleMealChange = (
        recipeId: number | undefined,
        day: string,
        position: number,
    ) => async (): Promise<void> => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            const updatedMealPlanner = await mealPlannerService.updateMealPlanner(
                currentUser.id,
                { day, position, recipeId },
            );

            if (updatedMealPlanner) {
                setScheduledMeals(updatedMealPlanner.scheduledMeals);
            }
        }
    };
    return (
        <PageContainer>
            {_isEmpty(scheduledMeals) ? (
                <Typography>{t('common:loading')}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table size="medium" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {days.map(
                                    (day: string): JSX.Element => (
                                        <TableCell key={day}>{day}</TableCell>
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
                                                        meal.position ===
                                                            position &&
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
                                                                            onClick={handleMealChange(
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
            )}
        </PageContainer>
    );
};

MealPlannerPage.propTypes = {};

export default MealPlannerPage;
