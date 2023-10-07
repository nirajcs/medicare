import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { doctorApi } from '../../axiosApi/axiosInstance';
import { useSelector } from 'react-redux';
import extractDate from '../../utils/extractDate';

const MyAppointments = () => {
  const { doctorInfo } = useSelector((state) => state.docAuth);
  const [bookings, setBookings] = useState([]);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [filteredBookings, setFilteredBookings] = useState([]);

  const dateHandler = (newDate) => {
    const selectedDate = extractDate(newDate)
    const filtered = bookings.filter((booking)=>{
      let date = extractDate(booking.date)
      return date === selectedDate
    })
    setFilteredBookings(filtered);
    setDate(newDate)
    setModal(true); // Show the modal when a date is selected
  };

  const closeModal = () => {
    setModal(false); // Close the modal
    setDate(new Date());
  };

  useEffect(() => {
    let fetchDetails = async () => {
      let res = await doctorApi.get(`/booking-details/${doctorInfo._id}`);
      console.log(res.data)
      setBookings(res.data);
    };
    fetchDetails();
  }, []);


  return (
    <section className='px-5'>
      <div className='w-full my-20 border-4 border-blue-200 rounded-lg'>
        <Calendar value={date} onChange={dateHandler} />
      </div>
      {modal && (
        <div>
          <div className='fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-40'></div>

          {/* Main modal */}
          <div
            id='defaultModal'
            tabIndex='-1'
            aria-hidden='true'
            className='fixed flex items-center justify-center top-0 left-0 bottom-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
          >
            <div className='relative w-full max-w-2xl max-h-full'>
              {/* Modal content */}
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                {/* Modal header */}
                <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Patients List
                  </h3>
                  <button
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    data-modal-hide='defaultModal'
                    onClick={closeModal}
                  >
                    <svg
                      className='w-3 h-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 14'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                      />
                    </svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className='p-6 space-y-6'>
                  {/* Modal content */}
                  <div className='border-2 rounded-lg border-blue-300'>
                    <table className='min-w-full bg-blue-200 text-center text-sm font-light rounded-t-lg'>
                      <thead className='border-b font-medium dark:border-neutral-500'>
                        <tr>
                          <th scope='col' className='w-16 border-2 border-blue-300 py-4'>
                            #
                          </th>
                          <th scope='col' className='w-40 border-2 border-blue-300 py-4'>
                            Name
                          </th>
                          <th scope='col' className='w-16 border-2 border-blue-300 py-4'>
                            Blood
                          </th>
                          <th scope='col' className='w-56 border-2 border-blue-300 py-4'>
                            Email
                          </th>
                          <th scope='col' className='px-4 border-2 border-blue-300 py-4'>
                            Slot
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <div className='overflow-y-auto max-h-36 rounded-b-lg'>
                      <table className='min-w-full bg-blue-100 text-center text-sm font-light'>
                        <tbody className='text-center overflow-y-auto'>
                          {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking, index) => (
                              <tr
                                key={index}
                                className='border-b dark:border-neutral-500'
                              >
                                <td className='whitespace-nowrap w-16 border-2 border-blue-300 py-4 font-medium'>
                                  {index+1}
                                </td>
                                <td className='whitespace-nowrap w-40 border-2 border-blue-300 py-4'>
                                  {booking.name ? booking.name : "N/A"}
                                </td>
                                <td className='whitespace-nowrap w-16 border-2 border-blue-300 py-4'>
                                  {booking.blood ? booking.blood : "N/A"}
                                </td>
                                <td className='whitespace-nowrap px-2 w-56 border-2 border-blue-300 py-4'>
                                  {booking.email ? booking.email : "N/A"}
                                </td>
                                <td className='whitespace-nowrap px-5 border-2 border-blue-300 py-4'>
                                  {booking.name ? booking.slotNumber+1 : "N/A"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className='border-b dark:border-neutral-500'>
                              <td
                                colSpan={4}
                                className='whitespace-nowrap px-3 py-4 font-medium'
                              >
                                No Appointments
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
                  <button
                    data-modal-hide='defaultModal'
                    onClick={closeModal}
                    type='button'
                    className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyAppointments;
