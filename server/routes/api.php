<?php

use App\Http\Controllers\Api\ApplicantController;
use App\Http\Controllers\Api\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/', function (Request $request) {
    return response()->json([
        "message" => "Hello"
    ]);
});


Route::post("/users/register/company", [CompanyController::class, 'register']);


Route::post("/users/register/applicant",[ApplicantController::class,'register']);
Route::post("/users/login/applicant",[ApplicantController::class,'login']);
