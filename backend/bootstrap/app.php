<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;



use Illuminate\Http\Request;

use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->render(function (
            NotFoundHttpException $e,
            Request $request
        ) {
            if (!$request->is('api/*')) {
                return;
            }
        
            $message = str_contains($e->getMessage(), 'App\\Models\\Task')
                ? 'Task tidak ditemukan'
                : 'Endpoint tidak ditemukan';
        
            return response()->json([
                'success' => false,
                'message' => $message,
            ], 404);
        });

        $exceptions->render(function (
            ValidationException $e,
            Request $request
        ) {
            if ($request->is('api/*')) {
        
                $errors = $e->errors();
        
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'error'   => collect($errors)->flatten()->first(),
                    'errors'  => $errors,
                ], 422);
        
            }
        });
    })->create();
