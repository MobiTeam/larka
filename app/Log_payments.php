<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log_payments extends Model
{
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
