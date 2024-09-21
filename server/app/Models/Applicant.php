<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Applicant extends Model
{
    use HasFactory,HasApiTokens;
    protected $table = 'applicants';
    protected $fillable = [
        'id',
        'email',
        'password',
        'full_name',
        'address',
        'birth_date',
        'phone',
        'cv'
    ];

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'job_applicants');
    }
}
