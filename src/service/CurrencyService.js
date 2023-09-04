import axios from "../axios-config";

class CurrencyService {
  getCurrencyRates() {
    return axios.get(`/currencies`);
  }
}

export default new CurrencyService();
