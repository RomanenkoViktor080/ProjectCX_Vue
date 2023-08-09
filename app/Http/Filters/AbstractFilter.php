<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

abstract class AbstractFilter implements FilterInterface
{
    protected $queryParams;

    /**
     * oldAbstractFilter constructor.
     *
     * @param array $queryParams
     */
    public function __construct($queryParams)
    {
        $this->queryParams = $queryParams;
    }


    public function getQueryParams(): array|Collection
    {
        return $this->queryParams;
    }

    public function setQueryParams($queryParams): void
    {
        $this->queryParams = $queryParams;
    }

}
