<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Applicant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;



class ApplicantController extends Controller
{


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
            "message" => "logged in",
            "data" => [
                "status" => "applicant",
                "id" => $applicant->id,
                "token" => $token,
            ]
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
            'birth_date',
            'address',
            'phone'
        ]));

        return response()->json([
            'message' => 'User Updated'
        ], 200);
    }

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

    public function upload(Request $request, string $id)
    {
        $user = $request->user();
        $applicant = Applicant::find($id);
    
        if ($applicant->id != $user->id || !$user->tokenCan('authToken2')) {
            return response()->json([
                'user' => $user->id,
                'applicants' => $applicant->id,
                'message' => 'This action is forbidden'
            ], 403);
        } else {
            try {
                $request->validate([
                    'file' => 'required|file|mimes:pdf|max:51200', // 50MB
                ]);
                $userName = $user->full_name;
    
                $sanitizedUserName = preg_replace('/[^A-Za-z0-9_\-]/', '_', $userName);
                $filename = "{$sanitizedUserName}_" . time() . ".pdf";
                
                if ($applicant->cv) {
                    $oldFilePath = "cvs/{$applicant->cv}";
                    if (Storage::disk('public')->exists($oldFilePath)) {
                        Storage::disk('public')->delete($oldFilePath);
                    }
                };
    
                $path = $request->file('file')->storeAs('cvs', $filename, 'public');
    
                $applicant->cv = $filename; 
                $applicant->save(); 
    
                return response()->json([
                    'message' => 'CV uploaded successfully',
                    'path' => asset("storage/{$path}"), // Ensure the path is publicly accessible
                ], 200);
            } catch (ValidationException $e) {
                return response()->json([
                    'message' => 'Upload failed. Only PDF files under 50MB are allowed.', // Updated message
                    'errors' => $e->errors(),
                ], 422);
            } catch (\Exception $e) {
                // Handle other potential exceptions
                return response()->json([
                    'message' => 'An unexpected error occurred during upload.',
                    'error' => $e->getMessage(),
                ], 500);
            }
        }
    }
    
    public function download(Request $request, string $id)
    {
        $applicant = Applicant::find($id);
        $fileName = $applicant->cv;

        if (!$fileName) {
            return response()->json([
                'message' => 'User has not uploaded a CV'
            ], 400);
        } else if (!Storage::disk('public')->exists("cvs/{$fileName}")) {
            return response()->json([
                'message' => 'File not found.'
            ], 404);
        }
        
        $filePath = storage_path("app/public/cvs/{$fileName}");
        return response()->download($filePath);
    }
    public function delete(Request $request, string $id)
    {
        $user = $request->user();
        $applicant = Applicant::find($id);

        if ($applicant->id != $user->id || !$user->tokenCan('authToken2')) {
            return response()->json([
                'user' => $user->id,
                'applicants' => $applicant->id,
                'message' => 'This act is forbidden'
            ], 403);
        } else {
            $fileName = $applicant->cv;

            if (!$fileName) {
                return response()->json([
                    'message' => 'User has not uploaded a CV'
                ], 400);
            }
            $FilePath = "cvs/{$applicant->cv}";
            if (Storage::disk('public')->exists($FilePath)) {
                Storage::disk('public')->delete($FilePath);
                return response()->json([
                    'message' => 'User\'s CV has been successfully deleted'
                ], 200);
            }
        }
    }
}
