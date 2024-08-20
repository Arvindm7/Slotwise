"use client"

// Import necessary components and libraries
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LocationOption from '@/app/_utils/LocationOption' // List of location options (e.g., Zoom, Google Meet)
import Image from 'next/image'
import Link from 'next/link'
import ThemeOptions from '@/app/_utils/ThemeOptions' // List of theme color options
import { doc, getFirestore, setDoc } from 'firebase/firestore' // Firebase Firestore functions
import { app } from '@/config/FirebaseConfig' // Firebase configuration
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs' // Authentication hook from Kinde
import { toast } from 'sonner';

import { useRouter } from 'next/navigation' // Next.js router for page navigation

function MeetingForm({ setFormValue }) {
    // States to hold various form fields and values
    const [location, setLocation] = useState();
    const [themeColor, setThemeColor] = useState('');
    const [eventName, setEventName] = useState();
    const [duration, setDuration] = useState(30); // Default duration set to 30 minutes
    const [locationType, setLocationType] = useState();
    const [locationUrl, setLocationUrl] = useState();

    // Get the user and Firestore database instance
    const { user } = useKindeBrowserClient();
    const db = getFirestore(app);
    const router = useRouter();

    // Update form values as they change and pass them to the parent component via setFormValue
    useEffect(() => {
        setFormValue({
            eventName: eventName,
            duration: duration,
            locationType: locationType,
            locationUrl: locationUrl,
            themeColor: themeColor,
        });
    }, [eventName, duration, locationType, locationUrl, themeColor]);

    /**
     * On Create Click Handler
     * This function handles the creation of a new meeting event.
     * It stores the event data in Firestore and then navigates the user back to the meeting-type page.
     */
    const onCreateClick = async () => {
        try {
          const id = Date.now().toString(); // Generate a unique ID
      
          // Save the event data to Firestore
          await setDoc(doc(db, 'MeetingEvent', id), {
            id: id,
            eventName: eventName,
            duration: duration,
            locationType: locationType,
            locationUrl: locationUrl,
            themeColor: themeColor,
            businessId: doc(db, 'Business', user?.email),
            createdBy: user?.email,
          });
      
          // Display a success message using toast
          toast.success('New Meeting Event Created!');
      
          // Redirect the user to the dashboard
          router.replace('/dashboard/meeting-type');
        } catch (error) {
          // Display an error message if the event creation fails
          toast.error('Failed to create meeting event!');
          console.error('Error creating meeting event:', error);
        }
      };

    // JSX return block that renders the meeting form
    return (
        <div className='p-8 '>
            {/* Link to cancel and go back to the dashboard */}
            <Link href={'/dashboard'}>
                <h2 className='flex gap-2'>
                    <ChevronLeft /> Cancel
                </h2>
            </Link>

            {/* Form header */}
            <div className='mt-4'>
                <h2 className='font-bold text-2xl my-4'>Create New Event</h2>
                <hr></hr>
            </div>

            {/* Form fields for event creation */}
            <div className='flex flex-col gap-3 my-4'>
                {/* Event Name input */}
                <h2 className='font-bold'>Event Name *</h2>
                <Input
                    placeholder="Name of your meeting event"
                    onChange={(event) => setEventName(event.target.value)} // Update event name state
                />

                {/* Duration input using DropdownMenu */}
                <h2 className='font-bold'>Duration *</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="max-w-40">{duration} Min</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setDuration(15)}>15 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(30)}>30 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(45)}>45 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(60)}>60 Min</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Location selection */}
                <h2 className='font-bold'>Location *</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {LocationOption.map((option, index) => (
                        <div
                            key={index}
                            className={`border flex flex-col justify-center items-center 
                            p-3 rounded-lg cursor-pointer
                            hover:bg-blue-100 hover:border-primary
                            ${locationType == option.name && 'bg-blue-100 border-primary'}`}
                            onClick={() => setLocationType(option.name)} // Set selected location type
                        >
                            <Image src={option.icon} width={30} height={30} alt={option.name} />
                            <h2>{option.name}</h2>
                        </div>
                    ))}
                </div>

                {/* URL input for the selected location type */}
                {locationType && <>
                    <h2 className='font-bold'>Add {locationType} Url *</h2>
                    <Input
                        placeholder='Add Url'
                        onChange={(event) => setLocationUrl(event.target.value)} // Update location URL state
                    />
                </>}

                {/* Theme Color selection */}
                <h2 className='font-bold'>Select Theme Color</h2>
                <div className='flex justify-evenly'>
                    {ThemeOptions.map((color, index) => (
                        <div
                            key={index}
                            className={`h-7 w-7 rounded-full ${themeColor == color && ' border-4 border-black'}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setThemeColor(color)} // Set selected theme color
                        >
                        </div>
                    ))}
                </div>
            </div>

            {/* Create button to trigger event creation */}
            <Button
                className="w-full mt-9"
                disabled={(!eventName || !duration || !locationType || !locationUrl)} // Disable button if required fields are empty
                onClick={() => onCreateClick()}
            >
                Create
            </Button>
        </div>
    )
}

export default MeetingForm;
