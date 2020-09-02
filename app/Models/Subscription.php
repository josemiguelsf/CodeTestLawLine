<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Subscription extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'subscriptions';  
    protected $fillable = [
        'user_id', 'product_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    
  

    /**
    * @param string|array $roles
    */
   
    /**
    * Check multiple roles
    * @param array $roles
    */
  

}
