<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::any('{all}',function(){
    return view('welcome'); // it should be main blade file 
})
->where('all', '^(?!api).*$')
->where('all', '^(?!storage).*$');