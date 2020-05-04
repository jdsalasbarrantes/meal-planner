import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import mealPlannerService from '../services/meal-planner.service';
import recipesService from '../services/recipes.service';
import authService from '../services/auth.service';
import _isEmpty from 'lodash/isEmpty';
import Recipe from '../models/recipe.model';
import ScheduledMeal from '../models/scheduled-meal.model';
import MealPlannerTable from '../components/MealPlannerTable';
import ProductsSummaryTable from '../components/ProductsSummaryTable';
import PageContainer from '../components/PageContainer';
import Grid from '@material-ui/core/Grid';
import { ProductSummary } from '../models/product-summary.model';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../assets/styles';

const MealPlannerPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [scheduledMeals, setScheduledMeals] = useState([] as ScheduledMeal[]);
    const [recipes, setRecipes] = useState([] as Recipe[]);
    const [productsSummary, setProductsSummary] = useState(
        [] as ProductSummary[],
    );
    //TODO: Return summary in the get meal planner by user
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
                    const storedProductsSummary = await mealPlannerService.getProductsSummary(
                        currentUser.id,
                    );
                    if (storedProductsSummary) {
                        setProductsSummary(storedProductsSummary);
                    }
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
                const storedProductsSummary = await mealPlannerService.getProductsSummary(
                    currentUser.id,
                );
                if (storedProductsSummary) {
                    setProductsSummary(storedProductsSummary);
                }
            }
        }
    };
    return (
        <PageContainer>
            {_isEmpty(scheduledMeals) ? (
                <Typography>{t('common:loading')}</Typography>
            ) : (
                <Grid container>
                    <Grid container>
                        <MealPlannerTable
                            scheduledMeals={scheduledMeals}
                            recipes={recipes}
                            onMealChange={handleMealChange}
                        />
                    </Grid>
                    <Grid container className={classes.mt9}>
                        <ProductsSummaryTable
                            productsSummary={productsSummary}
                        />
                    </Grid>
                </Grid>
            )}
        </PageContainer>
    );
};

MealPlannerPage.propTypes = {};

export default MealPlannerPage;
