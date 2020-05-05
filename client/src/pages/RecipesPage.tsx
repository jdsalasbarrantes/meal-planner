import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import recipesService from '../services/recipes.service';
import PageContainer from '../components/PageContainer';
import RecipesTable from '../components/RecipesTable';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../assets/styles';
import { ADD_RECIPE } from '../constants/routes';

const RecipesPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();
    const classes = useStyles();
    const [recipes, setRecipes] = useState();
    useEffect((): void => {
        (async (): Promise<void> => {
            const data = await recipesService.getAllRecipes();
            setRecipes(data);
        })();
    }, []);

    const handleAddRecipe = (): void => {
        history.push(ADD_RECIPE);
    };

    return (
        <PageContainer>
            <Grid container>
                <Typography variant="h4">{t('common:recipes')}</Typography>
            </Grid>
            <Grid container justify="flex-end" className={classes.mb5}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRecipe}
                >
                    {t('recipes:addRecipe')}
                </Button>
            </Grid>
            <RecipesTable recipes={recipes} />
        </PageContainer>
    );
};

RecipesPage.propTypes = {};

export default RecipesPage;
