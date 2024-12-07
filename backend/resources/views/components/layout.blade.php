<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Home' }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Tom Select -->
    <link href="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js"></script>

    <!-- Alpine.js For List item three points list  -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

</head>
<body>
    @auth
        <x-sidebar />

        <div id="main-content" class="flex-1 gap-4 flex flex-col  transition-all duration-300 ease-in-out
                w-full md:ml-64 md:w-[calc(100%-16rem)]">
            <x-navbar />

            <main class="p-6 space-y-6 overflow-y-auto overflow-x-hidden">
                {{ $slot }}
            </main>
        </div>
    @else
        <main>
            @yield('content')
        </main>
    @endauth
</body>
</html>
