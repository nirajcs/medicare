import React, { useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";

const DoctorTimeManagement = () => {
    const [value, setValue] = useState({ 
        startDate: null ,
        endDate: null 
    }); 
 
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setValue(newValue); 
    }
  return (
    <section className="container">
        <div className='flex'>
            <Datepicker    
                primaryColor={"sky"}
                useRange={false}
                asSingle={true}
                value={value} 
                onChange={handleValueChange}
            />
            <div>
                <input type="time" className='mx-2' name="time" id="time" />
            </div>
        </div>
    </section>
  )
}

export default DoctorTimeManagement