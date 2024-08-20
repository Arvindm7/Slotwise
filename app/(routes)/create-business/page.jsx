"use client"

// Import necessary components and libraries
import { Button } from '@/components/ui/button' // Custom Button component
import { Input } from '@/components/ui/input'   // Custom Input component
import { app } from '@/config/FirebaseConfig'    // Firebase configuration
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs' // Kinde authentication hook
import { doc, getFirestore, setDoc } from 'firebase/firestore' // Firebase Firestore functions
import Image from 'next/image' // Next.js Image component
import { useRouter } from 'next/navigation' // Next.js Router for navigation
import React, { useState } from 'react' // React and state management
import { toast } from 'sonner' // Toast notification library

function CreateBusiness() {
    // State to store the business name input by the user
    const [businessName, setBusinessName] = useState();
    
    // Initialize Firestore with Firebase configuration
    const db = getFirestore(app);
    
    // Get the authenticated user data using the Kinde client
    const { user } = useKindeBrowserClient();
    
    // Initialize the Next.js router for navigation
    const router = useRouter();

    /**
     * Function to handle the Create Business button click
     * It creates a new business document in Firestore and navigates to the dashboard.
     */
    const onCreateBusiness = async () => {
        console.log("Button Clicked", businessName);

        // Create a new document in the 'Business' collection with the user's email as the document ID
        await setDoc(doc(db, 'Business', user.email), {
            businessName: businessName.replace(" ", "_"), // Replace spaces with underscores in business name
            email: user.email, // Store the user's email
            userName: user.given_name + " " + user.family_name // Store the user's full name
        })
        .then(resp => {
            console.log("Document Saved"); // Log success to the console
            toast('New Business Created!'); // Show a success toast notification
            router.replace('/dashboard'); // Redirect the user to the dashboard page
        });
    };

    // JSX return block that renders the UI
    return (
        <div className='p-14 items-center flex flex-col gap-20 my-10'>
            {/* Company logo */}
            <Image src='/logo.svg' width={200} height={200} />

            {/* Form to input the business name */}
            <div className='flex flex-col items-center gap-4 max-w-3xl'>
                <h2 className='text-4xl font-bold'>What should we call your business?</h2>
                <p className='text-slate-500'>You can always change this later from settings</p>
                
                {/* Input field for team/business name */}
                <div className='w-full'>
                    <label className='text-slate-400'>Team Name</label>
                    <Input
                        placeholder="Ex. Your team name"
                        className="mt-2"
                        onChange={(event) => setBusinessName(event.target.value)} // Update the state when input changes
                    />
                </div>

                {/* Create Business button, disabled if the business name is empty */}
                <Button
                    className="w-full"
                    disabled={!businessName} // Disable the button if businessName is not provided
                    onClick={onCreateBusiness} // Trigger the onCreateBusiness function on click
                >
                    Create Business
                </Button>
            </div>
        </div>
    );
}

export default CreateBusiness;
