<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\ProductRepositoryInterface;

class ProductController extends Controller
{
    // Inject the interface
        protected $productRepository;
    
        // Dependency injection of the interface
        public function __construct(ProductRepositoryInterface $productRepository)
        {
            $this->productRepository = $productRepository;
        }
    
        public function index()
        {
            // Use the repository via the interface
            if ($this->productRepository instanceof ProductRepositoryInterface)
            {
                $products = $this->productRepository->getAll();
            }
            else {
                echo "No repository found";
            }
            return view('vendor.products.index', ['products' => $products]);
        }
    
        public function show($id)
        {
            $product = $this->productRepository->getById($id);
    
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
    
            return view('vendor.products.show', ['product' => $product]);
        }
    
        // Similarly, for create, update, and delete:
        
        public function create()
        {
            return view('vendor.products.create');
        }
        public function store(Request $request)
        {
            $validatedData = $request->validate([
                'artisan_id' => 'required|exists:users,id', 
                'category_id' => 'required|exists:categories,id', 
                'name' => 'required|string', 
                'slug' => 'required|string', 
                'description' => 'nullable|string', 
                'price' => 'required|numeric', 
                'discount_price' => 'nullable|numeric', 
                'stock_quantity' => 'required|integer',
                'sku' => 'required|string',
                'status' => 'required|in:draft,active,inactive,out_of_stock',
                'is_featured' => 'required|boolean', 
                'meta_title' => 'nullable|string',
                'meta_description' => 'nullable|string',
                
            ]);
    
            $product = $this->productRepository->create($validatedData);
            return response()->json(['product' => $product, 'message' => 'Product created successfully'], 201);
        }

        public function edit($id){
            $product = $this->productRepository->getById($id);
            return view('vendor.products.edit', ['product' => $product]);
        }
    
        public function update(Request $request, $id)
        {
            $validatedData = $request->validate([
                'artisan_id' => 'required|exists:users,id',
                'category_id' => 'required|exists:categories,id', 
                'name' => 'required|string', 
                'slug' => 'required|string', 
                'description' => 'nullable|string', 
                'price' => 'required|numeric', 
                'discount_price' => 'nullable|numeric', 
                'stock_quantity' => 'required|integer',
                'sku' => 'required|string',
                'status' => 'required|in:draft,active,inactive,out_of_stock',
                'is_featured' => 'required|boolean', 
                'meta_title' => 'nullable|string',
                'meta_description' => 'nullable|string',
                        ]);
    
            $product = $this->productRepository->update($id, $validatedData);
    
            if (!$product) {
                return response()->json(['message' => 'Product not found or update failed'], 404);
            }
    
            return response()->json(['product' => $product, 'message' => 'Product updated successfully']);
        }
    
        public function destroy($id)
        {
            $deleted = $this->productRepository->delete($id);
    
            if (!$deleted) {
                return response()->json(['message' => 'Product not found or deletion failed'], 404);
            }
    
            return response()->json(['message' => 'Product deleted successfully'], 204);
        }
    }
    