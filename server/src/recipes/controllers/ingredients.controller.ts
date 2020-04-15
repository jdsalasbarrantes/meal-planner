import {
    Body,
    Controller,
    Delete,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IngredientsService } from '../services/ingredients.service';
import { CreateIngredientDto } from '../dtos/create-ingredient.dto';
import { Ingredient } from '../entities/ingredient.entity';

@Controller('ingredients')
@UseGuards(AuthGuard())
export class IngredientsController {
    constructor(private ingredientsService: IngredientsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createIngredient(
        @Body() createIngredientDto: CreateIngredientDto,
    ): Promise<Ingredient> {
        return this.ingredientsService.createIngredient(createIngredientDto);
    }

    @Patch('/:id/quantity')
    updateIngredientQuantity(
        @Param('id', ParseIntPipe) id: number,
        @Body('quantity', ParseIntPipe) quantity: number,
    ): Promise<Ingredient> {
        return this.ingredientsService.updateIngredientQuantity(id, quantity);
    }

    @Delete('/:id')
    deleteIngredient(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.ingredientsService.deleteIngredient(id);
    }
}
