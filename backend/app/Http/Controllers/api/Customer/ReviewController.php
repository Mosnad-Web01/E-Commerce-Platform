<?php

namespace App\Http\Controllers\Api\Customer;

use App\Models\Review;
use App\Models\Product;

use App\Http\Controllers\Controller;

class ReviewController extends Controller
{

    public function getReviews($productId)
{
    $product = Product::find($productId);
    if (!$product) {
        return response()->json([
            'success' => false,
            'message' => 'Product not found'
        ], 404);
    }

    $reviews = Review::where('product_id', $productId)
                    ->where('status', 'approved')
                    ->orderByDesc('created_at')
                    ->get();

    if ($reviews->isEmpty()) {
        return response()->json([
            'success' => false,
            'message' => 'No reviews found for this product'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $reviews
    ]);
}

}
