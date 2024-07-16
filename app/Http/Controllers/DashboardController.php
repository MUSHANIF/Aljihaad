<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Event;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();


        $totalProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();
        $myProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();


        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        $activeTasks = Task::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)
            ->get();
        $activeTasks = TaskResource::collection($activeTasks);
        return inertia(
            'Dashboard',
            compact(
                'totalPendingTasks',
                'myPendingTasks',
                'totalProgressTasks',
                'myProgressTasks',
                'totalCompletedTasks',
                'myCompletedTasks',
                'activeTasks'
            )
        );
    }
    public function welcome()
    {
        $bulanSekarang = date('m');
        $response = Http::get('http://api.aladhan.com/v1/calendarByAddress/2024/' . $bulanSekarang . '?address=Bekasi, indonesia&method=2');
        $statusCode = $response->getStatusCode(); // Status code
        $data = json_decode($response->getBody()->getContents(), true)['data']; // Decode JSON response
        foreach ($data as $key => $value) {
            $data[$key]['date']['readable'] = date('d m Y', strtotime($value['date']['readable']));
            if ($data[$key]['date']['readable'] == date('d m Y')) {
                $fajr = $value['timings']['Fajr'];
                $Sunrise = $value['timings']['Sunrise'];
                $Dhuhr = $value['timings']['Dhuhr'];
                $Asr = $value['timings']['Asr'];
                $Maghrib = $value['timings']['Maghrib'];
                $Isha = $value['timings']['Isha'];
                $hari =   date('d ', strtotime($data[$key]['date']['hijri']['date']));
                $tahun =   date('Y', strtotime($data[$key]['date']['hijri']['date']));
                $waktu =  $hari . '' . $data[$key]['date']['hijri']['month']['en'] . ' ' . $tahun . ' H';
            }
        }
        $event = Event::query()
            ->orderBy('date', 'asc')
            ->limit(5)
            ->get();

        return inertia(
            'Welcome',
            compact('fajr', 'event', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'waktu')
        );
    }
}
