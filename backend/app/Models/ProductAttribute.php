<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    /** @use HasFactory<\Database\Factories\ProductAttributeFactory> */
    use HasFactory;

    protected $guarded = [];
    protected $fillable = [
        'product_id', 'name', 'value'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
