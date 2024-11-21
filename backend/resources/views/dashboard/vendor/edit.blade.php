@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Edit Product</h1>
    <form action="{{ route('vendor.products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="name">Product Name</label>
            <input type="text" name="name" class="form-control" value="{{ $product->name }}" required>
        </div>
        <div class="form-group">
            <label for="category_id">Category</label>
            <select name="category_id" class="form-control" required>
                <option value="">Select a category</option>
                @foreach($categories as $category)
                <option value="{{ $category->id }}" {{ $category->id == $product->category_id ? 'selected' : '' }}>
                    {{ $category->name }}
                </option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="price">Price</label>
            <input type="number" step="0.01" name="price" class="form-control" value="{{ $product->price }}" required>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea name="description" class="form-control">{{ $product->description }}</textarea>
        </div>
        <div class="form-group">
            <label for="images">Current Images</label>
            <div>
                @foreach($product->images as $image)
                <img src="{{ asset($image->image_path) }}" alt="Product Image" width="50">
                @endforeach
            </div>
        </div>
        <div class="form-group">
            <label for="images">Add New Images</label>
            <input type="file" name="images[]" class="form-control" multiple>
        </div>
        <div class="form-group">
            <label for="attributes">Attributes</label>
            <div id="attributes-container">
                @foreach($product->attributes as $index => $attribute)
                <div class="row mb-2">
                    <div class="col-md-5">
                        <input type="text" name="attributes[{{ $index }}][name]" class="form-control" value="{{ $attribute->name }}">
                    </div>
                    <div class="col-md-5">
                        <input type="text" name="attributes[{{ $index }}][value]" class="form-control" value="{{ $attribute->value }}">
                    </div>
                </div>
                @endforeach
            </div>
            <button type="button" class="btn btn-secondary btn-sm" onclick="addAttribute()">Add Attribute</button>
        </div>
        <button type="submit" class="btn btn-primary">Update Product</button>
    </form>
</div>

<script>
    let attributeIndex = {{ $product->attributes->count() }};
    function addAttribute() {
        const container = document.getElementById('attributes-container');
        const row = document.createElement('div');
        row.className = 'row mb-2';
        row.innerHTML = `
            <div class="col-md-5">
                <input type="text" name="attributes[${attributeIndex}][name]" class="form-control" placeholder="Attribute Name">
            </div>
            <div class="col-md-5">
                <input type="text" name="attributes[${attributeIndex}][value]" class="form-control" placeholder="Attribute Value">
            </div>
        `;
        container.appendChild(row);
        attributeIndex++;
    }
</script>
@endsection
