<?php
namespace App\Models\Task;
use Jenssegers\Mongodb\Eloquent\Model;

class Task extends Model
{
    //
    protected $collection = 'task';
    protected $fillable = ['title','authorId', 'exercises', 'categoryImg'];

    public function getAll() {
        $all = $this::all();

        $tasks = [];

        foreach ($all as $key => $value) {
            if ($value['title'] && $value['exercises']) {
                array_push($tasks, [
                    'id' => $value['id'],
                    'title' => $value['title'],
                    'categoryImg' => $value['categoryImg'],
                    'authorId' => $value['authorId'],
                ]);
            }
        }

        return $tasks;
    }

    public function getTask($id) {
        $task = $this::find($id);

        return [
            'id' => $task['id'],
            'title' => $task['title'],
            'exercises' => $task['exercises'],
            'categoryImg' => $task['categoryImg'],
            'authorId' => $task['authorId'],
            'categoryId' => $task['category_id'],
        ];
    }

    public function saveTask($task) {
        $taskId = null;

        if (property_exists($task,'id')) {
            $category = Category::find($task->categoryId);

            $this::find($task->id)->update([
                'title' => $task->title,
                'exercises' => $task->exercises,
                'categoryImg' => $task->categoryImg,
            ]);;

            $this::find($task->id)->category()->associate($category);

            $taskId = $task->id;
        } else {
            $newTask = $this::create([
                'title' => $task->title,
                'exercises' => $task->exercises,
                'categoryImg' => $task->categoryImg,
                'authorId' => $task->authorId
            ]);

            $category = Category::find($task->categoryId);

            $newTask->category()->associate($category);
            $newTask->save();

            $taskId = $newTask->id;
        }

        return $taskId;
    }

    public function saveImg($fileName, $id) {
        $this::find($id)->update([
            'categoryImg' => $fileName,
        ]);

        $this::find($id)['categoryImg'];

        return $this::find($id)['categoryImg'] != '';
    }

    public function deleteTask($id) {
        $msg = true;

        $this::find($id)->delete();

        if ($this::find($id)) {
            $msg = false;
        }

        return $msg;
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Task\Category');
    }
}
