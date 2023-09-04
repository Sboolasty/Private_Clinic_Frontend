import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/storeProvider";
import DoctorService from "../service/DoctorService";
import UserService from "../service/UserService";
import AppointmentService from "../service/AppointmentService";

const ScheduledAppointments = () => {
  const [tableContent, setTableContent] = useState("");

  const { user } = useContext(StoreContext);

  const removeAppointment = (appointmentId) => {
    console.log(appointmentId);
    AppointmentService.removeAppointment(appointmentId).then((r) => {
      if (r.data === true) {
        alert("Wizyta została usunięta");
        getData();
      } else {
        alert("Usunięcie wizyty nie powiodło się");
      }
    });
  };

  const getData = () => {
    if (user.role === "PATIENT") {
      UserService.getScheduleByIdNumber(user.idNumber).then((r) => {
        const content = r.data?.map((appointment) => {
          return (
            <tr key={appointment.date}>
              <td className="tg-0lax">{appointment.appointmentId}</td>
              <td className="tg-0lax">
                {new Date(appointment.appointmentDate.date)
                  .toLocaleString()
                  .slice(0, -3)}
              </td>
              <td className="tg-0lax">
                {appointment.appointmentDate.doctor.user.firstName}{" "}
                {appointment.appointmentDate.doctor.user.lastName}
              </td>
              <td className="tg-0pky">{appointment.description}</td>
              <td className="tg-0pky">
                <button
                  onClick={() => removeAppointment(appointment.appointmentId)}
                >
                  USUŃ
                </button>
              </td>
            </tr>
          );
        });

        setTableContent(content);
      });
    } else {
      DoctorService.getDoctorByUser(user.idNumber).then((r) => {
        console.log(r.data);
        const licenseNumber = r.data;

        DoctorService.getScheduleByLicenseNumber(licenseNumber).then((r) => {
          console.log(r.data);
          const content = r.data?.map((appointment) => {
            return (
              <tr key={appointment.date}>
                <td className="tg-0lax">{appointment.appointmentId}</td>
                <td className="tg-0lax">
                  {new Date(appointment.date).toLocaleString().slice(0, -3)}
                </td>
                <td className="tg-0lax">
                  {appointment.patientFirstName} {appointment.patientLastName}
                </td>
                <td className="tg-0pky">{appointment.description}</td>
                <td className="tg-0pky">
                  <button
                    onClick={() => removeAppointment(appointment.appointmentId)}
                  >
                    USUŃ
                  </button>
                </td>
              </tr>
            );
          });

          setTableContent(content);
        });
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="table__title">Lista wizyt</h2>
      <table className="tg" id="schedule_table">
        <thead>
          <tr>
            <th className="tg-0lax">ID</th>
            <th className="tg-0lax">Data</th>
            <th className="tg-0lax">Pacjent</th>
            <th className="tg-0lax">Opis</th>
            <th className="tg-0lax">Akcja</th>
          </tr>
        </thead>
        <tbody>{tableContent !== "" ? tableContent : null}</tbody>
      </table>
    </div>
  );
};

export default ScheduledAppointments;
