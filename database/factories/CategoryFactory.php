<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $names = ['Électronique', 'Maison', 'Jardin', 'Cuisine', 'Bricolage', 'Automobile', 'Sports', 'Loisirs'];

        return [
            'name' => fake()->unique()->randomElement($names),
            'slug' => fake()->unique()->uuid(),
        ];
    }
}
