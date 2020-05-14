import { EntityRepository, Repository } from 'typeorm';
import { MealPlanner } from "../entities/meal-planner.entity";
import { ProductSummaryDto } from "../dtos/product-summary.dto";
import { ScheduledMeal } from "../entities/scheduled-meal.entity";
import { Recipe } from "src/recipes/entities/recipe.entity";
import { Ingredient } from "../../recipes/entities/ingredient.entity";
import { Product } from "../../recipes/entities/product.entity";

@EntityRepository(MealPlanner)
export class MealPlannerRepository extends Repository<MealPlanner> {

    async getProductsSummary(userId: number): Promise<ProductSummaryDto[]> {
        return await this.createQueryBuilder("mealPlanner")
            .select(
                "products.name as name," +
                "CEILING(SUM(ingredients.quantity) / CAST(products.unitQuantity AS DECIMAL)) as units," +
                "(CEILING(SUM(ingredients.quantity) / CAST(products.unitQuantity AS DECIMAL)) - (SUM(ingredients.quantity) / CAST(products.unitQuantity AS DECIMAL))) * 100 as surplus," +
                "(CEILING(SUM(ingredients.quantity) / CAST(products.unitQuantity AS DECIMAL)) * products.price) as cost"
            )
            .innerJoin('mealPlanner.scheduledMeals', 'scheduledMeals')
            .innerJoin('scheduledMeals.recipes', 'recipes')
            .innerJoin('recipes.ingredients', 'ingredients')
            .innerJoin('ingredients.product', 'products')
            .where("mealPlanner.userId = :userId", { userId })
            .groupBy("products.id")
            .getRawMany<ProductSummaryDto>();
    }
}
