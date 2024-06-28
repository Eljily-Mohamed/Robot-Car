import socket from "../models/socketInit";

const loadMapData = (setMapData) => {
  fetch(`${process.env.PUBLIC_URL}/recorded_steps.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => setMapData(data))
    .catch((error) => console.error("Error loading map data:", error));
};

const executeActions = async (
  isStarted,
  selectedOption,
  currentActionIndex,
  mapData,
  target,
  positionActuelle,
  setCurrentActionIndex
) => {
  const sendAction = (action) => {
    console.log(action);
    socket.emit("message", `${action.action},${action.speed}e`);
  };

  if (isStarted && selectedOption === "mapFinder" && currentActionIndex < mapData.length) {
    const currentMap = mapData.find(
      (map) =>
        map.target === target && map.positionActuelle === positionActuelle
    );

    if (currentMap) {
      for (let i = 0; i < currentMap.actions.length; i++) {
        sendAction(currentMap.actions[i]);
        setCurrentActionIndex(i);

        if (currentMap.actions[i + 1] && currentMap.actions[i + 1].duration !== undefined) {
          await new Promise((resolve) => setTimeout(resolve, currentMap.actions[i + 1].duration));
        }
      }
    }
  }
};

export default {
  loadMapData,
  executeActions,
};
