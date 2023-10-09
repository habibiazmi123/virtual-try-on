import React, { useState, useEffect, memo, useMemo, useCallback } from 'react'

import { Button, Image, Stack, Box } from '@chakra-ui/react'
import { RiSunFill, RiSunLine } from 'react-icons/ri'

export default function Header(params) {
  const [DarkLight, setDarkLightState] = useState('dark')
  const [sliderValue, setSliderValue] = useState(0.001)

  function onDarkLight() {
    setDarkLightState(v => {
      if (v === 'dark') {
        return 'light'
      } else {
        return 'dark'
      }
    })
  }

  useEffect(() => {
    const lsSliderValue = localStorage.getItem('brightnessVal')
    if (lsSliderValue) setSliderValue(lsSliderValue)
  }, [])

  function onSliderChangeValue(valuexx) {
    setSliderValue(valuexx)
  }
  const RangeSlider = memo(({ classes, label, onChange, value, ...sliderProps }) => {
    const [sliderVal, setSliderVal] = useState(1)
    const [mouseState, setMouseState] = useState(null)

    useEffect(() => {
      const getLS = localStorage.getItem('brightnessVal')
      if (getLS) setSliderVal(getLS)
    }, [])

    const changeCallback = e => {
      setSliderVal(e.target.value)
      onSliderChangeValue(e.target.value)
      localStorage.setItem('brightnessVal', e.target.value)
      document.getElementById('box-onmodel').style.filter = 'brightness(' + e.target.value + ')'
    }

    useEffect(() => {
      if (mouseState === 'up') {
        onChange(sliderVal)
      }
    }, [mouseState, onChange, sliderVal])

    return (
      <Box className="range-slider" align="center">
        <Box style={{ position: 'absolute', right: '4px', bottom: '4px' }}>
          <RiSunLine size={20} />
        </Box>
        <Box style={{ position: 'absolute', right: '25px', bottom: '0px' }}>
          <input
            type="range"
            value={sliderVal}
            {...sliderProps}
            className={`slider ${classes}`}
            id="myRange"
            onChange={changeCallback}
            onMouseDown={() => setMouseState('down')}
            onMouseUp={() => setMouseState('up')}
          />
        </Box>
        <Box style={{ position: 'absolute', right: '155px', bottom: '4px' }}>
          <RiSunFill size={20} />
        </Box>
      </Box>
    )
  })
  RangeSlider.displayName = 'RangeSlider'

  const RangeSliderFix = () => {
    const [parentVal, setParentVal] = useState(1)

    const sliderValueChanged = useCallback(val => {
      // console.log("NEW VALUE", val);
      setParentVal(val)
    }, [])

    const sliderProps = useMemo(
      () => ({
        min: 0,
        max: 3,
        value: parentVal,
        step: 0.01,
        label: 'This is a reusable slider',
        onChange: e => sliderValueChanged(e),
      }),
      [parentVal, sliderValueChanged]
    )

    return (
      <div>
        <RangeSlider {...sliderProps} classes="additional-css-classes" />
      </div>
    )
  }

  return (
    <Box w={'100%'} top={0} position="fixed" zIndex={2000} id="box-header">
      <Box position={'absolute'} left={2} top={15} id="logo-mizora">
        <Image h="25px" src={'https://mizora.jewelry/assets/images/logo-mizora.svg'} id="mizora" alt="" />
      </Box>
      {params.params.lengslider === 1 ? (
        <Box position={'absolute'} left={2} top={10} id="btn-light">
          <Button
            colorScheme={DarkLight === 'dark' ? 'blackAlpha' : 'gray'}
            bg={DarkLight === 'dark' ? 'rgba(0, 0, 0, 0.92)' : '#FFFFFF'}
            width={'30px'}
            minWidth={'30px'}
            height={'30px'}
            borderRadius={'50%'}
            marginRight={5}
            onClick={onDarkLight}
            leftIcon={<RiSunFill size={25} style={{ marginLeft: '6px' }} />}
            style={{
              zIndex: 1000,
            }}
          ></Button>
        </Box>
      ) : (
        ''
      )}
      {params.params.lengslider === 1 ? (
        <Box margin={2} padding="4" maxW="md">
          <Stack display={DarkLight === 'light' ? 'block' : 'none'}>
            <RangeSliderFix />
          </Stack>
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}
