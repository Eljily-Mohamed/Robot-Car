#include "communication_manager.h" // Include the communication manager header file
#include <stddef.h> // Include for NULL definition

static int vitess_send = 0;
static char last_command = '\0';

char process_command_data(uint8_t* buffer) {
    if (buffer != NULL) {
        char first_char = (char)buffer[0];
        // Check if the first character is 'v' command to change vitess
        if(first_char == 'v') {
            // Check if there is a previous command stored
            if(last_command != '\0') {
                return last_command; // Return the last command without change
            } else {
                return '\0'; // Return null character if there is no previous command
            }
        } else {
            last_command = (char)buffer[0]; // Store the new command
            return last_command; // Return the new command
        }
    }
    return '\0'; // Return null character if buffer is empty or for other conditions
}

int process_vitess_data(uint8_t* buffer) {
    if (buffer != NULL) {
        int i = 0; // Start from index 0
        vitess_send = 0; // Reset the vitess value
        // Process data until encountering null character ('\0')
        while (buffer[i] != '\0') {
            get_vitess(buffer[i]); // Process each character to calculate vitess
            i++; // Move to the next character
        }
    }
    return vitess_send; // Return the calculated vitess value
}

void get_vitess(char c) {
    // Logic to process character for vitess
    if (c >= '0' && c <= '9') {
        vitess_send = vitess_send * 10 + (c - '0'); // Convert character to integer and update vitess value
    }
}
