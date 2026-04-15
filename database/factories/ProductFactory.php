<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Smartphone Pro', 'Laptop Ultra', 'Tablette HD', 'Montre Connectée',
                'Aspirateur Robot', 'Machine à Café', 'Réfrigérateur Smart', 'Four Électrique',
                'Perceuse Sans Fil', 'Scie Circulaire', 'Tondeuse Honda', 'Panneau Solaire',
            ]).' '.fake()->numberBetween(1, 100),
            'slug' => fake()->unique()->uuid(),
            'description' => fake()->paragraph(),
            'features' => json_encode(fake()->randomElements([
                'Wifi intégré', 'Bluetooth 5.0', 'Écran OLED', 'Batterie longue durée',
                'Garantie 2 ans', 'Made in France', 'Éco-responsable', 'Compact',
            ], fake()->numberBetween(2, 4))),
            'specifications' => json_encode([
                'poids' => fake()->randomFloat(1, 0.5, 10).' kg',
                'dimensions' => fake()->randomFloat(0, 10, 50).' x '.fake()->randomFloat(0, 10, 50).' cm',
                'couleur' => fake()->randomElement(['Noir', 'Blanc', 'Gris', 'Bleu', 'Rouge']),
            ]),
            'images' => [
                'https://picsum.photos/800/600?random='.fake()->numberBetween(1, 1000),
                'https://picsum.photos/800/600?random='.fake()->numberBetween(1, 1000),
            ],
            'usage' => fake()->sentence(),
            'badge' => fake()->randomElement(['Nouveau', 'Promo', 'Best-seller', null]),
            'category_id' => null,
        ];
    }
}
