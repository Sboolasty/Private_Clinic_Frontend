import axios from "../axios-config";

class DoctorService {
  getAllDoctors() {
    return axios.get(`/doctors`);
  }

  getAvaialbilityDatesByDoctor(idDoctor) {
    return axios.get(`doctors/${idDoctor}/availability`);
  }

  getDoctorByUser(userIdNumber) {
    return axios.get(`/licenseNumberByUser/${userIdNumber}`);
  }

  getScheduleByLicenseNumber(licenseNumber) {
    return axios.get(`/doctors/${licenseNumber}/appointments`);
  }
}

export default new DoctorService();
