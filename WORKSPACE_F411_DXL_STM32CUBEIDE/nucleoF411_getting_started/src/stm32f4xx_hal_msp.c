#include "stm32f4xx_hal_msp.h"

#define USART2_IRQ_PRIO	9
#define USART6_IRQ_PRIO	10
#define USART1_IRQ_PRIO	8
#define EXTI1_IRQ_PRIO	7
#define EXTI0_IRQ_PRIO	6
#define EXTI15_10_IRQ_PRIO	5
#define I2C1_ER_IRQ_PRIO	2
#define I2C1_EV_IRQ_PRIO	11
#define TIM5_IRQ_PRIO		12


void HAL_GPIO_DYN_wrEn_MspInit(void);
void HAL_UARTCOM_MspInit(void);
void HAL_UART1_MspInit(void);
void HAL_UARTDYN_MspInit(void);
void HAL_GPIO_LINE_MspInit(void);


void HAL_MspInit(void)
{

	  __GPIOA_CLK_ENABLE();
	  __GPIOB_CLK_ENABLE();
	  __GPIOC_CLK_ENABLE();

	  HAL_UARTCOM_MspInit();   // UART2
	  HAL_UARTDYN_MspInit();   // UART6
	  HAL_UART1_MspInit();     // UART1

	  HAL_tickTimer_MspInit();

	  HAL_GPIO_LINE_MspInit();
	//  HAL_GPIO_LED_MspInit();
	//  HAL_GPIO_BUTTON_MspInit();
	//  HAL_i2c_MspInit();
	//  HAL_spi_MspInit();
	//  HAL_adcir_MspInit();
	  HAL_GPIO_DYN_wrEn_MspInit();
}

/*****************************************************************/

void HAL_GPIO_DYN_wrEn_MspInit(void)
{
	  GPIO_InitTypeDef  GPIO_InitStruct;


	  GPIO_InitStruct.Pin = GPIO_PIN_10;
	  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	  GPIO_InitStruct.Pull = GPIO_PULLUP;
	  GPIO_InitStruct.Speed = GPIO_SPEED_FAST;

	  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
}
/******************************************************************
			USART2 : ST-LINK virtual Port
 TX --> PA2
 RX --> PA3
*******************************************************************/
void HAL_UARTCOM_MspInit(void)
{
  GPIO_InitTypeDef  GPIO_InitStruct;

  __GPIOA_CLK_ENABLE();

  __USART2_CLK_ENABLE();

  GPIO_InitStruct.Pin       = GPIO_PIN_2 | GPIO_PIN_3;
  GPIO_InitStruct.Mode      = GPIO_MODE_AF_PP;
  GPIO_InitStruct.Pull      = GPIO_PULLUP;
  GPIO_InitStruct.Speed     = GPIO_SPEED_LOW;	//GPIO_SPEED_FAST;
  GPIO_InitStruct.Alternate =  GPIO_AF7_USART2;

  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

  HAL_NVIC_SetPriority(USART2_IRQn, USART2_IRQ_PRIO, 0);
  HAL_NVIC_EnableIRQ(USART2_IRQn);
}
/******************************************************************
			USART1 : ZIGBEE

  PA9     ------> USART1_TX
  PB3     ------> USART1_RX
******************************************************************/
void HAL_UART1_MspInit(void)
{
  GPIO_InitTypeDef  GPIO_InitStruct;

  __GPIOA_CLK_ENABLE();

  __USART1_CLK_ENABLE();

  GPIO_InitStruct.Pin       = GPIO_PIN_9;
  GPIO_InitStruct.Mode      = GPIO_MODE_AF_PP;
  GPIO_InitStruct.Pull      = GPIO_PULLUP;
  GPIO_InitStruct.Speed     = GPIO_SPEED_LOW;	//GPIO_SPEED_FAST;
  GPIO_InitStruct.Alternate =  GPIO_AF7_USART1;

  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

  GPIO_InitStruct.Pin       = GPIO_PIN_3;
  GPIO_InitStruct.Mode      = GPIO_MODE_AF_PP;
  GPIO_InitStruct.Pull      = GPIO_PULLUP;
  GPIO_InitStruct.Speed     = GPIO_SPEED_LOW;	//GPIO_SPEED_FAST;
  GPIO_InitStruct.Alternate =  GPIO_AF7_USART1;

  HAL_GPIO_Init(GPIOB, &GPIO_InitStruct);

  HAL_NVIC_SetPriority(USART1_IRQn, USART1_IRQ_PRIO, 0);
  HAL_NVIC_EnableIRQ(USART1_IRQn);
}
/******************************************************************
			USART6 : DYNAMIXEL

  PC6     ------> USART6_TX
  PC7     ------> USART6_RX
******************************************************************/
void HAL_UARTDYN_MspInit(void)
{
  GPIO_InitTypeDef  GPIO_InitStruct;

    __USART6_CLK_ENABLE();

    GPIO_InitStruct.Pin = GPIO_PIN_7;
    GPIO_InitStruct.Mode = GPIO_MODE_AF_PP;
    GPIO_InitStruct.Pull = GPIO_PULLUP;
    GPIO_InitStruct.Speed = GPIO_SPEED_MEDIUM;
    GPIO_InitStruct.Alternate = GPIO_AF8_USART6;
    HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

    GPIO_InitStruct.Pin = GPIO_PIN_11;
    GPIO_InitStruct.Mode = GPIO_MODE_AF_PP;
    GPIO_InitStruct.Pull = GPIO_PULLUP;
    GPIO_InitStruct.Speed = GPIO_SPEED_MEDIUM;
    GPIO_InitStruct.Alternate = GPIO_AF8_USART6;
    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

    GPIO_InitStruct.Pin = GPIO_PIN_6;		// CAVALIER SUR PA_11 et PA_6
    GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);



    HAL_NVIC_SetPriority(USART6_IRQn, USART6_IRQ_PRIO, 0);
    HAL_NVIC_EnableIRQ(USART6_IRQn);
}


