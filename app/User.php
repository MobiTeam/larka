<?php

namespace App;

use Hash;
use Carbon\Carbon;
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


    // protected $dates = ['born_date'];

    // protected $dateFormat = 'j.n.Y H:i:s';
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','is_activated', 'activated_token', 'created_at', 'updated_at', 'deleted_at','pivot'
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

    public function setBornDateAttribute($date)
    {
       $this->attributes['born_date'] = Carbon::createFromFormat('d.m.Y', $date)->format('Y-m-d');
    }

    public function getBornDateAttribute($date)
    {
        if (is_null($date)) {
            return null;
        }
        else{
            return Carbon::createFromFormat('Y-m-d', $date)->format('d.m.Y');
       }
    }

    // Связь пользователя с группой
    public function user_group()
    {
        return $this->hasMany('App\User_group', 'id', 'user_groups_id');
    }
    // Связь пользователя с проведенными оплатами
    public function user_payments()
    {
        return $this->hasMany('App\User_payments', 'user_id', 'id');
    }
    // Связь пользователя с его логами по оплате
    public function log_payments()
    {
        return $this->hasMany('App\Log_payments', 'user_id', 'id');
    }
    // Связь многие со многим с группами сезонов, в которых принимает участие пользователь
    public function tsgroup() {
        return $this->belongsToMany('App\Info_group', 'user_tsgroups')
                ->withTimestamps();
    }

    // Связь многие со многим с событиями сезонов, на которые пользователь записался
    public function event_times() {
        return $this->belongsToMany('App\Event_time', 'user_event_time')
                ->withTimestamps();
    }

}
