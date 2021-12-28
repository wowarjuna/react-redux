import React, { useEffect, useState } from 'react';
import { Backdrop, Box, CircularProgress, Container, createStyles, makeStyles } from '@material-ui/core';
import Header from './Header';
import Results from './Results';
import { getProductAxios } from '../../../../services/productService';
import { ProductType } from '../../../../models/product-type';
import Page from '../../../../components/pages';

const ProductListView = () => {
    const classes = useStyles();

    const [products, setProducts] = useState<ProductType[]>([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        handleToggle();
        try {
            const { data } = await getProductAxios();
            setProducts(data);
        } catch (e) {
            alert('Something is wrong.');
        }
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    }

    return (
        <Page className={classes.root} title="Product List">
            <Container maxWidth={false}>
                <Header />
                {products && (
                    <Box mt={3}>
                        <Results products={products} />
                    </Box>
                )}
                <Backdrop
                    className={classes.backdrop}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </Page>
    );
};
const useStyles = makeStyles(theme =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        root: {
            minHeight: '100%',
            paddingTop: theme.spacing(3),
            paddingBottom: 100,
        },
    }),
);

export default ProductListView;