<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    protected $guarded = [];
    
    protected $fillable = [
        'artisan_id', 'category_id', 'name', 'slug', 'description', 'price', 'discount_price', 'stock_quantity', 'sku', 'status', 'is_featured', 'meta_title', 'meta_description'
    ];
    public function attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

}
