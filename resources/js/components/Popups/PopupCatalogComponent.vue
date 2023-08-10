<template>
    <div :class="popupWrapperClasses" @click="changeCatalogPopupState(false)">
        <div :class="$style.body" @click.stop>
            <div :class="catalogClasses.menuCatalog">
                <div :class="$style.mobileBackButton" @click="changeCatalogPopupState(false)">Закрыть</div>
                <template v-for="(category, index) in categories">
                    <div :class="[$style.categoryMenuItem,
                        (this.catalogMenuState === index || (this.catalogMenuState === null && index === 0)) && $style.menuItemActive]"
                         @click="changeCatalogMenuState(index)">
                        <span :class="$style.categoryMenuItemText">
                        {{ category.title }}
                        </span>
                        <font-awesome-icon icon="fa-solid fa-angle-down" :class="$style.categoryMenuItemIcon"/>
                        <!--TODO Маршрут на страницу категории-->
                        <router-link to="#" :class="$style.categoryMenuItemDesktopLink"
                                     @mouseenter="changeCatalogMenuState(index)"/>
                    </div>
                </template>
            </div>
            <div :class="catalogClasses.contentCatalog">
                <div :class="$style.mobileBackButton" @click="changeCatalogMenuState(null)">Назад</div>
                <div v-for="CatalogCategoryColumn in CatalogCategoryColumns" :class="$style.categoryContentColumn">
                    <template v-for="CatalogCategoryBlock in CatalogCategoryColumn">
                        <!--TODO Сформировать ссылки!-->
                        <SpoilerConvertComponent :title="CatalogCategoryBlock.title">
                            <ShowMoreOrLessComponentLinks
                                :items="CatalogCategoryBlock.childrenCategories"
                                :link-class="$style.categoryContentBlockItemTitle"
                                show-more-fn="true"/>
                        </SpoilerConvertComponent>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import SpoilerConvertComponent from "../UI/Spoiler/SpoilerConvertComponent.vue";
import ShowMoreOrLessComponentLinks from "../UI/ShowMoreOrLess/ShowMoreOrLessLinksComponent.vue";

export default {
    name: "PopupCatalogComponent",
    components: {ShowMoreOrLessComponentLinks, ShowMoreOrLessComponent, SpoilerConvertComponent},
    data() {
        return {
            categories: [],
        }
    },
    computed: {
        ...mapState({
            catalogPopupState: state => state.catalog.catalogPopupState,
            catalogMenuState: state => state.catalog.catalogMenuState,
        }),
        popupWrapperClasses() {
            if (this.catalogPopupState) {
                return [this.$style.categoryPopup, this.$style.popupaAtive];
            }
            return [this.$style.categoryPopup];
        },

        catalogClasses() {
            if (this.catalogMenuState === null) {
                return {
                    menuCatalog: [this.$style.categoryMenu],
                    contentCatalog: [this.$style.categoryContent, this.$style.hiddenOnMobile]
                }
            }
            return {
                menuCatalog: [this.$style.categoryMenu, this.$style.hiddenOnMobile],
                contentCatalog: [this.$style.categoryContent]
            }
        },
        CatalogCategoryColumns() {
            const childrenCategories = this.categories[this.catalogMenuState ?? 0]?.childrenCategories;
            if (!childrenCategories) {
                return;
            }
            const childrenCategoriesCount = childrenCategories.length;
            const column1End = Math.floor(childrenCategoriesCount / 3);
            const column2End = Math.floor(childrenCategoriesCount / 3 * 2);
            const column1 = childrenCategories.slice(0, column1End);
            const column2 = childrenCategories.slice(column1End, column2End);
            const column3 = childrenCategories.slice(column2End);
            return [column1, column2, column3];
        }
    },
    mounted() {
        axios.get('/api/catalog-data').then((response) => {
            this.categories = response.data;
        })
            .catch((response) => {
                console.log(response.data);
            });
    },
    methods: {
        changeCatalogPopupState(state) {
            this.$store.dispatch('changeCatalogPopupState', state);
        },
        changeCatalogMenuState(state) {
            this.$store.dispatch('changeCatalogMenuState', state);
        },
    },
    updated() {
        console.log(this.CatalogCategoryBlocks);
    }
}
</script>

<!--<script>

const dispatch = useDispatch();
const catalogPopupState = useSelector(state => state.catalogReducer.popupState)
const menuState = useSelector(state => state.catalogReducer.menuState)
const [categories, getCategories] = useState([]);
const catalogClasses = useMemo(() => {
    if (menuState === null) {
        return {
            menuCatalog: [classes.categoryMenu],
            contentCatalog: [classes.categoryContent, classes.hiddenOnMobile]
        }
    }
    return {
        menuCatalog: [classes.categoryMenu, classes.hiddenOnMobile],
        contentCatalog: [classes.categoryContent]
    }
}, [menuState]);

const popupWrapperClasses = useMemo(() => {
    if (catalogPopupState) {
        return [classes.categoryPopup, classWrapper, classes.popupaAtive].join(" ");
    }
    return [classes.categoryPopup, classWrapper].join(" ");
}, [catalogPopupState]);


useEffect(() => {
    axios.get('/api/catalog-data').then((response) => {
        getCategories(response.data);
    })
        .catch((response) => {
            console.log(response.data);
        })
}, []);


useEffect(() => {
    if (catalogPopupState) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
    return () => document.body.style.overflow = "auto";
}, [catalogPopupState])

const setMenuState = (state) => {
    dispatch(changeCategoryMenuState(state))
}

const setPopupCategoryState = (state) => {
    dispatch(changeCategoryPopupState(state))
}


const CatalogCategoryBlocks = useMemo(() => {
    if (isEmpty(categories)) {
        return;
    }
    let blocks = categories[menuState ?? 0]?.childrenCategories.map((category) =>
        <SpoilerConvertComponent
            key={category.id}
            classWrapper={classes.categoryContentBlock}
            title={catalogBlockTitleLink(category.title, category.slug)}>
            <ShowMoreOrLessComponent items={catalogBlockItemsLinks(category.childrenCategories)}/>
        </SpoilerConvertComponent>
    );
    const blocksCount = blocks.length;
    const column1End = Math.floor(blocksCount / 3);
    const column2End = Math.floor(blocksCount / 3 * 2);
    const column1 = <div :class={classes.categoryContentColumn}>{blocks.slice(0, column1End)}</div>
    const column2 = <div :class={classes.categoryContentColumn}>{blocks.slice(column1End, column2End)}</div>
    const column3 = <div :class={classes.categoryContentColumn}>{blocks.slice(column2End)}</div>
    return (
        <>
            {column1}
            {column2}
            {column3}
        </>
    );

}, [categories, menuState]);

function catalogBlockTitleLink(title, slug) {
    return (
        <Link to={`/catalog/${slug}`} :class={classes.categoryContentBlockTitle}
    onClick={() => setPopupCategoryState(false)}>
    {title}
</Link>
);
}

function catalogBlockItemsLinks(items) {
    return items.map(item =>
        <Link to={`/catalog/${item.slug}`} :class={classes.categoryContentBlockItemTitle}
    key={item.slug}
    onClick={() => setPopupCategoryState(false)}>
    {item.title}
</Link>
);
}

</script>-->


<style module>
@import "PopupCatalogComponent.module.scss";
</style>
