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

        $applicant->makeHidden(['password']);

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
        $applicants = Applicant::orderBy('full_name', 'asc')->paginate(10);
        $applicants->makeHidden(['password']);
        return response()->json([
            $applicants
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $applicants = Applicant::find($id);

        if (!$applicants) {
            return response()->json([
                'message' => 'Applicant not found'
            ], 404);
        }

        $applicants->makeHidden(['password']);


        return response()->json([
            $applicants
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $applicant = Applicant::find($id);
        $user = $request->user();

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found'
            ], 404);
        }
        if ($id != $user->id || !$user->tokenCan('authToken2')) {
            return response()->json([
                'message' => 'Unauthorized Actions'
            ], 401);
        }

        $validRequest = Validator::make($request->all(), [
            "full_name" => "nullable",
            "email" => "nullable|email|unique:applicants",
            "password" => "nullable|confirmed",
            "birth_date" => "nullable",
            "phone" => "nullable",
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
                    "address" => "[string]",
                    "cv" => "[file]"
                ]
            ], 422);
        }

        $applicant->update($request->only([
            'full_name',
            'email',
            'password'
        ]));

        return response()->json([
            'message' => 'User Updated'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $applicant = Applicant::find($id);

        $user = $request->user();

        if ($applicant->id != $user->id || !$user->tokenCan('authToken2')) {
            return response()->json([
                'user' => $user->id,
                'applicants' => $applicant->id,
                'message' => 'This act is forbidden'
            ], 403);
        } else {

            $applicant->delete();

            return response()->json([
                'message' => 'User Deleted'
            ], 200);
        }
    }
}
