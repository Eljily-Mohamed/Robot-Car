import React from 'react';
import logo from "../assets/enib.png"

const DashboardView = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="relative w-full bg-white rounded-lg shadow-lg p-10 h-fit-content">
        <div className="absolute top-4 left-4">
          <img src={logo} alt="Logo" className="h-16 w-18" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-6">Control Dashboard View</h1>
          <h2 className="text-2xl mb-8 text-center">
            This app is conceived by 3rd year students at ENIB: 
              CHOUBRI Douae, EL JILY Mohamed, BOUMLINE Zakaria and BELAIZI Asmae
            
          </h2>
          <div className="text-left w-full">
            <h1 className="text-3xl font-semibold mb-4">App Description:</h1>
            <p className="text-lg leading-relaxed mb-6">
              This app serves as a control dashboard for our robot. Users can control the robot's positions and speed
              through the buttons on the control panel. Additionally, users can record the robot's movements and positions 
              to replay and guide the robot along the same route using the map finder in the line detection module. 
              Equipped with two line detection sensors, the robot allows users to view a line chart displaying its speed 
              when this option is enabled.
            </p>
          </div>
          <h3 className="text-center text-2xl font-semibold text-green-600">ENJOY OUR APP</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
