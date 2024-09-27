<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
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
            'description' => 'nullable',
            'website' => 'nullable',
            'logo' => 'nullable'
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


        $company = new Company();
        $company->name = $request->name;
        $company->email = $request->email;
        $company->password = $request->password;
        $company->password = Hash::make($request->password);
        $company->address = $request->address;
        $company->country = $request->country;
        $company->phone = $request->phone;
        $company->website = $request->website;
        $company->description = $request->description;
        $company->logo = $request->logo;

        $company->save();

        $company->makeHidden(['password']);

        return response()->json([
            'message' => 'Company Created',
            'company' => $company
        ], 200);
    }

    public function login(Request $request)
    {
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

        $company = Company::where('email', $request->email)->first();

        if (!$company || !Hash::check($request->password, $company->password)) {
            return response()->json(['message' => 'invalid credentials.'], 401);
        }

        $token = $company->createToken('authToken')->plainTextToken;

        return response()->json([
            "message" => "logged in",
            "data" => [
                "status" => "company",
                "id" => $company->id,
                "token" => $token,
            ]
        ], 200);
    }
    public function index()
    {
        $companies = Company::orderBy('name', 'asc')->paginate(10);
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
        $company = Company::find($id);

        if (!$company) {
            return response()->json([
                'message' => 'Company not found'
            ], 404);
        }

        $company->makeHidden(['password']);

        return response()->json([
            $company
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $company = Company::find($id);
        $user = $request->user();

        if (!$company) {
            return response()->json([
                'message' => 'Company not found'
            ], 404);
        }
        if ($company->id != $user->id || !$user->tokenCan('authToken')) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }

        $validRequest = Validator::make($request->all(), [
            'name' => 'nullable|string',
            'email' => 'nullable|email|unique:companies,email,' . $company->id,
            'password' => 'nullable|confirmed',
            'address' => 'nullable|string',
            'country' => 'nullable|string',
            'phone' => 'nullable',
            'website' => 'nullable|string',
            'logo' => 'nullable|file',
            'description' => 'nullable|string'
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
                    'description' => '[string]'
                ]
            ], 422);
        }

        $company->update($request->only([
            'name',
            'email',
            'password',
            'address',
            'country',
            'phone',
            'website',
            'logo',
            'description'
        ]));

        return response()->json([
            'message' => 'Company updated successfully',
            'company' => $company
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $company = Company::find($id);
        $user = $request->user();

        if ($company->id != $user->id || !$user->tokenCan('authToken')) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }

        $company->delete();

        return response()->json([
            'message' => 'Company deleted',
            'company' => $company
        ], 200);
    }

    public function postedJobs(Request $request, string $id)
    {
        $company = Company::find($id);
        $user = $request->user();

        if (!$company) {
            return response()->json([
                'message' => 'Company not found'
            ], 404);
        }
        if ($company->id != $user->id || !$user->tokenCan('authToken')) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }
        $jobs = $company->jobs;

        if (!$jobs) {
            return response()->json([
                'message' => 'Theres not job uploaded'
            ], 400);
        }
        return response()->json([
            'message' => 'Retrieved jobs',
            'jobs' => $jobs
        ], 200);
    }
}
