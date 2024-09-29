<?php

namespace App\Providers;

use App\Repositories\Dashboard\DashboardRepository;
use App\Repositories\Interfaces\ZakatInterface;
use Illuminate\Support\ServiceProvider;
use PhpParser\Builder\Declaration;
use ZakatRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(ZakatInterface::class, ZakatRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
