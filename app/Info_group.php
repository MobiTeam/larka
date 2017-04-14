<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class Info_group extends Model
{
    use SoftDeletes;

    // Поля для мультисохранения
    protected $fillable = [
        'season_id', 'name','description', 'capacity', 'count_training', 'price',
    ];

    protected $hidden = [
        'deleted_at','pivot'
    ];

    public function season()
    {
        return $this->belongsTo('App\Season');
    }

    // Связь многие со многим с группами сезонов, в которых принимает участие пользователь
    public function users() {
        return $this->belongsToMany('App\User', 'user_tsgroups')
                ->withTimestamps();
    }


}
