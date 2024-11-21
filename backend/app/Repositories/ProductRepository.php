<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductAttribute;
use App\Interfaces\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    protected $model;

    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function index()
    {
        // Eager load images and attributes
        return $this->model->with(['images', 'attributes'])->get();
    }

    public function getById($id)
    {
        // Eager load images and attributes
        return $this->model->with(['images', 'attributes'])->find($id);
    }

    public function store(array $data)
    {
        $product = $this->model->create($data);

        // Save images if provided
        if (isset($data['images']) && is_array($data['images'])) {
            foreach ($data['images'] as $image) {
                $product->images()->create($image);
            }
        }

        // Save attributes if provided
        if (isset($data['attributes']) && is_array($data['attributes'])) {
            foreach ($data['attributes'] as $attribute) {
                $product->attributes()->create($attribute);
            }
        }

        return $product->load(['images', 'attributes']);
    }

    public function update(array $data, $id)
    {
        $product = $this->model->find($id);

        if ($product) {
            $product->update($data);

            // Update images if provided
            if (isset($data['images']) && is_array($data['images'])) {
                $product->images()->delete(); // Clear old images
                foreach ($data['images'] as $image) {
                    $product->images()->create($image);
                }
            }

            // Update attributes if provided
            if (isset($data['attributes']) && is_array($data['attributes'])) {
                $product->attributes()->delete(); // Clear old attributes
                foreach ($data['attributes'] as $attribute) {
                    $product->attributes()->create($attribute);
                }
            }

            return $product->load(['images', 'attributes']);
        }

        return null;
    }

    public function delete($id)
    {
        $product = $this->model->find($id);
        if ($product) {
            $product->images()->delete();
            $product->attributes()->delete();
            return $product->delete();
        }
        return false;
    }
}
