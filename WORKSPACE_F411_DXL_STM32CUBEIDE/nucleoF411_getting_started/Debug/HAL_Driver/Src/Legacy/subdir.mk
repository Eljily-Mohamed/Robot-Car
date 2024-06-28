################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (10.3-2021.10)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../HAL_Driver/Src/Legacy/stm32f4xx_hal_can.c 

OBJS += \
./HAL_Driver/Src/Legacy/stm32f4xx_hal_can.o 

C_DEPS += \
./HAL_Driver/Src/Legacy/stm32f4xx_hal_can.d 


# Each subdirectory must supply rules for building sources it contributes
HAL_Driver/Src/Legacy/%.o HAL_Driver/Src/Legacy/%.su: ../HAL_Driver/Src/Legacy/%.c HAL_Driver/Src/Legacy/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -g3 -DSTM32 -DSTM32F4 -DSTM32F411RETx -DNUCLEO_F411RE -DDEBUG -DSTM32F411xE -DUSE_HAL_DRIVER -c -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/HAL_Driver/Inc/Legacy" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/Utilities/STM32F4xx-Nucleo" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/inc" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/CMSIS/device" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/CMSIS/core" -I"/home/e2023/m3eljily/Bureau/projet_robot_s6o/WORKSPACE_F411_DXL_STM32CUBEIDE/nucleoF411_getting_started/HAL_Driver/Inc" -O0 -ffunction-sections -Wall -fcommon -fstack-usage -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

clean: clean-HAL_Driver-2f-Src-2f-Legacy

clean-HAL_Driver-2f-Src-2f-Legacy:
	-$(RM) ./HAL_Driver/Src/Legacy/stm32f4xx_hal_can.d ./HAL_Driver/Src/Legacy/stm32f4xx_hal_can.o ./HAL_Driver/Src/Legacy/stm32f4xx_hal_can.su

.PHONY: clean-HAL_Driver-2f-Src-2f-Legacy

