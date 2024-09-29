<?php

use App\Http\Controllers\AmilZakatController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\JadwalUstadController;
use App\Http\Controllers\MustahikController;
use App\Http\Controllers\PengurusController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZakatController;
use App\Models\Pengurus;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'welcome'])
    ->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');


    Route::resource('project', ProjectController::class);
    Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])
        ->name('task.myTasks');
    Route::resource('task', TaskController::class);
    Route::resource('blog', BlogController::class);
    Route::resource('jadwalUstad', JadwalUstadController::class);
    Route::prefix('zakat')->group(function () {
        Route::get('/RekapGabungan', [ZakatController::class, 'index'])
            ->name('zakat.RekapGabungan');
        Route::get('/RekapMustahik', [MustahikController::class, 'index'])
            ->name('zakat.RekapMustahik');
        Route::get('/CreateMustahik', [MustahikController::class, 'CreateMustahik'])
            ->name('zakat.CreateMustahik');
        Route::post('/PostMustahik', [MustahikController::class, 'PostMustahik'])
            ->name('zakat.PostMustahik');
        Route::get('/RekapDataPerhari', [ZakatController::class, 'zakatPerhari'])
            ->name('zakat.RekapDataPerhari');
        Route::get('/CreateZakat', [ZakatController::class, 'CreateZakat'])
            ->name('zakat.CreateZakat');
        Route::get('/EditZakat/{id}', [ZakatController::class, 'EditZakat'])
            ->name('zakat.EditZakat');
        Route::post('/PostZakat', [ZakatController::class, 'PostZakat'])
            ->name('zakat.PostZakat');
        Route::put('/PutZakat/{id}', [ZakatController::class, 'PutZakat'])
            ->name('zakat.PutZakat');
        Route::delete('/DeleteZakat/{id}', [ZakatController::class, 'DeleteZakat'])
            ->name('zakat.DeleteZakat');
    });
    Route::prefix('PengurusZakat')->group(function () {
        Route::get('/AmilZakat', [AmilZakatController::class, 'index'])
            ->name('zakat.AmilZakat');
    });
    // Route::resource('zakat', ZakatController::class);    
    Route::resource('Pengurus', PengurusController::class);
    Route::resource('user', UserController::class);
    Route::resource('event', EventController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');



require __DIR__ . '/auth.php';
