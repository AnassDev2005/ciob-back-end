<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('image')->nullable()->after('password');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('diameter')->nullable()->after('badge');
            $table->json('characteristics')->nullable()->after('diameter');
        });

        Schema::table('recipes', function (Blueprint $table) {
            $table->json('ingredients')->nullable()->after('steps');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('image');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['diameter', 'characteristics']);
        });

        Schema::table('recipes', function (Blueprint $table) {
            $table->dropColumn('ingredients');
        });
    }
};
