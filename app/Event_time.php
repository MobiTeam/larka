<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Event_time extends Model
{

    use SoftDeletes;

    // Поля для массового заполнения
    protected $fillable = [
        'event_id', 'name','description', 'time_hold_start', 'time_hold_finish',
    ];

    // Скрытые поля при выводе
    protected $hidden = [
        'updated_at', 'deleted_at',
    ];


    // Связь один ко многим с событием
    public function events()
    {
        return $this->belongsTo('App\Event');
    }
}
