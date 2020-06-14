<?php
// app/Models/Auth/User.php
namespace App\Models\Auth;

use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use App\Services\Contracts\NosqlServiceInterface;

class User implements AuthenticatableContract
{
    private $conn;

    private $username;
    private $email;
    private $password;
    protected $rememberTokenName = 'remember_token';

    public function __construct(NosqlServiceInterface $conn)
    {
        $this->conn = $conn;
    }

    /**
     * Fetch user by Credentials
     *
     * @param array $credentials
     * @return Illuminate\Contracts\Auth\Authenticatable
     */
    public function fetchUserByCredentials(Array $credentials)
    {
        $arr_user = $this->conn->find('users', ['name' => $credentials['name']]);

        if (! is_null($arr_user)) {
            $this->username = $arr_user['name'];
            $this->email = $arr_user['email'];
            $this->password = $arr_user['password'];
        }


        return $this;
    }

    /**
     * {@inheritDoc}
     * @see \Illuminate\Contracts\Auth\Authenticatable::getAuthIdentifierName()
     */
    public function getAuthIdentifierName()
    {
        return "username";
    }

    /**
     * {@inheritDoc}
     * @see \Illuminate\Contracts\Auth\Authenticatable::getAuthIdentifier()
     */
    public function getAuthIdentifier()
    {
        return $this->{$this->getAuthIdentifierName()};
    }

    /**
     * {@inheritDoc}
     * @see \Illuminate\Contracts\Auth\Authenticatable::getAuthPassword()
     */
    public function getAuthPassword()
    {
        return $this->password;
    }

    /**
     * {@inheritDoc}
     * @see \Illuminate\Contracts\Auth\Authenticatable::getRememberToken()
     */
    public function getRememberToken()
    {
        if (! empty($this->getRememberTokenName())) {
            return $this->{$this->getRememberTokenName()};
        }
    }

    /**
     * {@inheritDoc}
     * @see \Illuminate\Contracts\Auth\Authenticatable::setRememberToken()
     */
    public function setRememberToken($value)
    {
        if (! empty($this->getRememberTokenName())) {
            $this->{$this->getRememberTokenName()} = $value;
        }
    }

    /**
     * {@inheritDoc}
     * @see \Illuminate\Contracts\Auth\Authenticatable::getRememberTokenName()
     */
    public function getRememberTokenName()
    {
        return $this->rememberTokenName;
    }

    public function create(array $data)
    {
        $this->username = $data['username'];
        $this->email = $data['email'];
        $this->password = $data['password'];
        var_dump('CREATE', $data);

        return $this;
    }
}
