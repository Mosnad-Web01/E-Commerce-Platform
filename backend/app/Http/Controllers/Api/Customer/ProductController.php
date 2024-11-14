<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category',
        'attributes' ,
        'images' => function ($q) {
            $q->where('is_primary', true);
        }]);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        $query->where('status', 'active');

        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->is_featured);
        }

        $query->orderBy('created_at', 'desc');

        $products = $query->paginate(10);

        return response()->json($products);
    }
}
