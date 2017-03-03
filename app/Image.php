<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

    protected $fillable = [
        'source','name',
    ];

    // Скрытые поля при выводе
    protected $hidden = [
        'updated_at', 'deleted_at',
    ];

    public function seasons() {
        return $this->belongsToMany('App\Season')
                ->withTimestamps();
    }
}
