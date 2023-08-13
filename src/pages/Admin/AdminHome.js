import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Paper, Typography } from "@mui/material";
import dayjs from "dayjs";

const COLORS = [
  "#EC6940",
  "#2B82B4",
  "#A2D59F",
  "#F4A761",
  "#8ED1E6",
  "#AADEA7",
  "#EA5B5C",
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    amount,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: "20px" }}
      >
        {payload.category}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={4} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Số lượng ${amount}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Tỉ lệ ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const AdminHome = () => {
  const [data, setData] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dayStart, setDayStart] = useState(new Date("2023-08-01"));
  const [dayEnd, setDayEnd] = useState(new Date("2023-08-06"));
  const [processDate, setProcessDate] = useState();
  const [amount, setAmount] = useState([
    { category: "Đơn bị hủy", amount: 0 },
    { category: "Đơn hoàn thành", amount: 0 },
    { category: "Thu nhập", amount: 0 },
    { category: "Nhân viên", amount: 0 },
  ]);

  const onPieEnter = (event, index) => {
    setActiveIndex(index);
  };

  const formatDayStart = (dayStart) => {
    let tmp = dayStart.split("-");
    let dayInNum = Number.parseInt(tmp[2]) + 1;
    return `${tmp[0]}-${tmp[1]}-0${dayInNum}`;
  };
  const dateToRange = formatDayStart(dayStart.toISOString().split("T")[0]);
  useEffect(() => {
    if (dayStart !== undefined && dayEnd !== undefined) {
      const nextDayStart = new Date(dayStart);
      nextDayStart.setDate(nextDayStart.getDate() + 1);
      const nextDayEnd = new Date(dayEnd);
      nextDayEnd.setDate(nextDayEnd.getDate() + 1);
      let formattedStartDate = nextDayStart.toISOString().split("T")[0];
      let formattedEndDate = nextDayEnd.toISOString().split("T")[0];
      let dateReq = {
        dateStart: formattedStartDate,
        dateEnd: formattedEndDate,
      };
      setProcessDate(dateReq);
    }
  }, [dayStart, dayEnd]);

  useEffect(() => {
    async function processData() {
      const token = sessionStorage.getItem("jwtToken");
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(apiUrl + "admin/amount", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(processDate),
      });
      if (!res.ok) {
        // throw new Error("error");
      } else {
        const fetchedData = await res.json();
        let tmp = [];
        for (let i = 5; i < fetchedData.length; i++) {
          tmp.push(fetchedData[i]);
        }
        setData(tmp);
        tmp = [];
        for (let i = 0; i < 4; i++) {
          tmp.push(fetchedData[i]);
        }
        setAmount(tmp);
      }
    }
    if (dayStart !== undefined && dayEnd !== undefined) {
      processData();
    }
  }, [processDate]);

  const serviceShortener = (service) => {
    let serviceName = service.split(" ");
    let formattedService = "";
    for (let i = 0; i < serviceName.length; i++) {
      formattedService =
        formattedService + serviceName[i].split("")[0].toUpperCase();
    }
    return formattedService;
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          style={{
            display: "flex",
            width: "95%",
            justifyContent: "space-between",
            padding: "0 2vw 0 0",
          }}
        >
          {amount &&
            amount.map((item) => {
              return (
                <Paper
                  style={{
                    display: "flex",
                    width: "13vw",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                  }}
                  key={Math.random()}
                >
                  <Typography
                    sx={{
                      fontSize: "17px",
                      opacity: "70%",
                      padding: "0",
                    }}
                  >
                    {item.category}
                  </Typography>
                  <Typography sx={{ fontSize: "20px" }}>
                    {item.category === "Thu nhập"
                      ? item.amount.toLocaleString() + " VNĐ"
                      : item.amount}
                  </Typography>
                </Paper>
              );
            })}
        </div>
      </div>
      <div
        className="container d-flex mt-5"
        style={{ height: "60vh", justifyContent: "space-between" }}
      >
        <div className="col-md-6">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày bắt đầu"
                format="DD/MM/YYYY"
                value={dayStart.$d}
                onChange={(date) => setDayStart(date)}
                sx={{ marginRight: 7 }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày kết thúc"
                format="DD/MM/YYYY"
                value={dayEnd.$d}
                onChange={(date) => setDayEnd(date)}
                minDate={dayjs(dateToRange)}
              />
            </LocalizationProvider>
          </div>
          <ResponsiveContainer
            width="100%"
            height="100%"
            style={{ boxShadow: "none" }}
          >
            <PieChart width={400} height={400} sx={{ border: "none" }}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={110}
                outerRadius={140}
                dataKey="amount"
                onMouseEnter={onPieEnter}
              >
                {data &&
                  data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div
          className="col-md-6 flex-column"
          style={{
            marginLeft: "3vw",
            height: "110%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ResponsiveContainer
            width="80%"
            height="45%"
            style={{ border: "none" }}
          >
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tickFormatter={serviceShortener} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" barSize={35}>
                {data &&
                  data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="80%" height="45%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                padding={{ left: 25 }}
                tickFormatter={serviceShortener}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2B82B4"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
