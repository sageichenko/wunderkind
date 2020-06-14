<?php
namespace App\Models\Task;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class User extends Eloquent
{
    //
    protected $collection = 'task';
    protected $fillable = ['title','author', 'exercises'];

    public function auth()
    {
        return $this->belongsTo('App\Models\Auth\User');
    }

}
