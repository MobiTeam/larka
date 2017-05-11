<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Event extends Model
{

    use SoftDeletes;

    // Поля для массового заполнения
    protected $fillable = [
        'season_id', 'name','description', 'date_hold'
    ];

    // Скрытые поля при выводе
    protected $hidden = [
        'updated_at', 'deleted_at',
    ];

    // Дата проведения события мутатор
    public function setDateHoldAttribute($date)
    {
       $this->attributes['date_hold'] = Carbon::createFromFormat('d.m.Y', $date)->format('Y-m-d');
    }

    // Дата проведения события аксесор
    public function getDateHoldAttribute($date)
    {
       return Carbon::createFromFormat('Y-m-d', $date)->format('d.m.Y');
    }

    // Связь один ко многим с сезоном
    public function season()
    {
        return $this->belongsTo('App\Season');
    }

    // Одно событие может содержать много времен для записи
    public function times()
    {
        return $this->hasMany('App\Event_time');
    }

}
