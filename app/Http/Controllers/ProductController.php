<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use DB;
use SiteHelpers;

class ProductController extends Controller
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

    
   
    public function saveProduct(Request $request)
    {   
        $data = json_decode($request->data, true);       
        if(isset($data['id']) && $data['id'] <> '') {
           $product = Product::find($data['id']);
        } else {
             $product = new Product;
        }
     
        $product->name = $data['name'];
        $product->description = $data['description'];
        $product->price = $data['price'];
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            //return "inside file uplolad";
            $ext = explode(".", $_FILES["image"]["name"])[1];
            $pictureName = str_replace(' ', '', $product->name.'.'.$ext);
            $product->image = $pictureName;
        	move_uploaded_file($_FILES['image']['tmp_name'], 'docs/productImages/' . $pictureName);
           }
        $product->save();        
       
        return "success";
    }
    public function getProducts(Request $request)
    { 
        //$date = date('Y-m-d');
        //return $request->input();
        //return $request->productName;
        //var_dump($request->productName);
        //die();
        if (isset($request->productName)) {
            return $product =  Product::where('name',$request->productName)->first();
        }
        $products = DB::table('products')
            ->select('products.name', 'products.image', 'products.description', 'products.price')
            ->orderBy('products.name', 'asc')
            ->paginate(5);
        return $products;

    }
   
      public function deleteProduct(Request $request){
        $id = $request->id;
        $product = Product::find($id);
        if($product){
            $destroy = Product::destroy();
        }
        if($destroy) { return "Record Deleted"; } else { return "Could not delete record"; }
       
        
    }
   
    
    
   
}
