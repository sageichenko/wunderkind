<?php
namespace App\Models\Task;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Category extends Eloquent
{
    //
    protected $collection = 'category';
    protected $fillable = ['title'];

    public function tasks()
    {
        return $this->hasMany('App\Models\Task\Task');
    }
}
