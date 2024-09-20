<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function register(Request $request)
    {
        $validRequest = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'address' => 'required',
            'country' => 'required',
            'phone' => 'required',
        ]);

        if ($validRequest->fails()) {
            return response([
                'message' => 'string',
                'errors' =>
                [
                    'name' => '[string]',
                    'email' => '[string]',
                    'password' => '[string]',
                    'password_confirmation' => '[`string`]', 
                    'address' => '[string]',
                    'country' => '[string]',
                    'phone' => '[number]',
                ]
            ], 422);
        }

        $company = new company(); 
        $company->name = $request->name ; 
        $company->email = $request->email ; 
        $company->password = $request->password ; 
        $company->password = Hash::make($request->passowrd);
        $company->address = $request->address ; 
        $company->country = $request->country ; 
        $company->phone = $request->oohone ; 

        $company->save() ; 


        return response()->json([
            'message' => 'Company Created',
            'company' => $company
        ], 200);

    }

    public function login(Request $request) { 
        $validRequest = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'address' => 'required',
            'country' => 'required',
            'phone' => 'required',
        ]);

        if ($validRequest->fails()) {
            return response([
                'message' => 'string',
                'errors' =>
                [
                    'name' => '[string]',
                    'email' => '[string]',
                    'password' => '[string]',
                    'password_confirmation' => '[`string`]', 
                    'address' => '[string]',
                    'country' => '[string]',
                    'phone' => '[number]',
                ]
            ], 422);
        }

        $company = company::where('email' , $request->email)->first();

        if (!$company || !Hash::check($request->password, $company->password)){
            return response()->json(['message' => 'invalid credentials.'] , 401);
        }

        $token = $company->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User Created',
            'token' => $token
        ], 200);
    }
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
