<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
 
    public function index()
    {
        $jobs = Job::all();
        return response()->json([
            $jobs
        ], 200);
    }
 
    public function myJobs(Request $request) {
        $user = $request->user();

        if (!$user->tokenCan('authToken')) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }
        
        $jobs = Job::where('company_id', $user->id)->paginate(10);

        if ($jobs === null) { 
            return response()->json([
                'Message' => "No Jobs"
            ], 404);
        }
        return response()->json([
            $jobs
        ], 200);

    }
    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user->tokenCan('authToken')) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }

        $validRequest = Validator::make($request->all(), [
            'description' => 'required|string',
            'position' => 'required|string',
            'salary' => 'required|numeric',
            'job_type' => 'required|string',
        ]);

        if ($validRequest->fails()) {
            return response([
                'message' => 'string',
                'errors' =>
                [
                    'description' => '[string]',
                    'position' => '[string]',
                    'salary' => '[number]',
                    'job_type' => '[string]',
                ]
            ], 422);
        }

        $job = new Job();
        $job->description = $request->description;
        $job->position = $request->position;
        $job->salary = $request->salary;
        $job->job_type = $request->job_type;
        $job->company_id = $user->id;

        $job->save();

        return response()->json([
            'message' => 'Job created successfully',
            'job' => $job
        ], 201);
    }

  
    public function show(string $id)
    {
        $job = Job::find($id);

        if (!$job) {
            return response()->json([
                'message' => 'Job not found'
            ], 404);
        };

        return response()->json([
            $job
        ], 200);
    }

 
    public function update(Request $request, string $id)
    {
        $user = $request->user();
        $job = Job::find($id);

        if (!$job) {
            return response()->json([
                'message' => 'Job not found'
            ], 404);
        }

        if (!$user->tokenCan('authToken') || $id != $user->id) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }

        $validRequest = Validator::make($request->all(), [
            'description' => 'nullable|string',
            'position' => 'nullable|string',
            'salary' => 'nullable|double',
            'job_type' => 'nullable|string',
        ]);

        if ($validRequest->fails()) {
            return response([
                'message' => 'string',
                'errors' =>
                [
                    'description' => '[string]',
                    'position' => '[string]',
                    'salary' => '[number]',
                    'job_type' => '[string]',
                ]
            ], 422);
        }

        $job->update($request->only([
            'description',
            'position',
            'salary',
            'job_type'
        ]));

        return response()->json([
            'message' => 'Job updated successfully',
            'company' => $job
        ], 200);
    }


    public function destroy(Request $request, string $id)
    {
        $user = $request->user();
        $job = Job::find($id);

        if (!$user->tokenCan('authToken') || $id != $user->id) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }


        $job->delete();

        return response()->json([
            'message' => 'Job deleted',
            'company' => $job
        ], 200);
    }
}
