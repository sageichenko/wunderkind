<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
//use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Task\Task;
use App\User;
use App\Models\Task\Category;
use Image;

class TaskController extends Controller {
    public function taskList(){
        $tasks = new Task();

        $items = $tasks->getAll();

        return response()->json($items, 200);
    }

    // функция, возвращающая задания определенной категории
    public function filterTaskList(Request $request){
// получение модели категории
        $category = Category::find($request->all()['categoryId']);
// извлеченение ассоциированных заданий
        $tasks = $category->tasks()->get();
        $items = [];
// формирование результирующих данных
        foreach ($tasks as $key => $value) {
            if ($value['title'] && $value['exercises']) {
                array_push($items, [
                    'id' => $value['id'],
                    'title' => $value['title'],
                    'categoryImg' => $value['categoryImg'],
                    'authorId' => $value['authorId'],
                ]);
            }
        }

        return response()->json($items, 200);
    }


    public function task(Request $request){
        $tasks = new Task();

        $task = $tasks->getTask($request->input('id'));

        return response()->json($task, 200);
    }

    public function save(Request $request){
        $task = new Task();

        $taskParams = json_decode($request->all()['params']['task']);

        $id = $task->saveTask($taskParams);

        return response()->json(['id' => $id], 200);
    }

    public function saveImg(Request $request){
        $task = new Task();
        $fileName = '';
        $isOk = false;

        var_dump($request->all());

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = time() . '.' . $image->getClientOriginalExtension();
            Image::make($image)->resize(300, 300)->save(public_path('uploads\\tasks\\' . $fileName));
            $id = $request->all()['id'];
            $isOk = $task->saveImg('/uploads/tasks/' . $fileName, $id);
        }

        return response()->json($isOk, 200);
    }

    public function delete(Request $request){
        $task = new Task();

        $isOk = $task->deleteTask($request->input('id'));

        return response()->json($isOk, 200);
    }
}
