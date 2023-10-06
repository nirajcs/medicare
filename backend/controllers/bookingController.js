import asyncHandler from "express-async-handler";
import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";

const bookingController = {
  bookSlot: asyncHandler(async (req, res) => {
  
    const { user, doctor, date } = req.params;
    const inputDate = new Date(date);
    const isoDateString = inputDate.toISOString(); // Convert to ISO string
    let slot = -1;

    try {
      const doctorDetails = await Doctor.findOne({ _id: doctor });

      if (doctorDetails) {
        // Find the index of the booking with the same date
        const existingBookingIndex = doctorDetails.bookings.findIndex(
          (booking) => booking.date.toISOString() === isoDateString
        );

        if (existingBookingIndex !== -1) {
          doctorDetails.bookings[existingBookingIndex].slots.push({ userId: user });
          slot = doctorDetails.bookings[existingBookingIndex].slots.length;
        } else {
          // If no booking with the same date exists, create a new booking
          doctorDetails.bookings.push({
            date: inputDate, // Use the inputDate as a Date object
            slots: [{ userId: user }], // Push the user as an object with userId property
          });
          slot = doctorDetails.bookings[doctorDetails.bookings.length - 1].slots.length;
        }

        // Save the changes
        const saveBooking = await doctorDetails.save();

        if (saveBooking) {
          const userBooking = await User.findOne({ _id: user });
          if (userBooking) {
            let details = {
              doctorId: doctor,
              date: inputDate,
              slot: slot
            };
            userBooking.bookings.push(details);
            const saveBooking = await userBooking.save();

            if (saveBooking) {
              res.status(200).json(details);
            } else {
              res.status(400).json({ error: "Failed to save" });
            }
          } else {
            res.status(400).json({ error: "User Not Found" });
          }
        } else {
          res.status(400).json({ error: "Failed to save Doctor" });
        }
      } else {
        res.status(400).json({ error: "Doctor Not Found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }),
};

export default bookingController;
