import { AppBar, Button, colors, createStyles, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { FC } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    link: {
        color: colors.lightBlue[50],
        textDecoration: 'none',
    }
}))

export const NavigationBar: FC = () => {
    const classes = useStyles();
    return (<div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Link className={`${classes.link} ${classes.title}`} to={'/'}>
                    LOGO
                </Link>
                <Button color="inherit">
                    <Link to={'/'}>
                        Home
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to={'/about'}>
                        About
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to={'/dashboard'}>
                        Dashboard
                    </Link>
                </Button>
                <Button color="inherit">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    </div>)
}