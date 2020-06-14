<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');

Route::get('/get-tasks','TaskController@taskList');
Route::get('/get-filter-tasks','TaskController@filterTaskList');
Route::get('/get-categories','CategoryController@all');
Route::get('/get-task','TaskController@task');
Route::post('/save-task','TaskController@save');
Route::post('/save-img','TaskController@saveImg');
Route::get('/delete-task','TaskController@delete');
