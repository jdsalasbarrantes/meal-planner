import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecipesService } from '../services/recipes.service';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../entities/recipe.entity';

@Controller('recipes')
@UseGuards(AuthGuard())
export class RecipesController {
    constructor(private recipesService: RecipesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createRecipe(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipesService.createRecipe(createRecipeDto);
    }

    @Get('/:id')
    getRecipeById(@Param('id', ParseIntPipe) id: number): Promise<Recipe> {
        return this.recipesService.getRecipeById(id);
    }

    @Delete('/:id')
    deleteRecipe(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.recipesService.deleteRecipe(id);
    }
}