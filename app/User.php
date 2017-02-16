<?php

namespace App;

use Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','activated_token'
    ];

    //  protected $dateFormat = 'j.n.Y H:i:s';

     protected $dates = ['born_date'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','is_activated', 'activated_token', 'created_at', 'updated_at', 'deleted_at'
    ];

    /**
     * Automatically creates hash for the user password.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function books()
    {
        return $this->hasMany('App\Book');
    }

    public function user_group()
    {
        return $this->hasMany('App\User_group', 'id', 'user_groups_id');
    }
}
