<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Socialite;
use App\Models\User;
use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
        $this->middleware('guest')->except('logout');
        $this->model = new User();
        
    }

     public function login(Request $request)
    {   
      
       
      if (Auth::attempt(['email'=> $request->email, 'password' => $request->password])) {

         $user = DB::table('users')
            ->select('users.id','users.first_name', 'users.last_name', 'users.email','roles.name as role' )
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

   

    /**
    * Handle Social login request
    *
    * @return response
    */
 
    public function socialLogin($social)
    {
        return Socialite::driver($social)->redirect();
    }
 
   /**
    * Obtain the user information from Social Logged in.
    * @param $social
    * @return Response
    */
 
    public function handleProviderCallback($social)
    {
 
        $userSocial = Socialite::driver($social)->user();
        // echo '<pre>';print_r($userSocial);exit;
        $user = User::where(['email' => $userSocial->getEmail()])->first();
 
       if($user){
 
            Auth::login($user);
            return redirect()->action('HomeController@index');
 
       }else{
 
            return view('auth.register',['name' => $userSocial->getName(), 'email' => $userSocial->getEmail()]);
        }
 
   }
    
    
}
