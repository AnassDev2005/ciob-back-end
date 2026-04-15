<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();

        Recipe::factory()->count(20)->create([
            'product_id' => fn () => $products->random()->id,
        ]);
    }
}
