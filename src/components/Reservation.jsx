import { useContext, useEffect, useState } from "react";
import AsyncSelect from "react-select";
import { StoreContext } from "../store/storeProvider";
import DoctorService from "../service/DoctorService";
import AppointmentService from "../service/AppointmentService";
import CurrencyService from "../service/CurrencyService";

const Reservation = () => {
  const { user } = useContext(StoreContext);

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescripton] = useState("");
  const [doctorLables, setDoctorLabels] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);

  const [price, setPrice] = useState(150);
  const [currencyValues, setCurrencyValues] = useState([]);
  // const alert = useAlert();

  const [selected, setSelected] = useState();

  const handleSelectChange = (event) => {
    const currency = event.target.value;
    console.log(currency);
    if (currency === "PLN") {
      setPrice(150);
    } else {
      const rate = currencyValues.find((c) => c.code === currency).mid;
      setSelected(currency);
      if (rate) setPrice((150 / rate).toFixed(2));
      else setPrice(150);
    }
  };

  const handleDoctorChange = (newValue) => {
    setDoctor(newValue.value);

    DoctorService.getAvaialbilityDatesByDoctor(newValue.value.idDoctor).then(
      (r) => {
        const filtered = r.data?.filter((date) => date.free);

        console.log(filtered);
        const a = filtered.map((date) => ({
          value: date,
          label: new Date(date.date).toLocaleString().slice(0, -3),
        }));

        setDateLabels(a);
      }
    );
  };

  const handleDateChange = (newValue) => {
    console.log(newValue);
    setDate(newValue.value);
  };

  const handleDescriptionChange = (e) => {
    setDescripton(e.currentTarget.value);
  };

  const handleReserveSubmit = (e) => {
    e.preventDefault();

    const reserveAppointmentDto = {
      patientDto: {
        idNumber: user.idNumber,
      },
      doctorDto: {
        licenseNumber: doctor.licenseNumber,
      },
      date: date.date,
      duration: 30,
      description,
    };

    AppointmentService.reserveAppointment(reserveAppointmentDto).then((r) => {
      console.log(r);
      for (const [key, value] of Object.entries(r.data)) {
        if (value === null) {
          return alert("Nie udało się zarezerwować wizyty");
        }
      }
      return alert("Wizyta zarezerwowana!");
    });
  };

  useEffect(() => {
    DoctorService.getAllDoctors().then((r) => {
      console.log(r.data);

      const temp = r.data?.map((doctor) => ({
        value: doctor,
        label: `${doctor.user.firstName} ${doctor.user.lastName}`,
      }));

      setDoctorLabels(temp);

      CurrencyService.getCurrencyRates().then((r) => {
        setCurrencyValues(r.data);
      });
    });
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Rezerwacja wizyty</h2>
      <form
        className="reserve__form"
        id="reserve-form"
        onSubmit={handleReserveSubmit}
      >
        <div className="reserve__row">
          <AsyncSelect
            onChange={handleDoctorChange}
            options={doctorLables}
            className="reserve__select"
            placeholder="Wybierz lekarza..."
            id="react-select-5-option-1"
          />
          <AsyncSelect
            className="reserve__select"
            isDisabled={!doctor}
            placeholder="Wybierz termin..."
            onChange={handleDateChange}
            options={dateLabels}
          />
        </div>
        <div className="reserve__row">
          <textarea
            cols="30"
            rows="10"
            placeholder="Przyczyna wizyty..."
            maxLength={100}
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="reserve__row">
          <p>
            Koszt wizyty: {price}
            <select
              style={{ display: "inline" }}
              name="currency"
              id="currency"
              onChange={handleSelectChange}
            >
              <option selected value="PLN">
                PLN
              </option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="CHF">CHF</option>
            </select>
          </p>
        </div>
        <div className="reserve__row">
          <button type="submit" className="reserve__btn">
            Zarezerwuj
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reservation;
