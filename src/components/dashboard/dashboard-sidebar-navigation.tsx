import { Collapse, createStyles, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Toolbar } from "@material-ui/core";
import { createRef, FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import {
    PieChart as PieChartIcon,
    ShoppingCart as ShoppingCartIcon,
    ChevronUp as ChevronUpIcon,
    ChevronDown as ChevronDownIcon,
    List as ListIcon,
    FilePlus as FilePlusIcon,
} from 'react-feather'



const drawerWidth = 240;

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        link: { textDecoration: 'none', color: 'inherit' },
        logoWithLink: {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
        },
        nested: {
            paddingLeft: theme.spacing(4),
        }
    }));

export const DashboardSidebarNavigation: FC = () => {
    const classes = useStyles()
    const collapsibleRef = createRef();

    const [open, setOpen] = useState<boolean>(false)

    const handleClick = () => {
        setOpen(!open)
    };

    useEffect(() => { }, [])

    return (
        <div className={classes.root}>
            <Drawer 
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <Toolbar
                    style={{ width: '6rem', height: 'auto' }}
                    className={classes.toolbar}
                >
                    <Link to="/" className={classes.logoWithLink}>
                        Logo
                    </Link>
                </Toolbar>
                <div className={classes.drawerContainer}>
                    <List>
                        <ListSubheader>Reports</ListSubheader>
                        <Link className={classes.link} to={`/`}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PieChartIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>
                        </Link>
                        <Link className={classes.link} to={`calendar-view`}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PieChartIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Calendar View'} />
                            </ListItem>
                        </Link>
                        <ListSubheader>Management</ListSubheader>
                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </ListItem>
                        <Collapse ref={collapsibleRef} in={open} timeout="auto" unmountOnExit>
                            <List  component='div' disablePadding>
                                <Link className={classes.link} to={`list-products`}>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <ListIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="List Products" />
                                    </ListItem>
                                </Link>
                                <Link className={classes.link} to={`create-product`}>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <FilePlusIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Create Product" />
                                    </ListItem>
                                </Link>
                            </List>
                        </Collapse>
                        <Link className={classes.link} to={`settings-and-privacy`}>
                            <ListItem button>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary={'settings and privacy'} />
                            </ListItem>
                        </Link>
                        <a className={classes.link} href={'/'}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary={'logout'} />
                            </ListItem>
                        </a>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}