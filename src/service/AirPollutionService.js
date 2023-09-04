import axios from "../axios-config";

class AirPollutionSerive {
  getPollution() {
    return axios.get(`/pollution`);
  }
}

export default new AirPollutionSerive();
