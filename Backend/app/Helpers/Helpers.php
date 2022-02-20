<?php

use App\Models\User;
use Illuminate\Support\Str;

/**
 * user
 *
 * @return User
 */
function user(){
    return auth()->user();
}

function printQuery($query, $bindings = [], $dd = true){
    if (gettype($query) != 'string') {
        $bindings = $query->getBindings();
        $query = $query->toSql();
    }
    foreach ($bindings as $index => $value) {
        $bindings[$index] = match(gettype($value)){
            'number' => $value,
            'string' => "'".$value."'",
            default => $value
        };
    }
    $query = Str::replace('"', '', $query);
    $query = Str::replaceArray('?', $bindings, $query);
    if ($dd) {
        dd($query);
    }
    return $query;
}
