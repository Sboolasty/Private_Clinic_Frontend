import { useContext, useState } from "react";
import DoctorService from "../service/DoctorService";
import { StoreContext } from "../store/storeProvider";
import AppointmentService from "../service/AppointmentService";
import AvailabilityDateService from "../service/AvailabilityDateService";

const AddAvailabilityDate = () => {
  const { user } = useContext(StoreContext);

  console.log(user);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    DoctorService.getDoctorByUser(user.idNumber).then((r) => {
      console.log(r.data);
      const licenseNumber = r.data;

      if (licenseNumber) {
        AvailabilityDateService.addAvailabilityDate({
          doctorDto: {
            licenseNumber,
          },
          date,
          durationMinutes: duration,
        }).then((r) => {
          if (r.data) alert("Wolny termin dodany!");
          else alert("Dodawnie nie powiodło się.");
        });
      }
    });
    console.log(date, duration);
  };

  const handleDateChange = (e) => {
    const date1 = e.currentTarget.value;
    setDate(date1);
    console.log(date1);
  };

  const handleDurationChange = (e) => setDuration(e.currentTarget.value);
  return (
    <div>
      <h2>Dodaj wolny termin</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="datetime-local"
          placeholder="Data"
          value={date}
          onChange={handleDateChange}
        />
        <input
          type="number"
          placeholder="Czas trwania"
          value={duration}
          onChange={handleDurationChange}
        />
        <button type="submit">Dodaj wolny termin</button>
      </form>
    </div>
  );
};

export default AddAvailabilityDate;
