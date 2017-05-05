<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Log_payments extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id','user_id', 'amount'
    ];

    protected $hidden = [
        'deleted_at'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
