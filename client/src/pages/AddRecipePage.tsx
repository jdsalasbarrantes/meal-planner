import React from 'react';
import { useHistory } from 'react-router-dom';
import recipesService from '../services/recipes.service';
import PageContainer from '../components/PageContainer';
import RecipeForm from '../components/RecipeForm';
import { useTranslation } from 'react-i18next';
import { RECIPES_PAGE, EDIT_RECIPE } from '../constants/routes';
import { useSnackbar } from '../contexts/SnackbarContext';
import Recipe from '../models/recipe.model';

const AddRecipePage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    const snackbar = useSnackbar();

    const redirectToRecipes = (): void => {
        history.push(RECIPES_PAGE);
    };

    const redirectToEdit = (id: number): void => {
        history.push(`${EDIT_RECIPE}?id=${id}`);
    };

    const handleSubmit = async (recipe: Recipe): Promise<void> => {
        const storedRecipe = await recipesService.addRecipe(recipe);
        if (storedRecipe) {
            snackbar.showMessage(
                t('recipes:notifications.recipeAdded'),
                'success',
            );
            redirectToEdit(storedRecipe.id);
        } else {
            snackbar.showMessage(t('common:notifications.error'), 'error');
        }
    };

    return (
        <PageContainer lgSize={5}>
            <RecipeForm onSubmit={handleSubmit} onCancel={redirectToRecipes} />
        </PageContainer>
    );
};

AddRecipePage.propTypes = {};

export default AddRecipePage;
