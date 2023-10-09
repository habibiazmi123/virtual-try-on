import React, { useCallback, useRef, useState, useEffect, memo, useMemo } from 'react'
import * as tf from '@tensorflow/tfjs'
import ReactDOM from 'react-dom'
import * as handpose from '@tensorflow-models/handpose'
import * as facemesh from '@tensorflow-models/facemesh'
import Webcam from 'react-webcam'
import { drawHand } from '../handposeutil'
import { Koordinats } from '../koordinat'
import { Koordinatsonme } from '../koordinatonme'
import * as fp from 'fingerpose'
import Handsigns from '../handsigns'
import { handsplaceholderSolid, handsplaceholderDash, HandRightOutline, HandLeftOutline, StackHolderSvg, SingleHolderSvg } from '../handsplaceholder'
import { FaceHolderSolidSvg } from '../faceholder'
import { Text, Heading, Button, ButtonGroup, Image, Stack, Container, Box, VStack, ChakraProvider } from '@chakra-ui/react'

import { Signimage, Signpass } from '../handimage'
import Toggle from '../Form'
import Metatags from '../metatags'
import Link from 'next/link'
import Spinner from 'react-spinner-material'
import QR from '../qr/QR'
import Footer from '../footer/Footer'
import OnModel from '../onModel/OnModel'
import Header from '../header/Header'
import {
  RiAlignJustify,
  RiCameraFill,
  RiCameraOffFill,
  RiStackFill,
  RiCoinFill,
  RiArrowLeftSLine,
  RiSunFill,
  RiSunLine,
  RiAddCircleFill,
  RiIndeterminateCircleFill,
  RiCloseCircleFill,
  RiRotateLockLine,
  RiRotateLockFill,
} from 'react-icons/ri'
import useModelStore from '../stores/useModelStore'
import useProductStore from '../stores/useProductStore'

export default function Rings(params) {
  const onSelectModel = useModelStore(s => s.onSelect)
  const [categoryDefault, setcategoryDefault] = useState(JSON.parse(localStorage.getItem('params')))
  const KoordinatsModelsEarings = JSON.parse(localStorage.getItem('KoordinatsModel'))
  const imageStackLS = useProductStore(s => s.productStackList)
  const paramsOnMe = params.params.OnMe
  const [RingOnMe, setRingOnMe] = useState(paramsOnMe)
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [camState, setCamState] = useState('on')
  const [imageCapture, setImageCapture] = useState([])
  const [jariKoordinat, setKoordinat] = useState([])
  const [actionOncahnge, setActionOnchange] = useState('Otomatis')
  const [handsLeftRight, sethandsLeftRight] = useState('Left')
  const [animasiClassOf, setanimasiClassOf] = useState('animasi-of-left')
  const [animasiClassOn, setanimasiClassOn] = useState('animasi-on-left')
  const [faceBottom, setfaceBottom] = useState(0)
  const [faceRight, setfaceRight] = useState(0)
  const [faceTop, setfaceTop] = useState(0)
  const [faceLeft, setfaceLeft] = useState(0)
  const [disabledbottonCamera, setDisabledButtonCamera] = useState(false)

  const [sign, setSign] = useState(null)

  let signList = []
  let currentSign = 0

  let gamestate = 'started'

  // let net;

  // Hook
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    })
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      // Add event listener
      window.addEventListener('resize', handleResize)
      // Call handler right away so state gets updated with initial window size
      handleResize()
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount
    return windowSize
  }

  const sizeWindow = useWindowSize()

  const [windowSize, setWindowSize] = useState({ innerWidth: 450, innerHeight: 443 })
  const [DefaultScale, setDefaultScale] = useState(1)

  useEffect(() => {
    let scaleWidth = window.innerWidth
    let scaleHeight = window.innerHeight
    let scaleDefaulring = 1 / ((scaleHeight - 200) / scaleWidth)
    setDefaultScale(scaleDefaulring)
  }, [DefaultScale])
  //console.log(DefaultScale)

  async function runHandpose() {
    const net = await facemesh.load()
    _signList()
    setInterval(() => {
      detect(net)
    }, 150)
  }

  function _signList() {
    signList = generateSigns()
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function generateSigns() {
    const password = shuffle(Signpass)
    return password
  }

  async function detect(net) {
    // Check data is available
    if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      setActionOnchange(localStorage.getItem('actioncamera'))
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Set canvas height and width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      // Make Detections
      const faces = await net.estimateFaces(video)
      if (faces.length > 0) {
        let FaceBottomRight = faces[0].boundingBox.bottomRight
        let FaceTopLeft = faces[0].boundingBox.bottomRight

        setfaceBottom(FaceBottomRight[0])
        setfaceRight(FaceBottomRight[1])
        setfaceTop(FaceTopLeft[0])
        setfaceLeft(FaceTopLeft[1])

        console.log('FaceBottom :' + FaceBottomRight[0])
        console.log('FaceRight :' + FaceBottomRight[1])
        console.log('FaceTop :' + FaceTopLeft[0])
        console.log('FaceLeft :' + FaceTopLeft[1])

        let scaleWidth = window.innerWidth
        if (scaleWidth > 412 || scaleWidth > 450) {
          if (FaceBottomRight[0] >= 370 && FaceBottomRight[0] < 430 && FaceTopLeft[0] >= 380 && FaceTopLeft[0] < 400) {
            const canvasss = canvasRef.current.getContext('2d')
            canvasss.canvas.getContext('2d').drawImage(video, 0, 0, canvasss.canvas.width, canvasss.canvas.height)
            const image_data_url = canvasss.canvas.toDataURL()
            //console.log(FaceBottomRight);
            //console.log(image_data_url)
            var arr = [image_data_url]
            const imageobj = JSON.parse(localStorage.getItem('ImageCapture'))
            if (imageobj.length != 0) {
              var arr = []
              for (let s = 0; s < imageobj.image.length + 1; s++) {
                if (s < imageobj.image.length) {
                  arr.push(imageobj.image[s])
                } else {
                  arr.push(image_data_url)
                }
              }
            }
            setImageCapture({ image: arr })
            document.getElementById('emojimage').setAttribute('src', image_data_url)
            document.querySelector('#loader-capture').style.display = 'block'
            // localStorage.setItem('IndexParams', 0)
            onSelectModel(0)
            const newParams = {
              cat: categoryDefault.cat,
              login: !categoryDefault.login ? 'false' : categoryDefault.login,
              customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
              id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
              onme: 'off',
            }
            const paramLS = localStorage.setItem('params', JSON.stringify(newParams))
            const KoordinatsOnmeNew = localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinatsonme))

            setTimeout(() => {
              let inerwidth = window.innerWidth
              let inerheight = window.innerHeight
              setWindowSize({ innerWidth: inerwidth, innerHeight: inerheight })
              setCamState('off')
              setRingOnMe('off')
            }, 1000)
          }
        } else {
          //
        }
      }
    }
  }

  useEffect(() => {
    runHandpose()
  }, [runHandpose])

  useEffect(() => {
    const actioncahnge = localStorage.setItem('actioncamera', actionOncahnge)
  }, [actionOncahnge])

  function turnOffCamera() {
    setCamState('off')
    setRingOnMe('off')
    const newParams = {
      cat: categoryDefault.cat,
      login: !categoryDefault.login ? 'false' : categoryDefault.login,
      customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
      id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
      onme: 'off',
    }
    const paramLS = localStorage.setItem('params', JSON.stringify(newParams))
    !imageCapture.img ? setImageCapture({ image: KoordinatsModelsEarings.KoordinatEarrings.model.image }) : imageCapture
    !imageCapture.img ? localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinats)) : []
  }

  useEffect(() => {
    const koordinatJari = localStorage.setItem('koordinatJari', JSON.stringify(jariKoordinat))
  }, [jariKoordinat])

  function HandsLeft() {
    sethandsLeftRight('Left')
    setanimasiClassOf('animasi-off-left')
    setanimasiClassOn('animasi-on-left')
  }

  function HandsRight() {
    sethandsLeftRight('Right')
    setanimasiClassOf('animasi-off')
    setanimasiClassOn('animasi-on')
  }

  function controlBrightnessImage() {
    document.getElementById('myID').style.filter = 'brightness(50%)'
    document.getElementById('myID').style.filter = 'contrast(50%)'
  }

  function takeCap() {
    const image_data_url = webcamRef.current.getScreenshot()
    var arr = [image_data_url]
    if (imageCapture.length != 0) {
      var arr = []
      for (let s = 0; s < imageCapture.image.length + 1; s++) {
        if (s < imageCapture.image.length) {
          arr.push(imageCapture.image[s])
        } else {
          arr.push(image_data_url)
        }
      }
    }
    setImageCapture({ image: arr })

    document.getElementById('emojimage').setAttribute('src', image_data_url)
    document.querySelector('#loader-capture').style.display = 'block'
    // localStorage.setItem('IndexParams', 0)
    onSelectModel(0)
    setDisabledButtonCamera(true)
    setTimeout(() => {
      let inerwidth = window.innerWidth
      let inerheight = window.innerHeight
      setWindowSize({ innerWidth: inerwidth, innerHeight: inerheight })
      setCamState('off')
      setRingOnMe('off')
      //set ulang local storage
      const newParams = {
        cat: categoryDefault.cat,
        login: !categoryDefault.login ? 'false' : categoryDefault.login,
        customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
        id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
        onme: 'off',
      }
      const paramLS = localStorage.setItem('params', JSON.stringify(newParams))
      const KoordinatsOnmeNew = localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinatsonme))
      document.querySelector('#loader-capture').style.display = 'none'
    }, 3000)
  }

  useEffect(() => {
    const imageLZ = localStorage.setItem('ImageCapture', JSON.stringify(imageCapture))
  }, [imageCapture])
  // console.log(RingOnMe);
  return (
    <>
      {camState === 'on' ? (
        <>
          <Box
            w={'100%'}
            bg="#0e1c28f0"
            id="box-onmodel"
            style={{
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'fixed',
              transform: 'scale(1)',
              transition: 'transform 0.3s ease 0s',
              transformOrigin: '195px 229px 0px',
              bottom: '0px',
              top: '0px',
              zIndex: '1800',
            }}
          >
            {camState === 'on' ? (
              <Webcam id="webcam" ref={webcamRef} videoConstraints={{ facingMode: 'user' }} style={{ bottom: '0px' }} mirrored={true} />
            ) : (
              // <canvas ref={canvasRef} style={{ bottom: "0px" }} />
              <canvas ref={canvasRef} style={{ bottom: '0px' }} />
            )}
            {<canvas id="gesture-canvas" ref={canvasRef} style={{ bottom: '0px' }} />}
            <Box
              id="loader-capture"
              style={{
                position: 'absolute',
                top: '0px',
                backgroundColor: 'white',
                opacity: '0.7',
                width: '100%',
                height: '100%',
              }}
              align="center"
              display="none"
            >
              <div className="div-loader" style={{ backgroundColor: '#FFFFF', position: 'absolute', top: '300px' }}>
                <Spinner radius={60} color={'black'} stroke={9} visible={true} />
              </div>
            </Box>
            <Box position={'absolute'} left={2} top={15} id="logo-mizora">
              <Image h="25px" src={'https://mizora.jewelry/assets/images/logo-mizora.svg'} id="mizora" />
            </Box>
            <Box
              style={{
                position: 'fixed',
                top: '50px',
                left: '15px',
                zIndex: 1000,
              }}
              display={camState === 'off' ? 'none' : 'block'}
            >
              <Button
                colorScheme={'gray'}
                width={'32px'}
                height={'32px'}
                borderRadius={'50%'}
                marginRight={5}
                onClick={turnOffCamera}
                leftIcon={<RiArrowLeftSLine size={25} />}
                style={{ zIndex: 1000, height: '37px' }}
              ></Button>
            </Box>
            <Box w={'100%'}>
              {
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 372 432"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    top: '-50px',
                    left: '40px',
                    position: 'fixed',
                    boxSize: '100%',
                    objectFit: 'cover',
                  }}
                >
                  <path
                    className={actionOncahnge === 'Manual' ? animasiClassOf : animasiClassOf}
                    pathLength="100"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray={'1 1'}
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${FaceHolderSolidSvg.d1}`}
                  ></path>
                  <path
                    className={actionOncahnge === 'Manual' ? animasiClassOf : animasiClassOf}
                    pathLength="15"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray={'1 1'}
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${FaceHolderSolidSvg.d2}`}
                  ></path>
                  <path
                    className={actionOncahnge === 'Manual' ? animasiClassOf : animasiClassOf}
                    pathLength="15"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray={'1 1'}
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${FaceHolderSolidSvg.d3}`}
                  ></path>
                  <path
                    className={actionOncahnge === 'Manual' ? animasiClassOf : animasiClassOn}
                    pathLength="1"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${FaceHolderSolidSvg.d1}`}
                  ></path>
                  <path
                    className={actionOncahnge === 'Manual' ? animasiClassOf : animasiClassOn}
                    pathLength="1"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${FaceHolderSolidSvg.d2}`}
                  ></path>
                  <path
                    className={actionOncahnge === 'Manual' ? animasiClassOf : animasiClassOn}
                    pathLength="1"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${FaceHolderSolidSvg.d3}`}
                  ></path>

                  <ellipse cx="222.098" cy="224.88" rx="4.5122" ry="4.44738" fill="white" />
                </svg>
              }
            </Box>
            {/* <Box zIndex={2000} style={{
          position: "fixed",
          bottom: "330px",
          padding: "30px",
          right: "20px",
          color: "whitesmoke",
          fontSize: "9px"
        }} display={
          camState === "off" ? (
            "none"
          ) : (
            "block"
          )
        }>
          <div left="140px" style={{ color: 'white' }}>FaceBottom : {`${faceBottom}`}</div>
          <div left="240px" style={{ color: 'white' }}>FaceRight: {`${faceRight}`}</div>
          <div left="140px" style={{ color: 'white' }}>FaceTop : {`${faceTop}`}</div>
          <div left="240px" style={{ color: 'white' }}>FaceLeft: {`${faceLeft}`}</div>

        </Box> */}
            <Box style={{ backgroundColor: '#FFFFF', position: 'absolute', bottom: '70px', left: '10px' }} display={camState === 'off' ? 'none' : 'block'}>
              <Link
                href={{
                  pathname: '/drag-area',
                  query: { img: imageCapture },
                }}
              >
                <Image h="50px" objectFit="cover" id="emojimage" display={camState === 'off' ? 'none' : 'block'} />
              </Link>
            </Box>
          </Box>

          {/* Foter */}
          <Box pb={0} pt={0} w={'100%'} h={180} bottom={0} position="fixed" bg={'transparent'} zIndex={2000}>
            <Box position={'absolute'} right={4} bottom={14} zIndex={2000}>
              <Toggle />
            </Box>
            <Box position={'absolute'} right={4} bottom={8} zIndex={2000} color="whiteAlpha.800">
              {actionOncahnge}
            </Box>
            <Container centerContent position={'relative'} top={39}>
              <Box margin={2} padding="4" maxW="md">
                {/* <Stack spacing={0} direction="row" align="left" marginBottom={4}>
                        <Button
                            colorScheme={handsLeftRight === "Left" ? ("blue") : ("gray")}
                            width={"47px"}
                            height={"47px"}
                            borderRadius={"50px"}
                            marginRight={5}
                            onClick={HandsLeft}
                            style={{ zIndex: 1000 }}
                        >
                            <Image src={HandLeftOutline.HandLeft.src} />
                        </Button>
                        <Button
                            colorScheme={handsLeftRight === "Right" ? ("blue") : ("gray")}
                            width={"47px"}
                            height={"47px"}
                            borderRadius={"50px"}
                            onClick={HandsRight}
                            style={{ zIndex: 1000 }}
                        >

                            <Image src={HandRightOutline.HandRight.src} />
                        </Button>
                    </Stack> */}
                <Stack spacing={0} direction="row" align="center" marginBottom={6} marginLeft={6}>
                  <Button
                    width={'67px'}
                    height={'67px'}
                    borderRadius={'50%'}
                    leftIcon={actionOncahnge === 'Manual' ? <RiCameraFill size={25} style={{ marginLeft: '6px' }} /> : <RiCameraOffFill size={25} style={{ marginLeft: '6px' }} />}
                    disabled={actionOncahnge === 'Manual' ? (disabledbottonCamera ? true : false) : true}
                    onClick={actionOncahnge === 'Manual' ? takeCap : turnOffCamera}
                    colorScheme={actionOncahnge === 'Manual' ? 'gray' : 'blackAlpha'}
                    bg={actionOncahnge === 'Manual' ? '#FFFFFF' : 'rgba(0, 0, 0, 0.92)'}
                  ></Button>
                </Stack>
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <></>
      )}
      {camState === 'off' ? (
        <>
          <Footer
            params={{
              OnMe: RingOnMe,
              img: imageCapture,
              ProductImageThumb: imageStackLS.ProductImageThumb.Earings,
              ProductImage: imageStackLS.ProductImage.Earings,
              productName: imageStackLS.productName.Earings,
              productPrice: imageStackLS.productPrice.Earings,
              productID: imageStackLS.productID.Earings,
            }}
          />
        </>
      ) : (
        <></>
      )}
    </>
  )
}
