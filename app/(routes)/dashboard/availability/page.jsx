"use client"

// Import necessary components and libraries
import DaysList from '@/app/_utils/DaysList'; // List of days (Sunday, Monday, etc.)
import React, { useEffect, useState } from 'react'; // React hooks
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox component for selecting days
import { Input } from '@/components/ui/input'; // Input component for time selection
import { Button } from '@/components/ui/button'; // Button component
import { collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'; // Firestore methods
import { app } from '@/config/FirebaseConfig'; // Firebase configuration
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'; // Kinde authentication client
import { toast } from 'sonner'; // Toast notification library

function Availability() {

    // State to store availability of days (true or false for each day)

    const [daysAvailable,setDaysAvailable]=useState(
        {
        Sunday:false,
        },
        {
            Monday:false
        },
        {
            Tuesday:false
        },
        {
            Wendsday:false
        },
        {
            Thursday:false
        },
        {
            Friday:false
        },
        {
            Saturday:false
        }
    );
     // States to store start and end time of availability
    const [startTime,setStartTime]=useState();
    const [endTime,setEndTime]=useState();

     // Initialize Firestore instance
    const db=getFirestore(app);

    // Get the authenticated user from Kinde
    const {user}=useKindeBrowserClient();


    // Fetch the business availability information when the component mounts or the user changes
    useEffect(()=>{
        user&&getBusinessInfo();
    },[user])


    /**
   * Function to get business information from Firestore
   * It fetches the saved availability data (days and times) from Firestore
   * and updates the state accordingly.
   */
    const getBusinessInfo=async()=>{
        const docRef=doc(db,'Business',user.email);
        const docSnap=await getDoc(docRef);
        const result=docSnap.data();

        // Set the fetched data to the state
        setDaysAvailable(result.daysAvailable);
        setStartTime(result.startTime);
        setEndTime(result.endTime)
    }

    const onHandleChange=(day,value)=>{
         // Update the daysAvailable state with the new value for the selected day
        setDaysAvailable({
            ...daysAvailable,
            [day]:value
        })

        console.log(daysAvailable)
    }

    /**
   * Function to save the availability changes to Firestore
   * This will update the business document in Firestore with the new daysAvailable, startTime, and endTime.
   */
    const handleSave=async()=>{
        console.log(daysAvailable,startTime,endTime);
        const docRef=doc(db,'Business',user?.email);

        // Update the document with the new availability data
        await updateDoc(docRef,{
            daysAvailable:daysAvailable,
            startTime:startTime,
            endTime:endTime
        }).then(resp=>{
            toast('Change Updated !')
        })
    }

  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl'>Availability</h2>
        <hr className='my-7'></hr>

         {/* Section to select available days */}
        <div>
            <h2 className='font-bold'>Availability Days</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 my-3'>
                {DaysList&&DaysList.map((item,index)=>(
                    <div key={index}>
                        <h2><Checkbox
                        checked={daysAvailable&&daysAvailable[item?.day]?daysAvailable[item?.day]:false}
                        onCheckedChange={(e)=>onHandleChange(item.day,e)}
                        /> {item.day}</h2>
                    </div>
                ))}
            </div>
        </div>


           {/* Section to select availability time (start and end time) */}
        <div>
        <h2 className='font-bold mt-10'>Availability Time</h2>
        <div className='flex gap-10'>
            <div className='mt-3'>
                <h2>Start Time</h2>
                <Input type="time" 
                defaultValue={startTime}
                onChange={(e)=>setStartTime(e.target.value)} />
            </div>
            <div className='mt-3'>
                <h2>End Time</h2>
                <Input type="time" 
                defaultValue={endTime}
                onChange={(e)=>setEndTime(e.target.value)} />
            </div>
        </div>
        </div>
         {/* Save button */}
        <Button className="mt-10" 
        onClick={handleSave}
        >Save</Button>
    </div>
  )
}

export default Availability