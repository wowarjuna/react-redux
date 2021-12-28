import { Button, ButtonGroup, Grid, Hidden, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import React, { ElementType, ReactNode } from 'react';
import { ViewType } from "../../../../models/calendar-type";
import { } from '@material-ui/core'
import ViewConfigIcon from '@material-ui/icons/ViewComfyOutlined'
import ViewWeekIcon from '@material-ui/icons/ViewWeekOutlined'
import ViewDayIcon from '@material-ui/icons/ViewDayOutlined'
import ViewAgendaIcon from '@material-ui/icons/ViewAgendaOutlined'

type ViewOption = {
    label: string
    value: ViewType
    icon: ElementType
}

type Props = {
    children?: ReactNode;
    className?: string;
    date: Date;
    onDateNext?: () => void;
    onDatePrev?: () => void;
    onDateToday?: () => void;
    onAddClick?: () => void;
    onViewChange?: (view: ViewType) => void;
    view: ViewType;
}

const Toolbar = ({ className,
    date,
    onDateNext,
    onDatePrev,
    onDateToday,
    onAddClick,
    onViewChange,
    view,
    ...rest }: Props) => {
    const classes = useStyles()
    return (<Grid
        className={clsx(classes.root, className)}
        alignItems="center"
        container
        justifyContent="space-between"
        spacing={3}
        {...rest}>
        <Grid item>
            <ButtonGroup size="small">
                <Button onClick={onDatePrev}>Prev</Button>
                <Button onClick={onDateToday}>Today</Button>
                <Button onClick={onDateNext}>Next</Button>
            </ButtonGroup>
        </Grid>
        <Hidden smDown>
            <Grid item>
                <Typography variant="h3" color="textPrimary">
                    {moment(date).format('MMMM YYYY')}
                </Typography>
            </Grid>
            <Grid item>
                {viewOptions.map(viewOption => {
                    const Icon = viewOption.icon


                    return (<Tooltip key={viewOption.value} title={viewOption.label}>
                        <IconButton
                            color={viewOption.value === view ? 'primary' : 'default'}
                            onClick={() => {
                                if (onViewChange) {
                                    onViewChange(viewOption.value);
                                }
                            }}
                        ><Icon /></IconButton></Tooltip>)
                })

                }
            </Grid>
        </Hidden>
    </Grid>

    )
}


export default Toolbar;

const viewOptions: ViewOption[] = [
    {
        label: 'Month',
        value: 'dayGridMonth',
        icon: ViewConfigIcon,
    },
    {
        label: 'Week',
        value: 'timeGridWeek',
        icon: ViewWeekIcon,
    },
    {
        label: 'Day',
        value: 'timeGridDay',
        icon: ViewDayIcon,
    }
]

const useStyles = makeStyles(() => ({
    root: {},
}));