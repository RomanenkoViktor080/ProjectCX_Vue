<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ProjectCX Vue</title>
    </head>
    @vite('resources/js/app.js')
    <body class="antialiased">
    <div id="app">
       <app></app>
    </div>
    </body>
</html>
