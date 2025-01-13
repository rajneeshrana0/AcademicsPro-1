"use client"
import { useRef } from "react";

export default function RegisterSchoolPage() {


    const nameRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const pincodeRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const name = nameRef.current?.value;
        const address = addressRef.current?.value;
        const phone = phoneRef.current?.value;
        const city = cityRef.current?.value;
        const state = stateRef.current?.value;
        const country = countryRef.current?.value;
        const pincode = pincodeRef.current?.value;
    
        const response = await fetch("/api/superadmin/registerschool", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            address,
            phone,
            city,
            state,
            country,
            pincode,
          }),
        });
    
        if (response.ok) {
          alert("School registered successfully");
        } else {
          alert("Failed to register school");
        }
    };

  return (
    <div>
      <h1 className="text-2xl font-bold bg-border border-spacing-1 mb-8 ">Register School Page</h1>

      <form action="onSubmit" onSubmit={handleSubmit} 
      className="flex flex-col space-y-4" >

        <label htmlFor="schoolName">School Name</label>
        <input  className="text-black" ref={nameRef} type="text" id="name" name="schoolName" />
     

        <label htmlFor="schoolAddress">School Address</label>
        <input className="text-black"  ref={addressRef} type="text" id="adress" name="schoolAddress" />
     
        <label htmlFor="Phone">School Phone</label>
        <input  className="text-black"  ref={phoneRef} type="number" id="phone" name="schoolEmail" />
     
        <label htmlFor="City">School City</label>
        <input className="text-black"  ref={cityRef}  type="text" id="city" name="schoolPhone" />

        <label htmlFor="State">School state</label>
        <input   className="text-black" ref={stateRef} type="text" id="state" name="schoolWebsite" />
      
        <label htmlFor="schoolWebsite">School Country</label>
        <input  className="text-black"  ref={countryRef} type="text" id="country" name="schoolWebsite" />

        <label htmlFor="schoolWebsite">School Pincode</label>
        <input  className="text-black"  ref={pincodeRef} type="text" id="pincode" name="schoolWebsite" />
        
        <button className="bg-red-300 p-3 rounded-2xl w-60 items-center  mx-auto" type="submit">Register</button>


      </form>
      
    </div>
  );
    }