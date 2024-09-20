<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Applicant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function register(Request $request)
    {
        $validRequest = Validator::make($request->all(), [
            "full_name" => "required",
            "email" => "required|email|unique:applicants",
            "password" => "required|confirmed",
            "birth_date" => "required",
            "phone" => "required",
            "address" => "nullable|string",
            "cv" => "nullable|string",

        ]);
        if ($validRequest->fails()) {
            return response([
                'error' => $request->full_name,
                "message" => "string",
                "errors" =>
                [
                    "full_name" => "[string]",
                    "email" => "[string]",
                    "password" => "[string]",
                    "password_confirmation" => "[string]",
                    "birth_date" => "[date]",
                    "phone" => "[number]",
                ]
            ], 422);
        }
        $applicant = new Applicant();
        $applicant->full_name = $request->full_name;
        $applicant->email = $request->email;
        $applicant->password = $request->password;
        $applicant->password = Hash::make($request->password);
        $applicant->birth_date = $request->birth_date;
        $applicant->phone = $request->phone;

        $applicant->save();

        return response()->json([
            'message' => 'Applicant Created',
            'applicant' => $applicant
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

        $applicant = Applicant::where('email', $request->email)->first();

        if (!$applicant || !Hash::check($request->password, $applicant->password)) {
            return response()->json(['message' => 'invalid credentials.'], 401);
        }

        $token = $applicant->createToken('authToken2')->plainTextToken;

        return response()->json([
            'message' => 'Signed in',
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
