<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    //protected $table = 'products';  
    protected $fillable = [
        'name', 'description', 'image', 'price'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    
  

    /**
    * @param string|array 
    */
   

}
