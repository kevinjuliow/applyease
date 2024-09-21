<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $table = "jobs";
    protected $fillable = ['id' , 'position' , 'description' , 'salary' , 'job_type' , 'company_id'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
    
}
