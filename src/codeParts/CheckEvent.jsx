import React, {use, useState} from 'react';
import {fetchMadeEvents, useLogout, deleteEvent, updateEvent} from '../api';

function CheckEvent(){
    const events = fetchMadeEvents();

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/events`, {
            headers: {
                'Content-Type': 'application/json',
                ...authHeaders(), // if you need auth
            },
            });

            if (!res.ok) throw new Error('Failed to fetch events');

            const data = await res.json();
            setEvents(data); // store fetched events in state
        } catch (error) {
            console.error('Error fetching events:', error);
        }
        };

        fetchEvents();
    }, []);

    const logOut = ()=>{
        useLogout();
    }

    const [search, setSearch] = useState("");
    function handleSearch(event){
        setSearch(event.target.value);
    }

    const[roles, setRoles] = useState("");
    function handleRoles(event){
        setRoles(event.target.value);
    }

    const[status, setStatus] = useState("");
    function handleStatus(event){
        setStatus(event.target.value);
    }

    const resetButton = ()=>{
        setSearch("")
        setStatus("");
        setRoles("");
    }

    const editEvent = (id) =>{
        updateEvent(id);
    }

    const deleteEventButton = (id)=>{
        deleteEvent(id);
    }

    return(
        <div className='flex flex-col max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md m-4 mb-10'>
            <header className='mb-6'>
                <div className='flex items-center justify-between mb-4'>
                <h1 className='text-3xl font-bold text-black mb-4'>Your Meetups:</h1>
                <button
                    onClick={logOut}
                    className='bg-red-400 hover:bg-red-700 text-white py-2 px-4 rounded text-sm'
                >
                    Log Out
                </button>
                </div>

                <div className='flex space-x-8 justify-center mb-4'>
                <div className="flex flex-col items-center w-full">
                    <input
                    type='text'
                    value={search}
                    onChange={handleSearch}
                    placeholder='Search users...'
                    className='w-full px-3 py-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className="flex flex-col items-center w-full">
                    <select
                    value={roles}
                    onChange={handleRoles}
                    className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                    <option value="">All Roles</option>
                    <option value="Organizer">Organizer</option>
                    <option value="Participant">Participant</option>
                    </select>
                </div>

                <div className="flex flex-col items-center w-full">
                    <select
                    value={status}
                    onChange={handleStatus}
                    className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Old">Old</option>
                    </select>
                </div>

                <div className="flex flex-col items-center w-full">
                    <button
                    onClick={resetButton}
                    className='flex justify-center items-center bg-blue-400 hover:bg-blue-700 text-white py-2 px-4 rounded'
                    >
                    Reset
                    </button>
                </div>
                </div>
            </header>

            <div className='flex w-full bg-blue-50 rounded-lg'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((e) => (
                    <div key={e.id} className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="relative">
                        <img
                        src={e.ImageURL}
                        alt={e.EventTitle}
                        className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {e.Category.map((category) => (
                            <span
                            key={category}
                            className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded"
                            >
                            {category}
                            </span>
                        ))}
                        </div>
                    </div>

                    <div className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold">{e.title}</h3>
                        <div className="text-sm text-gray-500 space-y-1">
                        <p>📅 {e.Date}</p>
                        <p>⏰ {e.StartTime}</p>
                        <p>📍 {e.Location}</p>
                        <p>👥 {e.MaxParticipants} participants</p>
                        </div>

                        <div className="mt-4 space-y-2">
                        <button
                            onClick={editEvent}
                            className="w-full bg-[#084B7A] text-white py-2 rounded-lg hover:bg-[#073B5E] transition"
                        >
                            Edit Event
                        </button>
                        <button
                            onClick={()=> deleteEventButton(e.id)}
                            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Delete Event
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>       
    );
}

export default CheckEvent;


                /*
                <div className='rounded-lg shadow-md m-10 bg-white h-120 w-120'>
                    <div className="flex px-20 py-5 space-x-20 items-start h-60 justify-center mb-1 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxptdOz3sJ5bUNe4waCxzG9rsxkqnYFwDnw&s')] bg-cover bg-center rounded-lg">
                        <p className='bg-red-300 rounded-full'>Networking</p>
                        <p className='bg-green-300 rounded-full'>Celebration</p>
                    </div>
                    
                    <div className='m-2 space-y-5'>
                        <h2 className='text-blue-600 font-semibold text-center justify-center'>
                            2025 Graduation Cerrmony
                        </h2>

                        <div className='flex space-x-8 justify-center mb-4'>
                            <div className="flex flex-col items-center w-full">
                                <p className='text-lg text-black mb-2'>April 23, 2025</p>
                                <p className='text-lg text-black mb-2'>KFUPM stadium</p>                    
                            </div>

                            <div className="flex flex-col items-center w-full">
                                <p className='text-lg text-black mb-2'>4:00 pm - 8:00 pm</p>
                                <p className='text-lg text-black mb-2'>100/300 participants</p>                    
                            </div> 
                        </div>
                        <div className="flex space-x-8 justify-center mb-4">
                            <button onClick={editEvent} className='flex justify-center items, bg-cyan-800 hover:bg-cyan-950 text-white py-2 px-4 rounded'>
                                Edit Event
                            </button>
                            <button onClick={deleteEvent} className='flex justify-center items, bg-gray-400 hover:bg-gray-600 text-blue py-2 px-4 rounded'>
                                Delete Event
                            </button>
                        </div>
                    </div>
                </div>
                */