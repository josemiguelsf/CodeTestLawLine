<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Grupo;
use App\Models\Ciudad;
use App\Models\Blog;
use DB;
use PDF;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactAdmin;
use App\Models\Config;
use App\Http\Resources\Instructor as InstructorResource;
use App\Http\Resources\InstructorCollection;
use App\Http\Resources\Ciudad as CiudadResource;
use App\Http\Resources\CiudadCollection;
use SiteHelpers;
use Auth;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth', ['except' => ['checkUserEmailExists']]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
      
    
    public function index(Request $request)
    {
        if(!empty($request->id)) {$logout = $request->id; } else {$logout = "index";}
        return view('index', compact('logout'));
    
    }


    /**
     * Function to check whether the email already exists
     *
     * @param array $request All input values from form
     *
     * @return true or false
     */
   
      
   public function login(Request $request)
    {   
      
       
      if (Auth::attempt(['email'=> $request->email, 'password' => $request->password])) {

         $user = DB::table('users')
            ->select('users.id', 'users.first_name', 'users.last_name', 'users.email','roles.name as role' )
            ->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
            ->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('users.email', $request->email)
           ->get();
          // if($user[0]->role == 'miembro') return $user[0]->role;
        return $user;
		
        } else {
            return "unauthorized";
        }
    }
   
}
