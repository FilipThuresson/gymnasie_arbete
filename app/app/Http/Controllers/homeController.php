<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class homeController extends Controller
{
    public static function home()
    {
        if(Session::get('google_token') == null){
            return redirect('/login');
        }

        return view("home",  ['data' => Course::get_all()]);
    }
    public static function rickroll(){
        return redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley');
    }
}
