@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Add Product</h1>
    <form action="{{ route('vendor.create') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="form-group">
            <label for="name">Product Name</label>
            <input type="text" name="name" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="category_id">Category</label>
            <select name="category_id" class="form-control" required>
                <option value="">Select a category</option>
                <!-- Loop through categories -->
                @foreach($categories as $category)
                <option value="{{ $category->id }}">{{ $category->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="price">Price</label>
            <input type="number" step="0.01" name="price" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea name="description" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label for="images">Images</label>
            <input type="file" name="images[]" class="form-control" multiple>
        </div>
        <div class="form-group">
            <label for="attributes">Attributes</label>
            <div id="attributes-container">
                <div class="row mb-2">
                    <div class="col-md-5">
                        <input type="text" name="attributes[0][name]" class="form-control" placeholder="Attribute Name">
                    </div>
                    <div class="col-md-5">
                        <input type="text" name="attributes[0][value]" class="form-control" placeholder="Attribute Value">
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" onclick="addAttribute()">Add Attribute</button>
        </div>
        <button type="submit" class="btn btn-primary">Save Product</button>
    </form>
</div>

<script>
    let attributeIndex = 1;
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
