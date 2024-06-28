import React, { useState, useEffect } from 'react';
import socket from "../models/socketInit";
import LineChart from '../components/LineChart';

const LineDetectionView = () => {
  const [speedMotor1, setSpeedMotor1] = useState([]);
  const [speedMotor2, setSpeedMotor2] = useState([]);
  const [isDetected, setIsDetected] = useState(false);
  const [hasConnection, setHasConnection] = useState(false);
  const [selectedOption, setSelectedOption] = useState("detectedLine");
  const [target, setTarget] = useState("");
  const [positionActuelle, setPositionActuelle] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  useEffect(() => {
    const fetchData = (data) => {
      const [speed1, speed2] = data.toString().split(':')[1].split(',').map(Number);
      setSpeedMotor1((prevData) => [...prevData, speed1]);
      setSpeedMotor2((prevData) => [...prevData, speed2]);
      if (!hasConnection) {
        setHasConnection(true);
      }
    };

    const handleDisconnect = () => {
      setHasConnection(false);
    };

    socket.on("serialData", fetchData);
    socket.on("disconnect", handleDisconnect);

    // Load map data from JSON file
    fetch(`${process.env.PUBLIC_URL}/recorded_steps.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMapData(data))
      .catch((error) => console.error("Error loading map data:", error));

    // Cleanup function
    return () => {
      socket.off("serialData", fetchData);
      socket.off("disconnect", handleDisconnect);
    };
  }, [hasConnection]);

  useEffect(() => {
    const sendAction = (action) => {
      console.log(action);
      socket.emit("message", `${action.action},${action.speed}e`);
    };
    const executeActions = async () => {
      if (isStarted && selectedOption === "mapFinder" && currentActionIndex < mapData.length) {
        const currentMap = mapData.find(
          (map) =>
            map.target === target && map.positionActuelle === positionActuelle
        );
    
        if (currentMap) {
          for (let i = 0; i < currentMap.actions.length; i++) {
            sendAction(currentMap.actions[i]);
            setCurrentActionIndex(i);
    
            // Check if the next action exists and has a duration
            if (currentMap.actions[i + 1] && currentMap.actions[i + 1].duration !== undefined) {
              await new Promise((resolve) => setTimeout(resolve, currentMap.actions[i + 1].duration));
            }
          }
        }
      }
    };
    
    executeActions();
  }, [isStarted, currentActionIndex, mapData, target, positionActuelle, selectedOption]);

  const handleStart = () => {
    setIsStarted(true);
    setCurrentActionIndex(0);
    //socket.emit("m,0e");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Control</h1>
      <div className="mb-4 flex">
        <button
          className={`px-4 py-2 mr-4 ${selectedOption === "detectedLine" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded`}
          onClick={() => setSelectedOption("detectedLine")}
        >
          Detected Line
        </button>
        <button
          className={`px-4 py-2 ${selectedOption === "mapFinder" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded`}
          onClick={() => setSelectedOption("mapFinder")}
        >
          Map Finder
        </button>
      </div>
      {selectedOption === "mapFinder" && (
        <div className="mt-8 flex justify-center items-center w-full max-w-md">
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border p-2 rounded mr-2 w-1/3"
            placeholder="Target"
          />
          <input
            type="text"
            value={positionActuelle}
            onChange={(e) => setPositionActuelle(e.target.value)}
            className="border p-2 rounded mr-2 w-1/3"
            placeholder="Position Actuelle"
          />
          <button
            onClick={handleStart}
            className="px-4 py-2 w-1/3 text-lg bg-green-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-700"
          >
            Start
          </button>
        </div>
      )}
      {/* {isStarted && (
        <LineChart speed1={speedMotor1} speed2={speedMotor2} />
      )} */}
    </div>
  );
};

export default LineDetectionView;
