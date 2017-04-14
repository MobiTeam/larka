<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User_tsgroup extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id','user_id', 'info_group_id',
    ];

    protected $hidden = [
        'deleted_at'
    ];

}
