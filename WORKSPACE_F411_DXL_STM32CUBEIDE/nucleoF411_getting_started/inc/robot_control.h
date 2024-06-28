/*
 * robot_control.h
 *
 *  Created on: Apr 29, 2024
 *      Author: eljily
 */

#ifndef INC_ROBOT_CONTROL_H_
#define INC_ROBOT_CONTROL_H_

#include "dynamixel.h"

// Enumération pour définir les états du robot
typedef enum {
    MOVING_FORWARD,
    MOVING_BACKWARD,
    TURNING_LEFT,
    TURNING_RIGHT,
    STOPPED
} RobotState;

void move_up(int velocity);
void move_down(int velocity);
void move_left(int velocity);
void move_right(int velocity);
void stop_robot(int velocity);
void detect_line();

#endif /* INC_ROBOT_CONTROL_H_ */
