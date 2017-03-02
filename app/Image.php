<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

    protected $fillable = [
        'source','name',
    ];

    public function seasons() {
        return $this->belongsToMany('App\Season')
                ->withTimestamps();
    }
}
