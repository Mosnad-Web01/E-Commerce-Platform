<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    /** @use HasFactory<\Database\Factories\ProductImageFactory> */
    use HasFactory;

    protected $guarded = [];
    protected $fillable = [
        'image_path',
        'is_primary',
        'sort_order',
        'product_id'
    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    
}
