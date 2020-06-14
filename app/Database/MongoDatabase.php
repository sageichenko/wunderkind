<?php
// app/Database/MongoDatabase.php
namespace App\Database;

use App\Services\Contracts\NosqlServiceInterface;

class MongoDatabase implements NosqlServiceInterface
{
    private $connection;
    private $database;

    public function __construct()
    {
        $this->connection = new \MongoDB\Client( "mongodb://127.0.0.1:27017" );
        $this->database = $this->connection->{'wunderkind'};
    }

    /**
     * @see \App\Services\Contracts\NosqlServiceInterface::find()
     */
    public function find($collection, Array $criteria)
    {
        return $this->database->{$collection}->findOne($criteria);
    }

    public function create($collection, Array $document) {}
    public function update($collection, $id, Array $document) {}
    public function delete($collection, $id) {}
}
