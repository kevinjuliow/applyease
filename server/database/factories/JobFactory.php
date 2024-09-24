<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'position' => $this->faker->jobTitle(), 
            'description' => $this->faker->paragraph(), 
            'salary' => $this->faker->numberBetween(30000, 120000),  
            'job_type' => $this->faker->randomElement(['full-time', 'part-time', 'contract']), 
            'company_id' => $this->faker->numberBetween(1, 5), 
        ];
    }
}
