import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStyles } from '../assets/styles';
import recipesService from '../services/recipes.service';
import productsService from '../services/products.service';
import ingredientsService from '../services/ingredients.service';
import PageContainer from '../components/PageContainer';
import RecipeForm from '../components/RecipeForm';
import AddIngredientsToRecipe from '../components/AddIngredientsToRecipe';
import IngredientsTable from '../components/IngredientsTable';
import { useTranslation } from 'react-i18next';
import { RECIPES_PAGE } from '../constants/routes';
import { useSnackbar } from '../contexts/SnackbarContext';
import Recipe from '../models/recipe.model';
import _isEmpty from 'lodash/isEmpty';
import TabPanel from '../components/TabPanel';
import Grid from '@material-ui/core/Grid';
import Ingredient from '../models/ingredient.model';

const EditRecipePage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    const snackbar = useSnackbar();
    const location = useLocation();
    const classes = useStyles();

    const [recipe, setRecipe] = useState();
    const [products, setProducts] = useState();
    const [tab, setTab] = useState(0);

    useEffect((): void => {
        (async (): Promise<void> => {
            const id: number = parseInt(location.search.split('=')[1]);
            const recipe = await recipesService.getRecipeById(id);
            if (recipe) {
                setRecipe(recipe);
                const products = await productsService.getAllProducts();
                setProducts(products);
            }
        })();
    }, [location.search]);

    const redirectToRecipes = (): void => {
        history.push(RECIPES_PAGE);
    };

    const handleEditRecipe = async (recipe: Recipe): Promise<void> => {
        const recipeUpdated = await recipesService.updateRecipe(recipe);
        if (recipeUpdated) {
            setRecipe(recipe);
            snackbar.showMessage(
                t('recipes:notifications.recipeUpdated'),
                'success',
            );
        } else {
            snackbar.showMessage(t('common:notifications.error'), 'error');
        }
    };

    const handleAddIngredients = async (
        ingredient: Ingredient,
    ): Promise<void> => {
        const recipe = await ingredientsService.addIngredient(ingredient);
        if (recipe) {
            setRecipe(recipe);
            snackbar.showMessage(
                t('recipes:notifications.ingredientAdded'),
                'success',
            );
        } else {
            snackbar.showMessage(t('common:notifications.error'), 'error');
        }
    };

    const handleDeleteIngredient = async (
        ingredient: Ingredient,
    ): Promise<void> => {
        const recipe = await ingredientsService.deleteIngredient(ingredient);
        if (recipe) {
            setRecipe(recipe);
            snackbar.showMessage(
                t('recipes:notifications.ingredientDeleted'),
                'success',
            );
        } else {
            snackbar.showMessage(t('common:notifications.error'), 'error');
        }
    };

    return (
        <PageContainer lgSize={5}>
            {!_isEmpty(recipe) && (
                <Grid container direction="row">
                    <Grid item xs={12} className={classes.mb7}>
                        <TabPanel
                            tabLabels={[
                                t('common:info'),
                                t('common:ingredients'),
                            ]}
                            currentTabIndex={tab}
                            setTabIndex={setTab}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {tab === 0 && (
                            <RecipeForm
                                onSubmit={handleEditRecipe}
                                onCancel={redirectToRecipes}
                                initialValues={recipe}
                            />
                        )}
                        {tab === 1 && recipe.id && (
                            <Grid container justify="space-between">
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className={classes.mb5}
                                >
                                    <IngredientsTable
                                        ingredients={recipe.ingredients}
                                        recipeCost={recipe.cost}
                                        products={products}
                                        onDeleteIngredient={
                                            handleDeleteIngredient
                                        }
                                    />
                                </Grid>
                                <Grid item xs={1} />
                                <Grid item xs={12} md={5}>
                                    <AddIngredientsToRecipe
                                        recipe={recipe}
                                        products={products}
                                        onSubmit={handleAddIngredients}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            )}
        </PageContainer>
    );
};

EditRecipePage.propTypes = {};

export default EditRecipePage;
