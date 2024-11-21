@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Products</h1>
    <a href="{{ route('vendor.products.create') }}" class="btn btn-primary mb-3">Add Product</a>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Primary Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products as $product)
            <tr>
                <td>{{ $product->id }}</td>
                <td>{{ $product->name }}</td>
                <td>{{ $product->category->name ?? 'N/A' }}</td>
                <td>${{ number_format($product->price, 2) }}</td>
                <td>{{ ucfirst($product->status) }}</td>
                <td>{{ $product->is_featured ? 'Yes' : 'No' }}</td>
                <td>
                    @if ($product->images->where('is_primary', true)->first())
                        <img src="{{ asset($product->images->where('is_primary', true)->first()->image_path) }}" alt="Primary Image" width="50">
                    @else
                        N/A
                    @endif
                </td>
                <td>
                    <a href="{{ route('vendor.products.edit', $product->id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('vendor.products.destroy', $product->id) }}" method="POST" style="display: inline-block;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this product?')">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
