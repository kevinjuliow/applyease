<?php

namespace Database\Factories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Applicant>
 */
class ApplicantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => $this->faker->name(),  
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('test'),     
            'birth_date' => Carbon::parse($this->faker->date())->format('m/d/Y'), // Format MM/DD/YYYY
            'phone' => $this->faker->phoneNumber(),
        ];
    }
}
