<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use Validator;

use App\Models\User;

class AuthController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email', 'password' => 'required|string|min:6'
        ]);
        
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors(), 'status' => 'failed'], 422);
        }
        if(! $token = auth()->attempt($validator->validated())){
            return response()->json(['errors' => 'Authorization Failed.', 'status' => 'failed'], 401);
        }
        return $this->createNewToken($token);
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|min:8|unique:users',
            'password' => 'required|min:6|string|confirmed',
            'name' => 'required|string|max:100'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->toJson(), 'status' => 'failed', 'data' => $request->all()], 400);
        }
        $user = User::create(array_merge($validator->validated(), ['password' => bcrypt($request->password)]));
        return response()->json(['message' => 'User Created Successfully.', 'user' => $user, 'status' => 'success'], 201);
    }

    public function userprofile(Request $request){
        return response()->json(['user' => auth()->user(), 'status' => 'success'], 200);
    }

    public function logout(Request $request){
        auth()->logout();
        return response()->json(['message' => 'Logged out Successfully.', 'status' => 'success'], 200);
    }

    public function refresh(Request $request){
        return $this->createNewToken(auth()->refresh());
    }
    
    public function createNewToken($token){
        return response()->json([
             'expires_in' => auth()->factory()->getTTL() * 60,
             'token' => $token,
             'user' => auth()->user(),
             'token_type' => 'bearer',
             'status' => 'success'
        ]);
    }
}
