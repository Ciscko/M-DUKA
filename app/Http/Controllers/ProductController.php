<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Validator;

use App\Models\Product;
use App\Models\Sales;
use App\Models\SaleProducts;


use App\Http\Resources\ProductsResource;

class ProductController extends Controller

{
    public function __construct(){
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(Product::all()){
            return new ProductsResource(Product::all());
        }else{
            return response()->json(['errors' => 'Could not get Products.']);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $paths = '';
       $validator =  Validator::make($request->all(), [
            'name' =>'string|required',
            'category' => 'string|required',
            'brand' => 'string|required',
            'desc' => 'string|required',
            'qty' => 'required',
            'buying' => 'required',
            'selling' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }

        if($product = Product::create($request->all())){
            return response()->json(['status' => 'Created Successfully.', 'product' => $product], 201);
        }else{
            return response()->json(['status' => 'Could not add to DB.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if($product = Product::find($id)){
            return response()->json(['data' => $product]);
        }else{
            return response()->json(['errors' => 'Could not get the product....']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if($product = Product::findorfail($id)){
            $validator =  Validator::make($request->all(), [
                'name' =>'string|required',
                'category' => 'string|required',
                'brand' => 'string|required',
                'desc' => 'string|required',
                'qty' => 'required',
                'buying' => 'required',
                'selling' => 'required'
            ]);
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()]);
            }
            
            if($product->fill($request->all())->save()){
                return response()->json(['status' => 'Updated Successfully.', 'product' => $product], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get product.']);
        }
    }

    public function checkout(Request $request){
       $validator =  Validator::make($request->all(), [
            'sale_id' => 'required',
             'product_id' =>'required',
              'product_name' => 'required', 
              'qty' => 'required',
               'sprice' => 'required',
                'bprice' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }
        if(SaleProducts::create($request->all())){
            return response()->json(['status' => 'Added Successfully.']);
        }
        return response()->json(['errors' => 'Could not add sale items to db.']);
    }

    public function create_sale(Request $request){
        $user = auth()->user()->id;
        $sale = [
            'time' => date("Y-m-d h:i:sa"), 'user' => $user
        ];
        if($s = Sales::create($sale)){
            return response()->json(['sale' => $s], 200);
        }
        return response()->json(['error' => 'Could not create sale.'], 400);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if($product = Product::find($id)) {
            $product->delete();
            return response()->json(['status' => 'Deleted successfully.']);
       }
       else{
           return response()->json(['errors' => 'Could not delete in DB.']);
       }
    }
}
