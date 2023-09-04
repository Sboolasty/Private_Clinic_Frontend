import axios from "../axios-config";

class AvailabilityDateService {
  addAvailabilityDate(availabiltyDateDto) {
    return axios.post(`/doctors/addAvailability`, availabiltyDateDto);
  }
}

export default new AvailabilityDateService();
