import React, { useState, useEffect } from 'react';
import socket from "../models/socketInit";

const ControlPanelView = () => {
    const [currentSpeed, setCurrentSpeed] = useState(100);
    const [message, setMessage] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [target, setTarget] = useState("");
    const [positionActuelle, setPositionActuelle] = useState("");
    const [recordedSteps, setRecordedSteps] = useState([]);
    const [recordStartTime, setRecordStartTime] = useState(null);
    const [hasConnection, setHasConnection] = useState(true);

    useEffect(() => {
        if (socket && message) {
            if (message === "s") {
                setCurrentSpeed(0); // Set current speed to 0 if message is "stop"
            }
            socket.emit("message", `${message},${currentSpeed}e`);
        }

        const handleDisconnect = () => {
            setHasConnection(false);
        };

        socket.on("disconnect", handleDisconnect);

        // Cleanup function
        return () => {
            socket.off("disconnect", handleDisconnect);
        };
    }, [message, currentSpeed]);

    useEffect(() => {
        if (isRecording && message) {
            if(message === "s")
                addRecordedStep(message, 0);
            else
            addRecordedStep(message, currentSpeed);
        }
    }, [message, isRecording]);

    const handleSpeedChange = (event) => {
        const newSpeed = event.target.value;
        setCurrentSpeed(newSpeed);
        setMessage("v");
    };

    const handleRecordToggle = () => {
        if (!isRecording) {
            // Start recording logic
            setRecordedSteps(prevSteps => [
                ...prevSteps,
                {
                    target,
                    positionActuelle,
                    actions: []
                }
            ]);
            setRecordStartTime(Date.now());
        } else {
            // Stop recording logic
            console.log("Recorded steps:", recordedSteps);
            saveStepsToFile(recordedSteps);
            setRecordStartTime(null);
        }
        setIsRecording((prev) => !prev);
    };

    const addRecordedStep = (action, value) => {
        const currentTime = Date.now();
        console.log(currentTime);
        const duration = recordStartTime ? currentTime - recordStartTime : 0;
        console.log(duration);
        setRecordedSteps(prevSteps => {
            const updatedSteps = [...prevSteps];
            const latestEntry = updatedSteps[updatedSteps.length - 1];
    
            if (latestEntry) {
                const lastAction = latestEntry.actions[latestEntry.actions.length - 1];
                // Check if the latest action is different from the current action
                if (!lastAction || lastAction.action !== action || lastAction.speed !== value) {
                    latestEntry.actions.push({
                        action,
                        speed: value,
                        duration,
                    });
                }
            }
    
            return updatedSteps;
        });
    
        setRecordStartTime(currentTime);
    };
    

    const saveStepsToFile = (steps) => {
        // Convert steps to JSON string
        const stepsJson = JSON.stringify(steps, null, 2);
        // Create a new Blob object with JSON string
        const blob = new Blob([stepsJson], { type: "application/json" });
        // Create a link element
        const link = document.createElement("a");
        // Set the href attribute of the link to the Blob object
        link.href = URL.createObjectURL(blob);
        // Set the download attribute of the link
        link.download = "recorded_steps.json";
        // Append the link to the body
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.click();
        // Remove the link from the body
        document.body.removeChild(link);
    };

    return (
        <div className="flex items-center justify-center min-h-screen ml-[100px]">
            <div className="w-11/12 max-w-4xl border-2 border-white p-5 rounded-lg flex flex-col items-center bg-white shadow-lg">
                <div id="currentSpeed" className="text-xl font-semibold mb-4 uppercase text-shadow-10">
                    Current Speed: {currentSpeed}
                </div>
                <div className="flex flex-col items-center mb-4">
                <div className="flex justify-center m-2">
                    <button id="upBtn" className="px-4 py-2 m-1 w-32 text-lg bg-blue-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-700" onClick={() => setMessage("u")}>
                        &#8593;
                    </button>
                </div>
                <div className="flex justify-center m-2">
                    <button id="leftBtn" className="px-4 py-2 m-1 w-32 text-lg bg-blue-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-700" onClick={() => setMessage("l")}>
                        &#8592;
                    </button>
                    <button id="stopBtn" className="px-4 py-2 m-1 w-32 text-lg bg-red-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-700" onClick={() => setMessage("s")}>
                        Stop
                    </button>
                    <button id="rightBtn" className="px-4 py-2 m-1 w-32 text-lg bg-blue-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-700" onClick={() => setMessage("r")}>
                        &#8594;
                    </button>
                </div>
                <div className="flex justify-center m-2">
                    <button id="downBtn" className="px-4 py-2 m-1 w-32 text-lg bg-blue-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-700" onClick={() => setMessage("d")}>
                        &#8595;
                    </button>
                </div>
                </div>
                <div className="mt-4 flex flex-col items-center">
                <label htmlFor="speedRange" className="mb-2 text-lg">Speed:</label>
                <input type="range" id="speedRange" className="w-full max-w-md mb-2" min="0" max="160" value={currentSpeed} step="10" onChange={handleSpeedChange} />
                <span id="speedValue" className="text-lg font-semibold">{currentSpeed}</span>
            </div>
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
                        onClick={handleRecordToggle}
                        className={`px-4 py-2 w-1/3 text-lg ${isRecording ? 'bg-red-600' : 'bg-green-600'} text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-700`}
                    >
                        {isRecording ? 'Stop Record' : 'Start Record'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ControlPanelView;
