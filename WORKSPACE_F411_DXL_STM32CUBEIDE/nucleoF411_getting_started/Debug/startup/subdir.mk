################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (10.3-2021.10)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
S_SRCS += \
../startup/startup_stm32f411xe.s 

OBJS += \
./startup/startup_stm32f411xe.o 

S_DEPS += \
./startup/startup_stm32f411xe.d 


# Each subdirectory must supply rules for building sources it contributes
startup/%.o: ../startup/%.s startup/subdir.mk
	arm-none-eabi-gcc -mcpu=cortex-m4 -g3 -c -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/HAL_Driver/Inc/Legacy" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/Utilities/STM32F4xx-Nucleo" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/inc" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/CMSIS/device" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/CMSIS/core" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/HAL_Driver/Inc" -x assembler-with-cpp -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@" "$<"

clean: clean-startup

clean-startup:
	-$(RM) ./startup/startup_stm32f411xe.d ./startup/startup_stm32f411xe.o

.PHONY: clean-startup

