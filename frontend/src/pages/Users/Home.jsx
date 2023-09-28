import React from 'react'

const Home = () => {
  return (
    <div> 
      <div className="md:block md:flex md:flex-col md:items-center w-full md:h-screen">
        <img className="w-full h-5/6" src="https://img.freepik.com/free-vector/health-professional-team_52683-36023.jpg?w=740&t=st=1695308606~exp=1695309206~hmac=81a62b31c696cc0ad809a42026c67ce4e085d9111b52fdf3a7c1aea329de183f" alt="doctor-banner" />
      </div>
      <div className='flex flex-col md:flex-row w-full pb-5 mb-5 justify-evenly'>
        <div className="mx-5 md:w-1/3 my-3 md:my-0 bg-blue-400 rounded-lg p-3 text-center text-white">
          <h2 className='font-bold text-xl font-sans mb-2 underline'>CERTIFIED DOCTORS</h2>
          <p>Our website connects users with highly qualified, board-certified doctors, experts in various specialties. They provide top-notch care, ensuring the best healthcare experience. Book an appointment today for expert guidance and peace of mind.</p>
        </div>
        <div className="mx-5 md:w-1/3 my-3 md:my-0 bg-blue-400 rounded-lg p-3 text-center text-white">
          <h2 className='font-bold text-xl font-sans mb-2 underline'>SECURE PAYMENTS</h2>
          <p>"Our doctor booking website ensures secure payments, safeguarding your financial information with advanced encryption and compliance measures, guaranteeing peace of mind throughout the transaction process."</p>
        </div>
        <div className="mx-5 md:w-1/3 my-3 md:my-0 bg-blue-400 rounded-lg p-3 text-center text-white">
          <h2 className='font-bold text-xl font-sans mb-2 underline'>USER FRIENDLY</h2>
          <p>Our user-friendly website offers intuitive navigation, clear interfaces, and responsive design, ensuring a seamless and enjoyable browsing experience for all visitors, making information access effortless and efficient.</p>
        </div>
      </div>
      <div className='flex w-full md:my-24 md:h-72 bg-blue-200'>
        <div className='mx-5 my-5 w-7/12 italic'>
          <h1 className='text-4xl md:text-6xl text-left font-sans font-bold text-gray-700'>"THE FIRST</h1>
          <h1 className='text-4xl md:text-6xl text-center font-sans font-bold text-gray-700'>WEALTH IS</h1>
          <h1 className='text-4xl md:text-6xl text-right font-sans font-bold text-blue-500'>HEALTH"</h1>
          <h4 className='text-right mt-5'>- Ralph Waldo Emerson</h4>
        </div>
        <div className='w-5/12'>
          <img className='h-full w-full' src="https://img.freepik.com/free-vector/doctor-examining-patient-clinic-illustrated_23-2148856559.jpg?w=740&t=st=1695318726~exp=1695319326~hmac=4fe1b396f7d4712ea97bcf34bea405e9e1736657c7ac6ad1cf5d2bdc55b6226d" alt="image" />
        </div>
      </div>
    </div>
  )
}

export default Home


//https://img.freepik.com/free-vector/health-professional-team_52683-36023.jpg?w=740&t=st=1695308606~exp=1695309206~hmac=81a62b31c696cc0ad809a42026c67ce4e085d9111b52fdf3a7c1aea329de183f
//https://img.freepik.com/free-vector/doctors-nurses-face-masks_107791-5481.jpg?w=996&t=st=1695302045~exp=1695302645~hmac=c9f4913d2abccb5cf67a3b2e97342633df2b49315c62d2cd63d78f17d5455efa