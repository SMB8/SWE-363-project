import KConnect from '../assets/kfupmConnectLogo.png';
import React, {use, useState} from 'react';
import axios from "axios";
import {getCurrentUserId, useLogout} from '../api'

function CreatingEvent(){

    const logOut = ()=>{
        useLogout();
    }

    const [eventTitle, setEventTitle] = useState("");
    function handleTitle(event){
        setEventTitle(event.target.value);
    }

    const[description, setDescription] = useState("");
    function handleDescription(event){
        setDescription(event.target.value);
    }

    const[category, setCategory] = useState([]);
    function handleCategory(event){
        //setCategory(event.target.value);
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            if (category.length < 3) {
                setCategory([...category, value]);
            } else {
                alert("You can only select up to 3 categories.");
                event.target.checked = false;
            }
        } else {
            setCategory(category.filter(cat => cat !== value));
        }
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const[location, setLocation] = useState("");
    function handleLocation(event){
        setLocation(event.target.value);
    }

    const [selectedDate, setSelectedDate] = useState("");
    function handleDate(event){
        setSelectedDate(event.target.value);
    }

    const [startTime, setStartTime] = useState("");
    function handleStartTime(event){
        setStartTime(event.target.value);
    }

    const [endTime, setEndTime] = useState("");
    function handleEndTime(event){
        setEndTime(event.target.value);
    }

    const [maxPart, setMaxPart] = useState(1000); // Making maximum === 1000
    function handleMaxPart(event){
        setMaxPart(event.target.value);
    }

    const [imageURL, setImageURL] = useState("");
    function handleImageURL(event){
        setImageURL(event.target.value);
    }

    const [specialReq, setspecialReq] = useState("");
    function handlespecialReq(event){
        setspecialReq(event.target.value);
    }

    
    const createEvent = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/",{ //Modify with DataBase URL
                EventTitle: eventTitle,
                Description: description,
                Category: category,
                Location: location,
                Date: selectedDate,
                StartTime: startTime,
                EndTime: endTime,
                MaxParticipants: maxPart,
                ImageURL: imageURL,
                SpecialRequest: specialReq,
                Creator: getCurrentUserId()
            }) 
            alert(res.data.message);
        }
        catch(err){
            alert("Event was not saved, try again later");
        }
    };
    

    return(
        <div className='flex flex-col max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md m-4'>

            <header className='flex item-center justify-between mb-4'>
                <h1 className='text-lg font-bold text-black mb-4'>
                        Create New Event:
                </h1>

                <button onClick={logOut} className='bg-red-400 hover:bg-red-700 text-white py-0.5 px-6 rounded text-sm'>
                    Log Out
                </button>

            </header>

            <div className='flex w-full bg-blue-50 rounded-lg'>
            
                <div className='w-1/2 flex items-center justify-center'>
                    <img src={KConnect} width={390} height = {240} alt="KFUPM Connect Logo" className="w-150 h-150 object-contain"/>
                </div>

                <div className='w-1/2 justify-center mb-8'>
                    <p className='text-lg font-semibold text-black mb-4'>Event Title <span className="text-red-500">*</span></p>
                    <input value={eventTitle} onChange={handleTitle} placeholder='Enter a descriptive title' className='w-full px-3 py-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required/>

                    <p className='text-lg font-semibold text-black mb-4'>Description <span className="text-red-500">*</span></p>
                    <textarea value={description} onChange={handleDescription} placeholder='Descrive your event, what participants can expect' className='w-full px-3 py-5 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required/>
                    

                    <div className='flex space-x-8 justify-center mb-4'>
                        <div className="flex flex-col items-center w-full">
                            <div className="relative w-full">
                                <p className='text-lg font-semibold text-black mb-2'>Category <span className="text-red-500">*</span></p>

                                {/* Clickable summary box */}
                                <div
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer' 
                                    required
                                >
                                    {category.length === 0 ? "Select up to 3" : category.join(", ")}
                                </div>

                                {/* Dropdown with checkboxes */}
                                {dropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-md">
                                        {["Sports", "Technology", "Networking", "Professional"].map(option => (
                                            <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-100">
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={category.includes(option)}
                                                    onChange={handleCategory}
                                                    className="mr-2"
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-full">
                            <p className='text-lg font-semibold text-black mb-2'>Location <span className="text-red-500">*</span></p>
                            <select value={location} onChange={handleLocation} className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                <option value="">Select an option</option>
                                <option value="Al-Khobar">Al-Khobar</option>
                                <option value="Al-Dammam">Al-Dammam</option>
                                <option value="Al-Dhahran">Al-Dhahran</option>
                                <option value="Al-Hasa">Al-Hasa</option>
                            </select>                        
                        </div> 
                    </div>


                    <div className='flex space-x-8 justify-center mb-4'>
                        <div className="flex flex-col items-center w-full">
                            <p className='text-lg font-semibold text-black mb-2'>Date <span className="text-red-500">*</span></p>
                            <input type='date' value={selectedDate} onChange={handleDate} className='w-full px-3 py-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <p className='text-lg font-semibold text-black mb-2'> Start Time <span className="text-red-500">*</span></p>
                            <input type='time' value={startTime} onChange={handleStartTime} className='w-full px-3 py-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                        </div>  
                        <div className="flex flex-col items-center w-full">
                            <p className='text-lg font-semibold text-black mb-2'>End Time <span className="text-red-500">*</span></p>
                            <input type='time' value={endTime} onChange={handleEndTime} className='w-full px-3 py-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                        </div>  
                    </div>

                    <p className='text-lg font-semibold text-black mb-2'>Maximum Participants</p>
                    <input value={maxPart} onChange={handleMaxPart} placeholder='Leave blank for unlimited' className='w-full px-3 py-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>

                    <p className='text-lg font-semibold text-black mb-2'>Image URL</p>
                    <input value={imageURL} onChange={handleImageURL}  placeholder='https://www.kfupm.edu.sa/' className='w-full px-3 py-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                    
                    <p className='text-lg font-semibold text-black mb-2'>Special Requirements or Notes</p>
                    <textarea value={specialReq} onChange={handlespecialReq}  placeholder='Any special requirements, things participants should bring...etc' className='w-full px-3 py-2 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>

                    <div className='flex justify-center items-center'> 
                        <button onClick={createEvent} className='flex justify-center items, bg-blue-400 hover:bg-blue-700 text-white py-2 px-4 rounded'>
                            Create Event
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreatingEvent;