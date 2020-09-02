<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use App\Models\User;
use DB;
use SiteHelpers;

class SubscriptionController extends Controller
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

    
   
    public function saveSubscription(Request $request)
    {   
       
        $existing = Subscription::where('user_id', $request->user_id)
            ->where('product_id', $request->id)
            ->get();
       if(!empty($existing)) {
            $subscription = new Subscription;
            $subscription->user_id = $request->user_id;
            $subscription->product_id = $request->id;
            $subscription->save();
            return "success";
        } else {
        return "already";
        }
    }
    public function getSubscriptions(Request $request)
    { 
         $subscriptions = DB::table('subscriptions')
            ->select('subscriptions.id', 'subscriptions.product_id', 'subscriptions.user_id','products.name', 'products.image', 'products.description', 'products.price', 'users.first_name', 'users.last_name')
            ->leftJoin('users', 'users.id', '=', 'subscriptions.user_id')
            ->leftJoin('products', 'products.id', '=', 'subscriptions.product_id')
           // ->where('subscriptions.user_id', '=', $request->user_id)
            ->orderBy('products.name', 'asc')
            ->paginate(5);
        return $subscriptions;
    }
   
      public function deleteSubscription(Request $request){
        $id = $request->id;
        $subscription = Subscription::find($id);
        if($subscription){
            $destroy = Subscription::destroy();
        }
        if($destroy) { return "Record Deleted"; } else { return "Could not delete record"; }
    }
}
