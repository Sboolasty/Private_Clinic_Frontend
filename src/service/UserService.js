import axios from "../axios-config";

class UserService {
  loginUser(user) {
    return axios.post("/login", user);
  }

  register(registerDto) {
    return axios.post("/registration", registerDto);
  }

  getScheduleByIdNumber(idNumber) {
    return axios.get(`/user/${idNumber}/appointments`);
  }
}

export default new UserService();