//******************************************************************
//			GPIO BUTTON - PC13 (USER BUTTON)
//******************************************************************
void HAL_GPIO_BUTTON_MspInit(void)
{
	  GPIO_InitTypeDef  GPIO_InitStruct;

	  GPIO_InitStruct.Pin = GPIO_PIN_13;
	  GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
	  GPIO_InitStruct.Pull = GPIO_NOPULL;

	  HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);


}

void HAL_GPIO_LINE_MspInit(void)
{
    GPIO_InitTypeDef GPIO_InitStruct;



    __GPIOA_CLK_ENABLE();
    __GPIOB_CLK_ENABLE();

    GPIO_InitStruct.Pin = GPIO_PIN_0;
    GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

    GPIO_InitStruct.Pin = GPIO_PIN_4;
    GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
    GPIO_InitStruct.Pull = GPIO_NOPULL;

    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);


}
//******************************************************************
//			GPIO LED PA5
//******************************************************************
void HAL_GPIO_LED_MspInit(void)
{
	  GPIO_InitTypeDef  GPIO_InitStruct;

/* Configure PA05 IO in output push-pull mode to drive external LED */
	  GPIO_InitStruct.Pin = GPIO_PIN_5;
	  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	  GPIO_InitStruct.Pull = GPIO_PULLUP;
	  GPIO_InitStruct.Speed = GPIO_SPEED_FAST;

	  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
}


/******************************************************************
			I2C - 1
I2C1_SCL	-->	PB8
I2C1_SDA	--> PB9
******************************************************************/
void HAL_i2c_MspInit(void)
{
	  GPIO_InitTypeDef  GPIO_InitStruct;
	  //-----------------------------------------------------------
	  // 						I2C1
	  //-----------------------------------------------------------
	  __I2C1_CLK_ENABLE();

	  	  GPIO_InitStruct.Pin = GPIO_PIN_8 | GPIO_PIN_9;
	  	  GPIO_InitStruct.Mode = GPIO_MODE_AF_OD;
	  	  GPIO_InitStruct.Pull = GPIO_NOPULL;
	  	  GPIO_InitStruct.Speed = GPIO_SPEED_HIGH;
	  	  GPIO_InitStruct.Alternate =   GPIO_AF4_I2C1 ; // hal_gpio_ex.h

	  	  HAL_GPIO_Init(GPIOB, &GPIO_InitStruct);

	  	  HAL_NVIC_SetPriority(I2C1_ER_IRQn, I2C1_ER_IRQ_PRIO, 0);
	  	  HAL_NVIC_EnableIRQ(I2C1_ER_IRQn);
	  	  HAL_NVIC_SetPriority(I2C1_EV_IRQn, I2C1_EV_IRQ_PRIO, 0);
	  	  HAL_NVIC_EnableIRQ(I2C1_EV_IRQn);
}

/******************************************************************
			TIMER 5 TickTimer
******************************************************************/
void HAL_tickTimer_MspInit(void)
{

	__TIM5_CLK_ENABLE();

 	 HAL_NVIC_SetPriority(TIM5_IRQn, TIM5_IRQ_PRIO, 0);
	 HAL_NVIC_EnableIRQ(TIM5_IRQn);
}


/******************************************************************
			SPI 1
SPI1_SCK	--> PA5
SPI1_MISO	--> PA6
SPI1_MOSI	--> PA7
SPI1 NSS	--> PA4
******************************************************************/
void HAL_spi_MspInit(void)
{
	  GPIO_InitTypeDef  GPIO_InitStruct;
	  /* Peripheral clock enable */
	   __SPI1_CLK_ENABLE();

	  GPIO_InitStruct.Pin = GPIO_PIN_5 | GPIO_PIN_6 | GPIO_PIN_7 | GPIO_PIN_4;
	  GPIO_InitStruct.Mode = GPIO_MODE_AF_PP;//GPIO_MODE_AF_PP;
	  GPIO_InitStruct.Pull = GPIO_PULLUP;//GPIO_PULLUP;
	  GPIO_InitStruct.Speed = GPIO_SPEED_HIGH;
	  GPIO_InitStruct.Alternate =   GPIO_AF5_SPI1 ; // hal_gpio_ex.h

	  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

}
/******************************************************************
			ADC
ADC1_12	--> PC2
ADC1_13	--> PC3
http://stm32f4-discovery.com/2014/04/library-06-ad-converter-on-stm32f4xx/
******************************************************************/
void HAL_adcir_MspInit(void)
{
	  GPIO_InitTypeDef  GPIO_InitStruct;
	  /* Peripheral clock enable */
	  __ADC1_CLK_ENABLE();

	  GPIO_InitStruct.Pin = GPIO_PIN_2 | GPIO_PIN_3 ;
	  GPIO_InitStruct.Mode = GPIO_MODE_ANALOG;
	  GPIO_InitStruct.Pull = GPIO_NOPULL;

	  HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

}

//=======================================================================

void HAL_MspDeInit(void)
{

}
