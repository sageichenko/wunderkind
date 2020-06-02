<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ 'frontend/css/index.css' }}" type="text/css" rel="stylesheet" />
    <title>Wunderkind</title>
</head>
<body>
<div id="app">
    <app></app>
</div>

<script src="{{ mix('frontend/vendor.js') }}"></script>
<script src="{{ mix('frontend/manifest.js') }}"></script>
<script src="{{ mix('frontend/app.js') }}"></script>
</body>
</html>
