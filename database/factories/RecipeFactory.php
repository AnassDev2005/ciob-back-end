<?php

namespace Database\Factories;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->randomElement([
                'Gâteau au Chocolat', 'Pâtes Carbonara', 'Salade César', 'Soupe de Légumes',
                'Risotto aux Champignons', 'Poulet Rôti', 'Tarte aux Fruits', 'Quiche Lorraine',
                'Boeuf Bourguignon', 'Crème Brûlée', 'Omelette nature', 'Pizza Margherita',
            ]),
            'description' => fake()->paragraph(),
            'steps' => [
                fake()->sentence(),
                fake()->sentence(),
                fake()->sentence(),
                fake()->sentence(),
                fake()->sentence(),
            ],
            'image' => 'https://picsum.photos/800/600?random='.fake()->numberBetween(1, 1000),
            'product_id' => null,
            'preparation_time' => fake()->numberBetween(10, 60),
            'cooking_time' => fake()->numberBetween(15, 120),
        ];
    }
}
