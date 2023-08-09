import {useEffect, useMemo, useRef, useState} from 'react';
import ProductCardComponent from "../Product/ProductCardComponent";
import classes from "./CatalogProductsListComponent.module.css";
import axios from "axios";
import {useParams, useSearchParams} from "react-router-dom";
import useScroll from "../../../hooks/useScroll";
import {isEmpty} from "lodash";

const CatalogProductsListComponent = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const {category} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const childRef = useRef();
    const intersection = useScroll(document.body, childRef, getProducts);
    const [isRequesting, setIsRequesting] = useState(true);
    const [fullProductLoaded, setFullProductLoaded] = useState(false);
    const [firstProductLoaded, setFirstProductLoaded] = useState(false);
    const ProductList = useMemo(() => {
        return (
            products.map((product) =>
                <ProductCardComponent key={product.id} product={product}/>
            )
        )
    }, [products])

    function getProducts() {
        if (firstProductLoaded) {
            setIsRequesting(true)
            axios.get(`/api/catalog/${category}${getSearchParams()}`).then((response) => {
                if (isEmpty(response.data)) {
                    setFullProductLoaded(true);
                    return;
                }
                setProducts([...products, ...response.data]);
                setPage(page => page + 1);
            })
                .catch((response) => {
                    console.log(response);
                })
                .finally(() => {
                    setIsRequesting(false);
                })
        }
    }

    useEffect(() => {
        axios.get(`/api/catalog/${category}${getInitSearchParams()}`).then((response) => {
            setProducts(response.data);
            setPage(2);
            setFirstProductLoaded(true);
            setFullProductLoaded(false)
        })
            .catch((response) => {
                console.log(response);
            })
            .finally(() => {
                setIsRequesting(false);
            })
    }, [category, searchParams]);

    function getSearchParams() {
        const paramsString = searchParams.toString() ? searchParams.toString() + `&page=${page}` : `page=${page}`;
        return `?${paramsString}`;
    }

    function getInitSearchParams() {
        const paramsString = searchParams.toString() ? searchParams.toString() + `&page=1` : `page=1`;
        return `?${paramsString}`;
    }

    return (
        <div className={classes.productList}>
            {
                ProductList
            }
            <div ref={childRef} style={(isRequesting || fullProductLoaded) ? {display: 'none'} : null}/>
        </div>
    );
};

export default CatalogProductsListComponent;
