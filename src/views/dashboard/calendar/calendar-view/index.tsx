import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getEvents, openModal, selectEvent, selectRange, updateEvent } from '../../../../features/calendar/calendarSlice';
import { RootState } from '../../../../store/reducers'
import { Container, Dialog, makeStyles, Paper, useMediaQuery } from '@material-ui/core'
import Header from './header';
import Page from '../../../../components/pages';
import AddEditEventForm from './add-edit-event-form';
import { EventType, ViewType } from '../../../../models/calendar-type';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import Toolbar from './toolbar';

const selectedEventSelector = (state: RootState): EventType | null => {
    const { events, selectedEventId } = state.calendar

    if (selectedEventId) {
        return events?.find(_event => _event.id === selectedEventId)
    } else {
        return null
    }
}

const CalendarView = () => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const { events, loading, error, isModalOpen, selectedRange } = useSelector((state: RootState) => state.calendar)
    const selectedEvent = useSelector(selectedEventSelector)

    const mobileDevice = useMediaQuery('(max-width: 600px)')
    const [date, setDate] = useState<Date>(moment().toDate())
    const [view, setView] = useState<ViewType>(mobileDevice ? 'listWeek' : 'dayGridMonth')

    const calendarRef = useRef<FullCalendar | null>(null)

    const handleAddClick = (): void => {
        dispatch(openModal())
    }

    const handleModalClose = (): void => {
        dispatch(closeModal())
    }

    const handleDateNext = (): void => {
        const calendarEl = calendarRef.current

        if (calendarEl) {
            const calendarApi = calendarEl.getApi()

            calendarApi.next()

            setDate(calendarApi.getDate())
        }
    }

    const handleDatePrev = (): void => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    }

    const handleDateToday = (): void => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleViewChange = (newView: ViewType): void => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    const handleEventSelect = (arg: any): void => {
        console.log(arg.event.id)
        dispatch(selectEvent(arg.event.id));
    };

    const handleEventDrop = async ({ event }: any): Promise<void> => {
        try {
            await dispatch(
                updateEvent({
                    allDay: event.allDay,
                    start: event.start,
                    end: event.end,
                    id: event.id,
                } as any),
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleEventResize = async ({ event }: any): Promise<void> => {
        try {
            await dispatch(updateEvent({
                allDay: event.allDay,
                start: event.start,
                end: event.end,
                id: event.id,
            } as any)
            )
        } catch (err) {

        }
    }

    const handleRangeSelect = (arg: any): void => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }
        dispatch(selectRange(arg.start, arg.end));
    };



    useEffect(() => {
        dispatch(getEvents());
    }, [])
    return (
        <Page className={classes.root} title="Calendar">
            <Container maxWidth={false}>
                <Header onAddClick={handleAddClick}></Header>
                <Toolbar
                    date={date}
                    onDateNext={handleDateNext}
                    onDatePrev={handleDatePrev}
                    onDateToday={handleDateToday}
                    onViewChange={handleViewChange}
                    view={view}
                />

                <Paper>
                    <FullCalendar
                        allDayMaintainDuration
                        droppable
                        editable
                        selectable
                        weekends
                        dayMaxEventRows
                        eventResizableFromStart
                        headerToolbar={false}
                        select={handleRangeSelect}
                        eventClick={handleEventSelect}
                        initialDate={date}
                        initialView={view}
                        events={events}
                        height={800}
                        ref={calendarRef}
                        rerenderDelay={10}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                            timelinePlugin,
                        ]}
                    >

                    </FullCalendar>
                </Paper>
                <Dialog
                    maxWidth="sm"
                    fullWidth
                    onClose={handleModalClose}
                    open={isModalOpen}>
                    {isModalOpen && (
                        <AddEditEventForm
                            event={selectedEvent}
                            range={selectedRange}
                            onAddComplete={handleModalClose}
                            onCancel={handleModalClose}
                            onDeleteComplete={handleModalClose}
                            onEditComplete={handleModalClose} />

                    )}
                </Dialog>
                <h1>Calendar Works! </h1>
                {loading && <h2>Loading....</h2>}
                {error && <h2>Something Happened</h2>}
                <ul>
                    {events.map(e => (
                        <li key={e.id}>{e.title}</li>
                    ))}
                </ul>
            </Container>
        </Page>
    );
};


const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    calender: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        '& .fc-unthemed .fc-head': {},
        '& .fc-unthemed .fc-body': {
            backgroundColor: theme.palette.background.default,
        },
    }

}))
export default CalendarView;