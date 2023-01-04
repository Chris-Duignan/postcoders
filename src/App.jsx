import { useEffect, useState } from "react";
import { getAreaData } from "./api";
import { Card } from "@mui/material";

import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState("");
  const [outcode, setOutcode] = useState("bb10");

  const load = async () => {
    try {
      const areaData = await getAreaData(outcode);

      setAreas(areaData);
    } catch (error) {
      window.alert("todo: fix app");
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOutcode(search);
  };

  useEffect(() => {
    load();
  }, [outcode]);

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter the outcode:{" "}
          <input
            type="text"
            value={search}
            name="search"
            onChange={handleChange}
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2>{`Areas for ${outcode}: ${areas.length}`}</h2>
      <ul className="card_list">
        {areas.map((area) => {
          return (
            <Card key={area["place name"]}>
              <h3>{area["place name"]}</h3>
              <h4>
                {area.state}, {area["state abbreviation"]}
              </h4>
              <p>
                <b>Latitude:</b> {area.latitude} <b> Longitude: </b>
                {area.longitude}
              </p>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
