import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientRepository } from '../repositories/ingredient.repository';
import { CreateIngredientDto } from '../dtos/create-ingredient.dto';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class IngredientsService {
    constructor(
        @InjectRepository(IngredientRepository)
        private ingredientRepository: IngredientRepository,
    ) {}

    async createIngredient(
        createIngredientDto: CreateIngredientDto,
    ): Promise<Ingredient> {
        return this.ingredientRepository.createIngredient(createIngredientDto);
    }

    async getIngredientById(id: number): Promise<Ingredient> {
        const found = await this.ingredientRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Ingredient with id ${id} not found`);
        }
        return found;
    }

    async updateIngredientQuantity(
        id: number,
        quantity: number,
    ): Promise<Ingredient> {
        const ingredient = await this.getIngredientById(id);
        ingredient.quantity = quantity;
        await ingredient.save();
        return ingredient;
    }

    async deleteIngredient(id: number): Promise<void> {
        const { affected } = await this.ingredientRepository.delete(id);
        if (affected === 0) {
            throw new NotFoundException(`Ingredient with id ${id} not found`);
        }
    }
}
