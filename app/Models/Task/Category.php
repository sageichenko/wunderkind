<?php
namespace App\Models\Task;
use Illuminate\Http\Request;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Category extends Eloquent
{
    //
    protected $collection = 'category';
    protected $fillable = ['title', 'image'];

    public function tasks()
    {
        return $this->hasMany('App\Models\Task\Task');
    }

    public function getAll() {
        $all = $this::all();

        $categories = [];

        foreach ($all as $key => $value) {
            array_push($categories, [
                'id' => $value['id'],
                'title' => $value['title'],
                'image' => $value['image'],
            ]);
        }

        return $categories;
    }

    public function get($id) {
        $all = $this::all();

        $categories = [];

        foreach ($all as $key => $value) {
            array_push($categories, [
                'id' => $value['id'],
                'title' => $value['title'],
                'image' => $value['image'],
            ]);
        }

        return $categories;
    }
}
