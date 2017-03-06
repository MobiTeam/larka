<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Season extends Model
{

    use SoftDeletes;

    // Поля для мультисохранения
    protected $fillable = [
        'name', 'description', 'date_start','date_finish',
    ];

    // Скрытые поля при выводе
    protected $hidden = [
        'updated_at', 'deleted_at',
    ];

    // Дата начала set
    public function setDateStartAttribute($date)
    {
       $this->attributes['date_start'] = Carbon::createFromFormat('d.m.Y', $date)->format('Y-m-d');
    }

    // Дата начала get
    public function getDateStartAttribute($date)
    {
       return Carbon::createFromFormat('Y-m-d', $date)->format('d.m.Y');
    }

    public function setDateFinishAttribute($date)
    {
       $this->attributes['date_finish'] = Carbon::createFromFormat('d.m.Y', $date)->format('Y-m-d');
    }

    public function getDateFinishAttribute($date)
    {
       return Carbon::createFromFormat('Y-m-d', $date)->format('d.m.Y');
    }

    public function images() {
        return $this->belongsToMany('App\Image')
                ->withTimestamps();
    }

}
