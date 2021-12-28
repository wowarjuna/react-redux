import { makeStyles, Grid, Breadcrumbs, Link, Typography, Box, Button, SvgIcon } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { Link as RouterLink } from 'react-router-dom'
import { PlusCircle as PlusCircleIcon } from 'react-feather'
import clsx from 'clsx';
type Props = {
    className?: string
    onAddClick?: () => void
}
const Header = ({ className, onAddClick, ...rest }: Props) => {
    const classes = useStyles();


    return (<Grid
        className={clsx(classes.root, className)}
        container
        justifyContent="space-between"
        spacing={3}
        {...rest}>
            <Grid item>
                <Breadcrumbs 
                separator={<NavigateNextIcon fontSize="small"></NavigateNextIcon>}
                aria-label="breadcrumb">
                    <Link
                        variant="body1"
                        color="inherit"
                        to="/app"
                        component={RouterLink}>
                            Dashboard

                    </Link>
                    <Box>
                        <Typography variant="body1" color="inherit">
                            Calendar    
                        </Typography>
                    </Box>
                </Breadcrumbs>
                <Typography variant="h4" color="textPrimary">
                    Here's what you planned
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onAddClick}
                    className={classes.action}
                    startIcon={
                        <SvgIcon fontSize="small">
                            <PlusCircleIcon></PlusCircleIcon>
                        </SvgIcon>
                    }>
                        New Event
                </Button>

            </Grid>
        </Grid>)
}

const useStyles = makeStyles(theme => ({
    root: {},
    action: {
        marginBottom: theme.spacing(1),
        '& + &': {
            marginLeft: theme.spacing(1),
        },
    },
}))

export default Header