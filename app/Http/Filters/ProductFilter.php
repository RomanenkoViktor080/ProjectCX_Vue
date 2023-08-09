<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class ProductFilter extends AbstractFilter
{

    public function apply(Builder $builder): void
    {


        foreach ($this->queryParams as $param) {
            if ($param['type'] == 0) {
                $this->applyCheckboxFilter($builder, $param);
            } else if ($param['type'] == 1) {
                $this->applyRadioFilter($builder, $param);
            } else if ($param['type'] == 2) {
                $this->applyRangeFilter($builder, $param);
            }
        }
    }

    private function applyCheckboxFilter($query, $param): void
    {
        $query->whereHas('productAttributes', function ($query) use ($param) {
            $query->where('attribute_id', $param['attribute'])
                ->whereIn('attribute_value_id', explode('ZZ', $param['values']));
        });
    }

    private function applyRadioFilter($query, $param): void
    {
        $query->whereHas('productAttributes', function ($query) use ($param) {
            $query->where('attribute_id', $param['attribute'])
                ->where('attribute_value_id', $param['values']);
        });
    }

    private function applyRangeFilter($query, $param): void
    {
        $range = explode('ZZ', $param['values']);
        if ($param['attribute'] == 'price') {
            $query->whereBetween('price', [$range[0], $range[1]]);
        }
    }
}
