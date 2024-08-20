# Robot Car Unicycle Project

## Table of Contents
1. [Project Overview](#project-overview)
2. [Functionalities](#functionalities)
3. [Architecture](#architecture)
4. [Getting Started](#getting-started)
5. [Hardware Components](#hardware-components)
6. [Motor Testing](#motor-testing)
7. [Serial Communication](#serial-communication)
8. [Zigbee Wireless Communication](#zigbee-wireless-communication)
9. [Line Following Feature](#line-following-feature)
10. [Program Overview](#program-overview)
11. [Further Documentation](#further-documentation)
12. [Contact Information](#contact-information)

---

## Project Overview

The goal of this project is to assemble a set of components and program a microcontroller to design a remotely controlled robot car that can also autonomously follow a line.

### Source Project
- **Source Code and Workspace**: `WORKSPACE_F411_DXL_STM32CUBEIDE.zip`

## Functionalities

📋 The main functionalities of this project include:

- **Movement Control**: The robot car can be controlled remotely.
- **Real-Time Position Display**: The position of the robot is displayed in real-time.

## Architecture

🏗️ The architecture of this project is built upon several core components:

1. **STM32 Platform**: The hardware platform on which the robot car unicycle is built.
2. **Zigbee Communication**: Wireless communication is established between the user interface (UI) and the robot using Zigbee modules.
3. **Node.js, Electron.js, and Socket.io**: These technologies are used to develop the user interface and facilitate efficient communication with the robot via the Zigbee connection.

## Getting Started

To get started with this project, follow the steps below:

1. **Download the Source Code**: Obtain the project workspace `WORKSPACE_F411_DXL_STM32CUBEIDE.zip`.
2. **Set Up the Environment**:
   - Install [STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html).
   - Install Node.js, Electron.js, and Socket.io for the user interface.
3. **Connect the Hardware**: Refer to the [Hardware Components](#hardware-components) section to assemble your robot.
4. **Program the Microcontroller**: Flash the code to the STM32 microcontroller using STM32CubeIDE.
5. **Test Communication**: Test both wired (UART) and wireless (Zigbee) communication.
6. **Run the UI**: Launch the Electron-based user interface to control the robot and monitor its position in real-time.

## Hardware Components

Below is a list of hardware components used in this project:

- **2 Robotis Wheels**
- **3 Robotis Assembly Plates**
- **1 Seeed Studio Base Shield**
- **1 Dynamixel Shield**
- **1 X-Bee Shield**
- **1 USB XBEE Socket**
- **2 XBEE Modules (XB24 or XBPRO)**
- **1 Robotis Ball (TB3 Ball Caster)**
- **1 U2D2 Power Hub Board Robotis**
- **2 Grove Line Finder**
- **1 Nucleo F411 Board**
- **2 Dynamixel XL430 Servo Motors**
- **1 Battery Charger**
- **1 Conrad 9.6V Battery**
- **3 Robotis Cables**

## Motor Testing

The Dynamixel servomotors consist of:

- A DC motor
- A DC-DC converter
- A position/speed sensor
- An STM32F103 microcontroller

Communication with the Nucleo F411 board is established via an RS232 connection. The UART6 peripheral on the Nucleo F411 is used for this purpose.

Follow the instructions in the Dynamixel tutorial for wiring and verify that the motors are functioning properly.

## Serial Communication

### Receiving Characters via ST-Link

By default, the UART2 peripheral is used for sending and receiving characters via the USB cable (ST-Link). When a character is received, an interrupt is triggered, invoking the `HAL_UART_RxCpltCallback` function in `src/dev/drv_uart.c`. The `rec_buf2` buffer is updated accordingly.

Test this by setting a breakpoint in the callback function and sending a character from a terminal (e.g., gtkterm or minicom).

## Zigbee Wireless Communication

Zigbee is a low-speed, short-range, low-power communication protocol. In this project, Zigbee is used for point-to-point wireless communication between the robot and the PC.

### Setup

1. Connect a Zigbee module to your PC via the USB socket (`/dev/ttyUSB0`).
2. Use the Seeed Studio XBEE Shield to connect the Zigbee module to the Nucleo board.

Refer to the XBEE Shield documentation for jumper settings to connect the RX and TX pins of the Zigbee module to PA9 (UART1_TX) and PB3 (UART1_RX) on the microcontroller.

**Important**: Have your setup verified by an instructor before powering it on.

### Control via Zigbee

Modify the program to control the motors based on characters received through the Zigbee connection.

## Line Following Feature

The Grove line finder sensor provides binary information to detect the presence of a black line. On the microcontroller, this sensor's input is treated as a logic input, similar to a push button.

## Program Overview

When you launch the program on the STM32Cube, you can control the robot using a serial terminal such as Minicom. The commands allow you to move the robot in different directions and adjust its speed.

### Commands
- **Movement Commands**:
  - `u`: Move Up
  - `l`: Move Left
  - `b`: Move Back
  - `d`: Move Down

- **Speed Control**:
  - To move in a direction with a specific speed: `<direction>,<speed>`
    - Example: `l,100` (Move Left with speed 100)
  - To change speed without changing direction: `v,<speed>`
    - Example: `v,150` (Change speed to 150 while maintaining the current direction)

## Further Documentation

For more details, visit the [project's documentation page](https://web.enib.fr/~kerhoas/automatique-robotique/conception-robotique/).

## Contact Information

For any questions or assistance, feel free to contact the project contributors or your instructor.

---
