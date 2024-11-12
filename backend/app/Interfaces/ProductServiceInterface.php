<?php

namespace App\Interfaces;

interface ProductServiceInterface
{
    public function getAllProducts();
    public function getProductById($id);
    public function createProduct(array $data);
    public function updateProduct($id, array $data);
    public function deleteProduct($id);
}
