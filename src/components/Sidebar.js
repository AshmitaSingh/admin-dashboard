import React from "react";
import "../styles/Sidebar.css";
import {
  DnsOutlined,
  PermIdentityOutlined,
  PersonAddAltOutlined,
  VideocamOutlined,
  ReportProblemOutlined,
  ReportOutlined,
  LayersOutlined,
  NotificationsNoneOutlined,
  QuizOutlined,
  AdjustOutlined,
} from "@mui/icons-material";
import logo from "../assets/wowtalent.png";

function Sidebar({ setClose }) {
  const handleClose = () => {
    setClose(true);
  };
  return (
    <div className="container">
      <div className="top-section">
        <div className="logo-title">
          <img className="logo" src={logo} alt="logo" />
          <span className="title">WOW</span>
        </div>
        <span className="close-icon" onClick={handleClose}>
          <AdjustOutlined />
        </span>
      </div>
      <div className="component-section">
        <div className="component selected-component">
          <span>
            <DnsOutlined />
          </span>
          <span className="sidebar-text"> Dashboard</span>
        </div>
        <div className="component">
          <span>
            <PermIdentityOutlined />
          </span>
          <span className="sidebar-text"> WOW Users</span>
        </div>
        <div className="component">
          <span>
            <VideocamOutlined />
          </span>
          <span className="sidebar-text"> Video Clips</span>
        </div>
        <div className="component">
          <span>
            <ReportProblemOutlined />
          </span>
          <span className="sidebar-text"> Reported Content</span>
        </div>
        <div className="component">
          <span>
            <LayersOutlined />
          </span>
          <span className="sidebar-text"> Category</span>
        </div>
        <div className="component">
          <span>
            <ReportOutlined />
          </span>
          <span className="sidebar-text"> Info Page</span>
        </div>
        <div className="component">
          <span>
            <QuizOutlined />
          </span>
          <span className="sidebar-text"> FAQ</span>
        </div>
        <div className="component">
          <span>
            <NotificationsNoneOutlined />
          </span>
          <span className="sidebar-text"> Push Notification</span>
        </div>
        <div className="component">
          <span>
            <PersonAddAltOutlined />
          </span>
          <span className="sidebar-text"> Internal User</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
