'use client'
import React, { useState, useEffect } from "react";
import { map } from 'lodash';
import {

    DateSelectArg,
    EventClickArg,

} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';
import { addEvent, getEvents } from "../hooks/useEvent";


const DashboardPage = () => {
    //    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [newEventTitle, setNewEventTitle] = useState<string>("");
    const [newEventDate, setNewEventDate] = useState<string>("");
    const [newEventColor, setNewEventColor] = useState<string>("");
    const [newEventTime, setNewEventTime] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
    const [events, setEvents] = useState<any>("");



    useEffect(() => {
        async function events() {
            const eventsAux = await getEvents();

            // console.log(eventsAux);
            const dataEvent = map(eventsAux, function (event) {
                return {
                    id: event.id,
                    title: event.title,
                    date: event.date,
                    time: event.time,
                    color: event.color
                }
            });
            setEvents(dataEvent);
        };

        events();

        //loadData(events);

    }, [])


    // const loadData = (events) => {

    //     console.log(events);
    //     const dataEvent = map(events, function (event) {
    //         return {
    //             id: event.id,
    //             title: event.title,
    //             date: new Date(event.date),
    //             time: event.time,
    //             color: event.color
    //         }
    //     });

    //     console.log(dataEvent);



    //     setEventsCalendar(dataEvent);
    // }
    console.log(events);


    const handleDateClick = (selected: DateSelectArg) => {
        setSelectedDate(selected);
        setIsDialogOpen(true);
    };

    const handleEventClick = (selected: EventClickArg) => {
        // Prompt user for confirmation before deleting an event
        if (
            window.confirm(
                `Are you sure you want to delete the event "${selected.event.title}"?`
            )
        ) {
            selected.event.remove();
        }
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (newEventTitle && selectedDate) {
                const calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
                calendarApi.unselect(); // Unselect the date range.

                // const newEvent = {
                //     id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
                //     title: newEventTitle,
                //     start: selectedDate.start,
                //     end: selectedDate.end,
                //     allDay: selectedDate.allDay,
                // };
                const newEvent = {
                    title: newEventTitle,
                    date: newEventDate,
                    time: newEventTime,
                    color: newEventColor || "blue",
                };

                calendarApi.addEvent(newEvent);
                const result = await addEvent(newEvent);
                if (result) {
                    alert("Evente guardado");
                }


                handleCloseDialog();
            }
        } catch (error) {
            throw (error)
        }

    };


    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewEventTitle("");
    };

    return (
        <>
            <div className='h-[calc(100vh)] flex justify-center items-center'>
                <div className='container p-4 bg-slate-50'>
                    <div className='flex justify-between'>
                        <h1 className='text-black mt-4'>Schedule</h1>
                        <Button className='bg-slate-900 text-white rounded-md mt-4'
                            onClick={() => signOut()}
                        >
                            Log out
                        </Button>

                    </div>

                    <FullCalendar
                        height={"85vh"}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                        }} // Set header toolbar options.
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        events={events}
                    />
                </div>
            </div>

            <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            >
                <DialogContent className="h-auto w-auto">
                    <DialogHeader>
                        <DialogTitle>
                            New Event
                        </DialogTitle>
                    </DialogHeader>
                    <div className="items-center space-x-2">
                        <form className="space-y-1 mb-4" onSubmit={handleAddEvent}>
                            <label className="block mb-2">Title</label>
                            <input
                                type="text"
                                placeholder="Event Title"
                                value={newEventTitle}
                                onChange={(e) => setNewEventTitle(e.target.value)} // Update new event title as the user types.
                                required
                                className="border border-gray-200 p-3 rounded-md text-lg"
                            />

                            <label className="block mb-2">Date</label>
                            <input
                                type="date"
                                placeholder="12/02/2025"
                                value={newEventDate}
                                onChange={(e) => setNewEventDate(e.target.value)} // Update new event title as the user types.
                                required
                                className="border border-gray-200 p-3 rounded-md text-lg"
                            />

                            <label className="block mb-2">Time</label>
                            <input
                                type="text"
                                placeholder="15:00 PM"
                                value={newEventTime}
                                onChange={(e) => setNewEventTime(e.target.value)} // Update new event title as the user types.
                                required
                                className="border border-gray-200 p-3 rounded-md text-lg"
                            />

                            <label className="block mb-2">Color</label>
                            <input
                                type="text"
                                placeholder="Blue"
                                value={newEventColor}
                                onChange={(e) => setNewEventColor(e.target.value)} // Update new event title as the user types.
                                required
                                className="border border-gray-200 p-3 rounded-md text-lg"
                            />

                            <button
                                className="block bg-green-500 text-white p-3 mt-5 rounded-md w-full"
                                type="submit"
                            >
                                Add
                            </button>{" "}
                            {/* Button to submit new event */}
                        </form>
                    </div>

                </DialogContent>
            </Dialog>
        </>


    )
}

export default DashboardPage