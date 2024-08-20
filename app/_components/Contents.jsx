"use client";
import { Button } from '@/components/ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Hero() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animations on page load
    setIsAnimated(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Floating profile images (once) */}
      <div className="hidden lg:block">
        <Image
          src="/profile1.png"
          width={100}
          height={100}
          className={`h-[100px] object-cover rounded-full absolute right-36 ${isAnimated ? 'animate-photo-float' : ''}`}
          alt="profile1"
        />
        <Image
          src="/profile3.png"
          width={100}
          height={100}
          className={`h-[100px] object-cover rounded-full absolute top-48 left-16 ${isAnimated ? 'animate-photo-float' : ''}`}
          alt="profile3"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className={`h-[100px] object-cover rounded-full absolute bottom-20 left-36 ${isAnimated ? 'animate-photo-float' : ''}`}
          alt="profile2"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className={`h-[100px] object-cover rounded-full absolute right-16 bottom-32 ${isAnimated ? 'animate-photo-float' : ''}`}
          alt="profile4"
        />
      </div>

      {/* Hero Text and Call to Action */}
      <div className={`text-center max-w-3xl p-10 bg-white shadow-lg rounded-lg ${isAnimated ? 'animate-zoom-in-once' : ''}`}>
        <h2 className={`font-extrabold text-[50px] text-slate-800 mb-6 ${isAnimated ? 'animate-slide-in-down-once' : ''}`}>
          Simplify Your Scheduling
        </h2>
        <p className={`text-lg mt-5 text-slate-500 mb-8 ${isAnimated ? 'animate-slide-in-up-once' : ''}`}>
          Say goodbye to scheduling stress. Effortlessly manage your meetings and appointments with our seamless automation. Save time and stay organized.
        </p>
        <div className="flex gap-4 flex-col items-center mt-5">
          <h3 className="text-sm mb-4 text-slate-500">
            Sign up with Google or Facebook for a seamless experience.
          </h3>
          <div className="flex justify-center gap-8">
            <LoginLink>
              <Button className="p-7 flex gap-4 bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
                <Image src="/google.png" alt="google" width={40} height={40} />
                Sign up with Google
              </Button>
            </LoginLink>
            <LoginLink>
              <Button className="p-7 flex gap-4 bg-blue-700 hover:bg-blue-800 text-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
                <Image src="/facebook.png" alt="facebook" width={40} height={40} />
                Sign up with Facebook
              </Button>
            </LoginLink>
          </div>
          <hr className="w-full border-gray-300 mt-8 mb-6" />
          <LoginLink>
            <h2 className="text-lg font-semibold text-primary hover:underline transition-all duration-300">
              Sign up with Email — It's Fast, Easy & Free
            </h2>
          </LoginLink>
        </div>
      </div>

      <style jsx>{`
        /* Keyframes for animations */
        @keyframes photo-float {
          0% { transform: scale(0.8) translateY(50px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        @keyframes slide-in-down-once {
          0% { transform: translateY(-50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes slide-in-up-once {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes zoom-in-once {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Animation classes */
        .animate-photo-float {
          animation: photo-float 1s ease-out forwards;
        }

        .animate-slide-in-down-once {
          animation: slide-in-down-once 1s ease-out forwards;
        }

        .animate-slide-in-up-once {
          animation: slide-in-up-once 1s ease-out forwards;
        }

        .animate-zoom-in-once {
          animation: zoom-in-once 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Hero;
