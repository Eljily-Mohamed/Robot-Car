import socket from "../models/socketInit";

const initializeSocket = (setSpeedMotor1, setSpeedMotor2, setHasConnection) => {
  const fetchData = (data) => {
    const [speed1, speed2] = data.toString().split(':')[1].split(',').map(Number);
    setSpeedMotor1((prevData) => [...prevData, speed1]);
    setSpeedMotor2((prevData) => [...prevData, speed2]);
    setHasConnection(true);
  };

  const handleDisconnect = () => {
    setHasConnection(false);
  };

  socket.on("serialData", fetchData);
  socket.on("disconnect", handleDisconnect);
};

const cleanupSocket = () => {
  socket.off("serialData");
  socket.off("disconnect");
};

export default {
  initializeSocket,
  cleanupSocket,
};