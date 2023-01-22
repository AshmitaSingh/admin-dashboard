import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { DateRangePicker } from "react-date-range";
import "../../styles/DisplayData.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

function getChurnRates(params) {
  let result = `A: ${params.row.churnPlatform.and},
  I: ${params.row.churnPlatform.ios}`;
  return result;
}

function getAppsInstalled(params) {
  let result = `A: ${params.row.installedPlatform.and},
  I: ${params.row.installedPlatform.ios}`;
  return result;
}

function getAppsUninstalled(params) {
  let result = `A: ${params.row.uninstalledPlatform.and}, I: ${params.row.uninstalledPlatform.ios}`;
  return result;
}


const columns = [
  { field: "date", headerName: "Date", type: "date", width: 150 },
  {
    field: "dayInstalls",
    headerName: "Day Installs",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "installedPlatform",
    headerName: "Platform",
    type: "number",
    width: 150,
    editable: true,
    valueGetter: getAppsInstalled
  },
  {
    field: "dayUninstalls",
    headerName: "Day Uninstalls",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "uninstalledPlatform",
    headerName: "Platform",
    type: "number",
    width: 150,
    editable: true,
    valueGetter: getAppsUninstalled
  },
  {
    field: "churnRate",
    headerName: "Churn Rate",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "churnPlatform",
    headerName: "Churn Platform",
    width: 150,
    editable: true,
    valueGetter: getChurnRates,
  },
];

function DisplayData() {
  const [tableData, setTableData] = useState([]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleCancel = () => {
    setShowCalendar(false);
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-06-01&todate=2022-07-01"
    );

    setTableData(data.data.data);
    return tableData;
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(tableData);
  // array of objects
  const newTableData = tableData.map((i) => {
    let date = new Date(i.created_At);
    const rowData = {
      date: date.toDateString().replace(/^\S+\s/, ""),
      dayInstalls: i.totalinstall,
      installedPlatform: {
        and: i.android_install,
        ios: i.ios_install
      },
      dayUninstalls: i.totaluninstall,
      uninstalledPlatform: {
        and: i.android_uninstall,
        ios: i.ios_uninstall
      },
      churnRate: i.totalchurn + "%",
      churnPlatform: {
        and: i.android_churn + "%",
        ios: i.ios_churn + "%",
      },
    };
    return rowData;
  });

  return (
    <div className="table">
      <Box sx={{ height: 380, width: "100%", backgroundColor: "#283046", position: "relative" }}>
        {/* Top-bar */}
        <div className="headers">
          <div className="data-range">
            <label htmlFor="range">Show</label>
            <select
              name="range"
              id="range"
              defaultValue="50"
              onChange={handleRowsPerPage}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
            <span>Entries</span>
          </div>
          <button className="duration" onClick={() => setShowCalendar(true)}>
            Select Duration
          </button>
        </div>
        {/* Calendar */}
        {showCalendar && (
          <div className="date-range">
            <DateRangePicker
              className="datepicker-popper"
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#625BC9"]}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              onChange={handleSelect}
            />
            <div className="buttons">
              <button onClick={() => {}} className="apply-button">
                Apply
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Table with data */}
        <DataGrid
          getRowId={() => uuidv4()}
          rows={newTableData}
          columns={columns}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          style={{
            color: "white",
            backgroundColor: "#283046",
            border: "none",
            fontSize: 12,
            outline: "none",
            marginBottom: 20
          }}
        />
      </Box>
    </div>
  );
}

export default DisplayData;
