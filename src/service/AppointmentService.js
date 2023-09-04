import axios from "../axios-config";

class AppointmentService {
  removeAppointment(appointmentId) {
    return axios.delete(`/appointment/${appointmentId}`);
  }
  reserveAppointment(reserveAppointmentDto) {
    return axios.post(`/appointment`, reserveAppointmentDto);
  }
}

export default new AppointmentService();
