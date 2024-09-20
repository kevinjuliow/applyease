<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;



class company extends Model
{
    use HasApiTokens , HasFactory;
    protected $table = 'companies'; 
    protected $fillable = ['id' , 'name' , 'email' , 'password' , 'address' , 'country' , 
    'phone' , 'website' , 'logo'
    ];
}
