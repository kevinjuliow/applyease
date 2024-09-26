<?php

namespace App\Http\Controllers\Api;

use App\Models\Job;
use App\Models\job_applicants;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;

class JobApplicantsController extends Controller
{
    public function apply(Request $request, string $id)
    {

        $user = $request->user();
        $job = Job::find($id);

        if (!$user->tokenCan('authToken2')) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }


        if (!$job) {
            return response()->json([
                'message' => 'Job Not Found'
            ], 404);
        }


        $existingApplication = job_applicants::where('applicant_id', $user->id)
            ->where('job_id', $job->id)
            ->first();

        if ($existingApplication) {
            return response()->json([
                'message' => 'You have already applied for this job'
            ], 400);
        }

        $jobApplicant = new job_applicants();
        $jobApplicant->applicant_id = $user->id;
        $jobApplicant->job_id = $job->id;
        $jobApplicant->save();

        return response()->json([
            'message' => 'Application submitted successfully',
            'data' => $jobApplicant
        ], 201);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user->tokenCan('authToken')) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }

        $companyJobs = Job::where('company_id', $user->id)->get();

        if ($companyJobs->isEmpty()) {
            return response()->json([
                'messages' => "No Applicants Applied"
            ], 404);
        }


        $jobs = job_applicants::whereIn('job_id', $companyJobs->pluck("id"))->get();

        return response()->json([
            'jobs' => $jobs
        ], 200);
    }
    public function applied(Request $request)
    {
        $user = $request->user();
        
        if (!$user->tokenCan('authToken2')) {
            return response()->json([
                'message' => 'this action is forbidden'
            ], 403);
        }

        $applied=job_applicants::where('applicant_id',$user->id)->get();
        
        return response()->json([
            'applied' => $applied
        ], 200);
        

    }
}
