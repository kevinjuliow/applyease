<?php

use App\Http\Controllers\Api\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/', function (Request $request) {
    return response()->json([
        "message" => "Hello"
    ]);
});


Route::post("/users/register/company" , [CompanyController::class , 'register']);
Route::post("/users/login/company" , [CompanyController::class , 'login']);

Route::get("/companies"  ,[CompanyController::class , 'index']); 
Route::get("/companies/{id}"  ,[CompanyController::class , 'show']); 


