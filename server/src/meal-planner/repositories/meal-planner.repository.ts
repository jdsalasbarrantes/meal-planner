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
        return this.createQueryBuilder("mealPlanner")
            .select(
                "product.name as name," +
                "CEILING(SUM(ingredient.quantity) / CAST(product.unitQuantity AS DECIMAL)) as units," +
                "(CEILING(SUM(ingredient.quantity) / CAST(product.unitQuantity AS DECIMAL)) - (SUM(ingredient.quantity) / CAST(product.unitQuantity AS DECIMAL))) * 100 as surplus," +
                "(CEILING(SUM(ingredient.quantity) / CAST(product.unitQuantity AS DECIMAL)) * product.price) as cost"
            )
            .innerJoin(ScheduledMeal, "scheduledMeal", "mealPlanner.id = scheduledMeal.mealPlannerId")
            .innerJoin(Recipe, "recipe", "scheduledMeal.recipeId = recipe.id")
            .innerJoin(Ingredient, "ingredient", "recipe.id = ingredient.recipeId")
            .innerJoin(Product, "product", "ingredient.productId = product.id")
            .where("mealPlanner.userId = :userId", { userId })
            .groupBy("product.id")
            .getRawMany<ProductSummaryDto>();
    }
}
