<?php

use App\Http\Controllers\Api\ApplicantController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\JobApplicantsController;
use App\Http\Controllers\Api\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/', function (Request $request) {
    return response()->json([
        "message" => "Hello"
    ]);
});


/**
 * Auth Routes
 */
#Company Auth
Route::post("/users/register/company", [CompanyController::class, 'register']);
Route::post("/users/login/company" , [CompanyController::class , 'login']);

#Applicant Auth
Route::post("/users/register/applicant",[ApplicantController::class,'register']);
Route::post("/users/login/applicant",[ApplicantController::class,'login']);



/**
 * Company Routes 
 */
Route::get("/companies"  ,[CompanyController::class , 'index']); 
Route::get("/companies/{id}"  ,[CompanyController::class , 'show']); 
Route::put("/companies/{id}"  ,[CompanyController::class , 'update'])->middleware("auth:sanctum"); 
Route::delete("/companies/{id}"  ,[CompanyController::class , 'destroy'])->middleware("auth:sanctum"); 



/**
 * Job Routes
 */
Route::get("/jobs"  ,[JobController::class , 'index']); 
Route::get("/jobs/{id}"  ,[JobController::class , 'show']); 
Route::post("/jobs"  ,[JobController::class , 'store'])->middleware("auth:sanctum"); 
Route::put("/jobs/{id}"  ,[JobController::class , 'update'])->middleware("auth:sanctum"); 
Route::delete("/jobs/{id}"  ,[JobController::class , 'destroy'])->middleware("auth:sanctum"); 


/**
* Applicant Routes
*/
Route::get("/applicants"  ,[ApplicantController::class , 'index']); 
Route::get("/applicants/{id}"  ,[ApplicantController::class , 'show']); 
Route::put("/applicants/{id}"  ,[ApplicantController::class , 'update'])->middleware("auth:sanctum");
Route::delete("/applicants/{id}"  ,[ApplicantController::class , 'destroy'])->middleware("auth:sanctum");


/**
 * Job Applicants Routes
 */
Route::post('/apply/{id}' , [JobApplicantsController::class , 'apply'])->middleware("auth:sanctum"); 
Route::get('/apply' , [JobApplicantsController::class , 'index'])->middleware("auth:sanctum"); 


