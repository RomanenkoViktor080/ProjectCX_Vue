<?php

namespace App\Actions;

class getCategoryTreeIdsAction
{
    function handle($categories)
    {
        $categoriesIds = $categories->pluck('id');

        foreach ($categories as $childrenCategories) {
            $categoriesIds = $categoriesIds
                ->concat($this->handle($childrenCategories->allChildrenCategories));
        }
        return $categoriesIds;
    }
}
