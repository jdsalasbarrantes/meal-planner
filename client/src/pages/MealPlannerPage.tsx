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
    const [loading, setLoading] = useState(true);
    const [productsSummary, setProductsSummary] = useState(
        [] as ProductSummary[],
    );
    //TODO: Return summary in the get meal planner by user
    useEffect((): void => {
        (async (): Promise<void> => {
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                const storedRecipes = await recipesService.getAllRecipes();
                if (!_isEmpty(storedRecipes)) {
                    const storedMealPlanner = await mealPlannerService.getMealPlannerByUser(
                        currentUser.id,
                    );
                    if (storedMealPlanner) {
                        const storedProductsSummary = await mealPlannerService.getProductsSummary(
                            currentUser.id,
                        );
                        if (storedProductsSummary) {
                            setProductsSummary(storedProductsSummary);
                        }
                        setScheduledMeals(storedMealPlanner.scheduledMeals);
                        setRecipes(storedRecipes);
                    }
                }
                setLoading(false);
            }
        })();
    }, []);

    const handleMealChange = async (
        recipeId: number,
        day: string,
        position: number,
    ): Promise<void> => {
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
        <PageContainer lgSize={11}>
            <Typography variant="h4" className={classes.mb5}>
                {t('common:planner')}
            </Typography>
            {loading && (
                <Grid container justify="center">
                    <Typography>{t('common:loading')}</Typography>
                </Grid>
            )}
            {!loading && _isEmpty(recipes) && (
                <Grid container justify="center">
                    <Typography>{t('mealPlanner:emptyData')}</Typography>
                </Grid>
            )}
            {!_isEmpty(recipes) && (
                <Grid container>
                    <Grid container>
                        <MealPlannerTable
                            scheduledMeals={scheduledMeals}
                            recipes={recipes}
                            onMealChange={handleMealChange}
                        />
                    </Grid>
                    <Grid container className={classes.mt9}>
                        <Typography variant="h4" className={classes.mb5}>
                            {t('common:summary')}
                        </Typography>
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
