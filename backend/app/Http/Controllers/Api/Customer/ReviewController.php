<?php

namespace App\Http\Controllers\Api\Customer;

use App\Models\Review;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReviewController extends Controller
{

    public function addReview(Request $request, $productId)
    {
        // التحقق من أن المنتج موجود
        $product = Product::findOrFail($productId);

        // التحقق من أن المستخدم قد أكمل عملية شراء لهذا المنتج
        $orderItem = OrderItem::where('product_id', $productId)
            ->where('order_id', $request->order_id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$orderItem) {
            return response()->json(['message' => 'You can only review products you have purchased'], 400);
        }

        // التحقق من أن التقييم بين 1 و 5
        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'title' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
        ]);

        // إنشاء التقييم
        $review = new Review();
        $review->user_id = $request->user()->id;
        $review->product_id = $productId;
        $review->order_item_id = $orderItem->id;
        $review->rating = $request->rating;
        $review->title = $request->title;
        $review->comment = $request->comment;
        $review->status = 'pending';  // سيتم مراجعته من قبل المسؤول
        $review->save();

        return response()->json($review, 201);
    }


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

//هذه الداله تسمح للمديرين بتغيير حالة التقييمات، حيث يمكنهم الموافقة على التقييم أو رفضه.
public function updateReviewStatus($reviewId, $status)
{
    $review = Review::findOrFail($reviewId);

    if (!in_array($status, ['approved', 'rejected'])) {
        return response()->json(['message' => 'Invalid status'], 400);
    }

    $review->status = $status;
    $review->save();

    return response()->json($review);
}


public function deleteReview($reviewId)
{
    $review = Review::findOrFail($reviewId);
    $review->delete();

    return response()->json(['message' => 'Review deleted successfully']);
}

//عرض التقييمات التي تحتوي على حالة معينة مثل "قيد المراجعة"، "موافقة" أو "مرفوضة".
public function showReviewsByStatus($status)
{
    $validStatuses = ['pending', 'approved', 'rejected'];

    // التأكد من صحة الحالة
    if (!in_array($status, $validStatuses)) {
        return response()->json(['message' => 'Invalid status'], 400);
    }

    $reviews = Review::with(['product', 'user'])
        ->where('status', $status)
        ->get();

    return response()->json($reviews);
}

}
