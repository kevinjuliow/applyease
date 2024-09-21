<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class job_applicants extends Model
{
    use HasFactory;
    protected $table = "job_applicants";
    protected $fillable = ['id' , 'applicant_id' , 'job_id'];
}
