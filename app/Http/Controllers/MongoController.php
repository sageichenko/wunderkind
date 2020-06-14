<?php
// app/Http/Controllers/MongoController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;

class MongoController extends Controller
{
    public function login(Guard $auth_guard)
    {
        if ($auth_guard->validate()) {
            // get the current authenticated user
            $user = $auth_guard->user();

            return 'Success!';
        } else {
            return 'Not authorized to access this page!';
        }
    }

    public function registrate() {

    }
}
