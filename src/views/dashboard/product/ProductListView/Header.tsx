import React from 'react';
import { Box, Breadcrumbs, Button, Grid, Link, makeStyles, SvgIcon, Typography } from '@material-ui/core';
import clsx from 'clsx';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link as RouterLink } from 'react-router-dom'
import { Upload as UploadIcon, PlusCircle as PlusCircleIcon } from 'react-feather'

type Props = {
    className?: string;
}
const Header = ({ className, ...rest }: Props) => {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={3}
            justifyContent="space-between"
            className={clsx(classes.root, className)}
            {...rest}>
            <Grid item>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"></NavigateNextIcon>}
                    aria-label="breadcrumb">
                    <Link
                        variant="body1"
                        color="inherit"
                        to="/dashboard"
                        component={RouterLink}>
                        Dashboard
                    </Link>
                    <Box>
                        <Typography variant="body1" color="inherit">
                            List Products
                        </Typography>
                    </Box>
                </Breadcrumbs>
                <Typography variant="h4" color="textPrimary">
                    All Products
                </Typography>
                <Box mt={2}>
                    <Button
                        className={classes.action}
                        startIcon={
                            <SvgIcon fontSize="small">
                                <UploadIcon />
                            </SvgIcon>
                        }>

                    </Button>
                </Box>
            </Grid>
            <Grid item>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.action}
                    component={RouterLink}
                    to="/dashboard/create-product"
                    startIcon={
                        <SvgIcon fontSize="small">
                            <PlusCircleIcon />
                        </SvgIcon>
                    }
                >
                    New Product
                </Button>
            </Grid>
        </Grid>
    );
};
const useStyles = makeStyles(theme => ({
    root: {},
    action: {
        marginBottom: theme.spacing(1),
        '& + &': {
            marginLeft: theme.spacing(1),
        },
    },
}));
export default Header;