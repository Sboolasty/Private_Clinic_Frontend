import { useEffect, useState } from "react";
import AirPollutionService from "../service/AirPollutionService";

const AirPollution = () => {
  const [tableContent, setTableContent] = useState("");
  const color = (value) => {
    const style1 = {
      backgroundColor: "fff",
    };
    if (value < 20) style1.backgroundColor = "#57b108";
    else style1.backgroundColor = "#171108";

    console.log(style1);
    return style1;
  };

  useEffect(() => {
    AirPollutionService.getPollution().then((r) => {
      console.log(r.data);
      const pollution = r.data?.values?.map((p) => {
        return {
          ...p,
          color:
            p.value < 20
              ? "#57b108"
              : p.value < 50
              ? "#B0DD10"
              : p.value < 80
              ? "#FFD911"
              : p.value < 110
              ? "#E58100"
              : p.value < 150
              ? "#E50000"
              : "#990000",
        };
      });
      const content = pollution.map((obj) => {
        return (
          <tr style={{ backgroundColor: obj.color }} key={obj.date}>
            <td className="tg-0lax">{obj.date}</td>
            <td className="tg-0lax">{obj.value}</td>
          </tr>
        );
      });

      setTableContent(content);
    });
  }, []);

  return (
    <div className="pollution">
      <h2>PM10 dla Warszawy</h2>
      <table className="tg" id="pollution_table">
        <thead>
          <tr>
            <th className="tg-0lax">Data</th>
            <th className="tg-0lax">Wartość</th>
          </tr>
        </thead>
        <tbody>{tableContent !== "" ? tableContent : null}</tbody>
      </table>
    </div>
  );
};

export default AirPollution;
