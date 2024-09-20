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
            'email' => 'required|email|unique:companies',
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
                    'password_confirmation' => '[string]',
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
        $company->password = Hash::make($request->password);
        $company->address = $request->address ; 
        $company->country = $request->country ; 
        $company->phone = $request->phone ; 

        $company->save() ; 


        return response()->json([
            'message' => 'Company Created',
            'company' => $company
        ], 200);

    }

    public function login(Request $request) { 
        $validRequest = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validRequest->fails()) {
            return response([
                'message' => 'string',
                'errors' =>
                [
                    'email' => '[string]',
                    'password' => '[string]',
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
    $companies = company::orderBy('name', 'asc')->paginate(10);
    $companies->makeHidden(['password']);
        
    return response()->json([
        $companies
    ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $company = company::find($id);
        $company->makeHidden(['password']);
        
        if (!$company) {
            return response()->json([
                'message' => 'Company not found'
            ] , 404);
        }

        return response()->json([
            $company
        ] , 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $company = company::find($id);
        if (!$company) {
            return response()->json([
                'message' => 'Company not found'
            ] , 404);
        }
        if ($company->id != $id) {
            return response()->json([
                'message' => 'Unauthorized Actions'
            ] , 401);
        }

        $validRequest = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:companies',
            'password' => 'nullable|confirmed',
            'address' => 'nullable||string',
            'country' => 'nullable|string',
            'phone' => 'nullable', 
            'website' => 'nullable|string',
            'logo' => 'nullable',
        ]);
        
        if ($validRequest->fails()) {
            return response([
                'message' => 'string',
                'errors' =>
                [
                    'name' => '[string]',
                    'email' => '[string]',
                    'password' => '[string]',
                    'address' => '[string]',
                    'country' => '[string]',
                    'phone' => '[number]',
                    'website' => '[string]',
                    'logo' => '[file]',
                ]
            ], 422);
        }

        $company->update($request->only([
            'name' , 'email' , 'password' 
        ]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
