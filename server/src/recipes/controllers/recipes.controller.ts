import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecipesService } from '../services/recipes.service';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { UpdateRecipeDto } from "../dtos/update-recipe.dto";
import { CreateIngredientDto } from "../dtos/create-ingredient.dto";

@Controller('recipes')
@UseGuards(AuthGuard())
export class RecipesController {
    constructor(private recipesService: RecipesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createRecipe(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipesService.createRecipe(createRecipeDto);
    }

    @Get('/')
    getAllRecipes(): Promise<Recipe[]> {
        return this.recipesService.getAllRecipes();
    }

    @Get('/:id')
    getRecipeById(@Param('id', ParseIntPipe) id: number): Promise<Recipe> {
        return this.recipesService.getRecipeById(id);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    updateRecipe(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRecipeDto: UpdateRecipeDto
    ): Promise<Recipe> {
        return this.recipesService.updateRecipe(id, updateRecipeDto);
    }

    @Delete('/:id')
    deleteRecipe(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.recipesService.deleteRecipe(id);
    }

    @Post('/:recipeId/ingredients')
    @UsePipes(ValidationPipe)
    createIngredient(
        @Param('recipeId', ParseIntPipe) recipeId: number,
        @Body() createIngredientDto: CreateIngredientDto,
    ): Promise<Recipe> {
        return this.recipesService.createIngredient(recipeId, createIngredientDto);
    }

    @Delete('/:recipeId/ingredients/:id')
    deleteIngredient(
        @Param('recipeId', ParseIntPipe) recipeId: number,
        @Param('id', ParseIntPipe) id: number
    ): Promise<Recipe> {
        return this.recipesService.deleteIngredient(recipeId, id);
    }
}
