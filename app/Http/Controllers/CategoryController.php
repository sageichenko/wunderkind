<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
//use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Task\Category;
use Image;

class CategoryController extends Controller {
    public function all(){
        $category = new Category();

        $items = $category->getAll();

        return response()->json($items, 200);
    }
}
