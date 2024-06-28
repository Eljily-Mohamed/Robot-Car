################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (10.3-2021.10)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/SystemClock.c \
../src/communication_manager.c \
../src/dynamixel.c \
../src/main.c \
../src/robot_control.c \
../src/stm32f4xx_hal_msp.c \
../src/stm32f4xx_it.c \
../src/syscalls.c \
../src/system_stm32f4xx.c \
../src/tickTimer.c \
../src/util.c 

OBJS += \
./src/SystemClock.o \
./src/communication_manager.o \
./src/dynamixel.o \
./src/main.o \
./src/robot_control.o \
./src/stm32f4xx_hal_msp.o \
./src/stm32f4xx_it.o \
./src/syscalls.o \
./src/system_stm32f4xx.o \
./src/tickTimer.o \
./src/util.o 

C_DEPS += \
./src/SystemClock.d \
./src/communication_manager.d \
./src/dynamixel.d \
./src/main.d \
./src/robot_control.d \
./src/stm32f4xx_hal_msp.d \
./src/stm32f4xx_it.d \
./src/syscalls.d \
./src/system_stm32f4xx.d \
./src/tickTimer.d \
./src/util.d 


# Each subdirectory must supply rules for building sources it contributes
src/%.o src/%.su: ../src/%.c src/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -g3 -DSTM32 -DSTM32F4 -DSTM32F411RETx -DNUCLEO_F411RE -DDEBUG -DSTM32F411xE -DUSE_HAL_DRIVER -c -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/HAL_Driver/Inc/Legacy" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/Utilities/STM32F4xx-Nucleo" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/inc" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/CMSIS/device" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/CMSIS/core" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/HAL_Driver/Inc" -O0 -ffunction-sections -Wall -fcommon -fstack-usage -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

clean: clean-src

clean-src:
	-$(RM) ./src/SystemClock.d ./src/SystemClock.o ./src/SystemClock.su ./src/communication_manager.d ./src/communication_manager.o ./src/communication_manager.su ./src/dynamixel.d ./src/dynamixel.o ./src/dynamixel.su ./src/main.d ./src/main.o ./src/main.su ./src/robot_control.d ./src/robot_control.o ./src/robot_control.su ./src/stm32f4xx_hal_msp.d ./src/stm32f4xx_hal_msp.o ./src/stm32f4xx_hal_msp.su ./src/stm32f4xx_it.d ./src/stm32f4xx_it.o ./src/stm32f4xx_it.su ./src/syscalls.d ./src/syscalls.o ./src/syscalls.su ./src/system_stm32f4xx.d ./src/system_stm32f4xx.o ./src/system_stm32f4xx.su ./src/tickTimer.d ./src/tickTimer.o ./src/tickTimer.su ./src/util.d ./src/util.o ./src/util.su

.PHONY: clean-src

