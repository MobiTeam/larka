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
        'deleted_at'
    ];

    public function season()
    {
        return $this->belongsTo('App\Season');
    }


}
