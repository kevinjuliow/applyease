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
Route::post("/users/login/company" , [CompanyController::class , 'login']);

Route::get("/companies"  ,[CompanyController::class , 'index']); 
Route::get("/companies/{id}"  ,[CompanyController::class , 'show']); 




Route::post("/users/register/applicant",[ApplicantController::class,'register']);
Route::post("/users/login/applicant",[ApplicantController::class,'login']);

Route::get("/applicants"  ,[ApplicantController::class , 'index']); 
Route::get("/applicants/{id}"  ,[ApplicantController::class , 'show']); 

Route::put("/applicants/update/{id}"  ,[ApplicantController::class , 'update'])->middleware("auth:sanctum");
Route::delete("/applicants/delete/{id}"  ,[ApplicantController::class , 'destroy'])->middleware("auth:sanctum");



