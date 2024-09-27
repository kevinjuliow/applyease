<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = Job::paginate(10);

        return response()->json([
            $jobs
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $job = Job::find($id);
        
        if (!$job) {
            return response()->json([
                'message' => 'Job not found'
            ] , 404);
        };

        return response()->json([
            $job
        ] , 200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();
        $job = Job::find($id);
        
        if(!$job) { 
            return response()->json([
                'message' => 'Job not found'
            ] , 404);
        }

        if (!$user->tokenCan('authToken') || $id != $user->id ) {
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
            'description' , 'position' , 'salary' , 'job_type'
         ]));
 
         return response()->json([
             'message' => 'Job updated successfully',
             'company' => $job
         ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request , string $id)
    {
        $user = $request->user();
        $job = Job::find($id);
        
        if (!$user->tokenCan('authToken') || $id != $user->id ) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }


        $job->delete();

        return response()->json([
            'message' => 'Job deleted' , 
            'company' => $job
        ], 200);
        
    }
}
