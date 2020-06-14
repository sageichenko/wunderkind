<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
//use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Task\Task;
use Image;

class TaskController extends Controller {
    public function all(){
        $tasks = new Task();

        $items = $tasks->getAll();

        return response()->json($items, 200);

//        if(!isNull($items)) {
//            return response()->json($items, 200);
//        } else {
//            $msg = [
//                'error' => true,
//                'message' => 'Заданий не найденно'
//            ];
//
//            return response()->json(array($msg), 404);
//        }
    }

    public function task(Request $request){
        $tasks = new Task();

        $task = $tasks->getTask($request->input('id'));

        return response()->json($task, 200);
    }

    public function save(Request $request){
        $task = new Task();

        $isOk = $task->saveTask(json_decode($request->all()['params']['task']));

        return response()->json(['id' => $isOk], 200);
    }

    public function saveImg(Request $request){
        $task = new Task();
        $fileName = '';
        $isOk = false;

        var_dump($request->all());

        if ($request->hasFile('image')) {
            var_dump('has file');
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
