import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import NavbarWriter from "./writernavbar/NavbarWriter";
import FooterDirector from "./writernavbar/Footerwriter";

const AnalyticsComponent = () => {
  const [scripts, setScripts] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await axios.get("/api/v1/allviewersviewer");
        setScripts(response.data.scripts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchScripts();
  }, []);

  const filterData = () => {
    if (selectedMovie === "") {
      return scripts;
    } else {
      return scripts.filter((script) => script.movieName === selectedMovie);
    }
  };

  const series = [
    {
      name: "Directors Purchased",
      data: filterData().map((script) => ({
        x: script.movieName,
        y: script.DirectorsPurchased,
      })),
    },
    {
      name: "Added To Favorites",
      data: filterData().map((script) => ({
        x: script.movieName,
        y: script.AddedToFavourites,
      })),
    },
    {
      name: "Viewers Count",
      data: filterData().map((script) => ({
        x: script.movieName,
        y: script.viewersCount,
      })),
    },
  ];

  const options = {
    chart: {
      height: 500,
      type: "line",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: filterData().map((script) => script.movieName),
      labels: {
        style: {
          colors: "#495057",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#495057",
          fontSize: "12px",
        },
      },
    },
    colors: ["#FF4560", "#775DD0", "#3498DB"],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FFA8A8", "#D5A8FF", "#A8C3FF"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
      },
    },
  };

  return (
    <>
      <div>
        <NavbarWriter />
      </div>
      <br />
      <div style={{ textAlign: "center", margin: "7rem" }}>
        <Typography variant="h4" gutterBottom style={{ color: "#212529" }}>
          Scripts Analytics
        </Typography>
        <FormControl style={{ margin: "2rem" }}>
          <InputLabel id="movie-selector-label" style={{ color: "#212529" }}>
            Select Movie
          </InputLabel>
          <Select
            labelId="movie-selector-label"
            id="movie-selector"
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            label="Select Movie"
            style={{ width: "200px" }}
          >
            <MenuItem value="">
              <em>All Movies</em>
            </MenuItem>
            {scripts.map((script, index) => (
              <MenuItem key={index} value={script.movieName}>
                {script.movieName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ width: "80%", margin: "auto" }}>
          <Chart options={options} series={series} type="line" height={500} />
        </div>{" "}
        <br />
      </div>
      <div style={{ marginTop: "210px" }}>
        <FooterDirector />
      </div>
    </>
  );
};

export default AnalyticsComponent;
