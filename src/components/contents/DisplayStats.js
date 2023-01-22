import React, { useState, useEffect } from "react";
import "../../styles/DisplayStats.css";
import {
  FileDownloadOutlined,
  FileDownloadOffOutlined,
  CheckCircleOutlined,
  GroupsOutlined,
  TimelineOutlined,
  MultilineChartOutlined
} from "@mui/icons-material";
import axios from "axios";

function DisplayStats() {
  const [statsData, setStatsData] = useState({});

  // Fetching Stat's data
  const fetchStatsData = async () => {
    const { data } = await axios.get(
      "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=2022-07-01&todate=2022-07-14"
    );
    // console.log('Stats Data: ',data.data);
    setStatsData(data.data);
    return statsData;
  };

  useEffect(() => {
    fetchStatsData();
  }, []);

  return (
    <div className="main">
      <div className="stat">
        <span className="icons">
          <FileDownloadOutlined />
        </span>
        <div className="stats-data">
          <span>{statsData.totalInstall}</span>
          <span>App Installed</span>
        </div>
      </div>
      <div className="stat">
        <span className="icons">
          <CheckCircleOutlined />
        </span>
        <div className="stats-data">
          <span>{statsData.activeinstall}</span>
          <span>Active Installs</span>
        </div>
      </div>
      <div className="stat">
        <span className="icons">
          <TimelineOutlined />
        </span>
        <div className="stats-data">
          <span>{statsData.churn}</span>
          <span>Churn Rate</span>
        </div>
      </div>
      <div className="stat">
        <span className="icons">
          <FileDownloadOffOutlined />
        </span>
        <div className="stats-data">
          <span>{statsData.totaluninstall}</span>
          <span>App Un-Installed</span>
        </div>
      </div>
      <div className="stat">
        <span className="icons">
          <GroupsOutlined />
        </span>
        <div className="stats-data">
          <span>{statsData.aliveappusers}</span>
          <span>Alive Apps users</span>
        </div>
      </div>
      <div className="stat">
        <span className="icons">
          <MultilineChartOutlined />
        </span>
        <div className="stats-data">
          <span>{statsData.alivechurn}</span>
          <span>Active Churn Rate</span>
        </div>
      </div>
    </div>
  );
}

export default DisplayStats;
