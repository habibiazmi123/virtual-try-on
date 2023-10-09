import React, { useState, useEffect, useMemo } from 'react'
import QRCode from 'react-qr-code'
import { Heading, Button, Stack, Container, Box, Center } from '@chakra-ui/react'
import Footer from '../footer/Footer'
import Spinner from 'react-spinner-material'
import useProductStore from '../stores/useProductStore'
import useParamsStore from '../stores/useParamsStore'
import { Koordinats } from '../koordinat'

export default function QR() {
  const cat = useParamsStore(s => s.cat)
  const imageStackLS = useProductStore(s => s.productStackList)

  const [on_me, setOnMe] = useState('on')
  const [on_compare, setOnCompare] = useState('off')
  const [lengImageSlide, setlengImageSlide] = useState(6)
  const [imageModel, setImageModel] = useState('./compareimage/coin_500.png')

  const productID = useMemo(() => {
    return cat === 'rings' ? imageStackLS.productID.Rings : cat === 'earrings' ? imageStackLS.productID.Earings : cat === 'bracelets' ? imageStackLS.productID.Bracelets : []
  }, [cat, imageStackLS.productID.Bracelets, imageStackLS.productID.Earings, imageStackLS.productID.Rings])

  const [imageModelDefault, setImageModelDefault] = useState({
    Rings: { image: Koordinats.KoordinatRings.model.image },
    Bracelets: { image: Koordinats.KoordinatBracelets.model.image },
    Earings: { image: Koordinats.KoordinatEarrings.model.image },
    Bangles: { image: Koordinats.KoordinatBangles.model.image },
    Necklaces: { image: Koordinats.KoordinatNecklaces.model.image },
  })

  const productNameDefault = useMemo(
    () =>
      cat === 'rings'
        ? imageStackLS.productName.Rings[!localStorage.getItem('indexProductStack') ? 0 : localStorage.getItem('indexProductStack')]
        : cat === 'earrings'
        ? imageStackLS.productName.Earings[!localStorage.getItem('indexProductStack') ? 0 : localStorage.getItem('indexProductStack')]
        : cat === 'bracelets'
        ? imageStackLS.productName.Bracelets[!localStorage.getItem('indexProductStack') ? 0 : localStorage.getItem('indexProductStack')]
        : [],
    [cat, imageStackLS.productName.Bracelets, imageStackLS.productName.Earings, imageStackLS.productName.Rings]
  )

  const productPriceDefault = useMemo(
    () =>
      cat === 'rings'
        ? imageStackLS.productPrice.Rings[!localStorage.getItem('indexProductStack') ? 0 : localStorage.getItem('indexProductStack')]
        : cat === 'earrings'
        ? imageStackLS.productPrice.Earings[!localStorage.getItem('indexProductStack') ? 0 : localStorage.getItem('indexProductStack')]
        : cat === 'bracelets'
        ? imageStackLS.productPrice.Bracelets[!localStorage.getItem('indexProductStack') ? 0 : localStorage.getItem('indexProductStack')]
        : [],
    [cat, imageStackLS.productPrice.Bracelets, imageStackLS.productPrice.Earings, imageStackLS.productPrice.Rings]
  )

  function onModelBtnAction() {
    setOnMe('off')
    setOnCompare('off')
    const newParams = {
      cat: cat,
      login: !categoryDefault.login ? 'false' : categoryDefault.login,
      customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
      id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
      onme: 'off',
    }
    localStorage.setItem('params', JSON.stringify(newParams))
    localStorage.setItem('dragableStatus', false)
  }

  function addtobag() {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      customer_id: categoryDefault.customer_id,
      quantity: 1,
      product_id: productID[!localStorage.getItem('indexProductStack') ? 0 : localStorage.getItem('indexProductStack')],
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('https://api.mizora.jewelry/api/cart', requestOptions)
      .then(response => response.text())
      .then(() => {
        document.querySelector('#loader-capture').style.display = 'block'
        setTimeout(() => {
          window.open('https://mizora.jewelry/cart', '_blank')
          document.querySelector('#loader-capture').style.display = 'none'
        }, 3000)
      })
      .catch(error => console.log('error', error))
  }

  function onCompare() {
    setOnCompare('on')
    setOnMe('off')
    const newParams = {
      cat: cat,
      login: !categoryDefault.login ? 'false' : categoryDefault.login,
      customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
      id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
      onme: 'off',
    }
    localStorage.setItem('params', JSON.stringify(newParams))
    setImageModelDefault({
      Rings: { image: ['./compareimage/coin_500.png', './compareimage/coin_1000.png'] },
      Bracelets: { image: ['./compareimage/coin_500.png', './compareimage/coin_1000.png'] },
      Earings: { image: ['./compareimage/coin_500.png', './compareimage/coin_1000.png'] },
    })
    setImageModel({ image: ['./compareimage/coin_500.png', './compareimage/coin_1000.png'] })
    setlengImageSlide(2)
  }

  useEffect(() => {
    document.getElementById('box-title-product').textContent = `${productNameDefault}`
    document.getElementById('box-price-product').textContent = `${productPriceDefault}`
  }, [productNameDefault, productPriceDefault])

  return (
    <>
      {on_me === 'on' ? (
        <>
          <Box
            width="100%"
            bg="#e3e3e3"
            id="image-slide"
            style={{
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'fixed',
              transform: 'scale(1)',
              transition: 'transform 0.3s ease 0s',
              transformOrigin: '195px 229px 0px',
            }}
          >
            <Container centerContent maxW="xl" height="80vh" pt="0" pb="0" bg="#e3e3e3">
              <div style={{ margin: '0 auto', maxWidth: 154, width: '100%', marginTop: '80px' }}>
                <QRCode
                  size={256}
                  style={{
                    height: 'auto',
                    maxWidth: '100%',
                    width: '100%',
                    border: 'solid 2px',
                    borderColor: 'white',
                    borderRadius: '0px',
                  }}
                  value={`https://mvto.codehouse.id/?cat=${cat}&login=${!categoryDefault.login ? 'false' : categoryDefault.login}&customer_id=${
                    !categoryDefault.customer_id ? null : categoryDefault.customer_id
                  }&id_cat=${!categoryDefault.id_cat ? '' : categoryDefault.id_cat}&onme=on`}
                />
              </div>
              <Center>
                <Box height={105}>
                  <svg width="50" height="150" viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M208.286 64.7705H117.907C106.168 64.7705 96.5632 74.3033 96.5632 85.9545V299.766C96.5632 311.417 106.168 320.95 117.907 320.95H208.286C220.025 320.95 229.63 311.417 229.63 299.766V85.9545C229.63 74.3033 220.025 64.7705 208.286 64.7705Z"
                      fill="white"
                    />
                    <path
                      d="M210.114 58.8244H189.503H135.806H115.195C100.727 58.8244 88.8894 70.6621 88.8894 85.1303V300.64C88.8894 315.109 100.727 326.946 115.195 326.946H210.114C224.582 326.946 236.42 315.109 236.42 300.64V85.1303C236.42 70.6621 224.582 58.8244 210.114 58.8244ZM229.369 299.628C229.369 311.272 219.764 320.799 208.025 320.799H117.646C105.907 320.799 96.302 311.272 96.302 299.628V85.942C96.302 74.2977 105.907 64.7705 117.646 64.7705H128.342C128.215 65.3181 128.145 65.887 128.145 66.4717C128.145 70.6514 132.497 76.3576 136.71 76.3576L186.972 76.5818C191.186 76.5818 197.164 70.6514 197.164 66.4717C197.164 65.887 197.095 65.3181 196.967 64.7705H208.025C219.764 64.7705 229.369 74.2977 229.369 85.942V299.628Z"
                      fill="black"
                    />
                    <path
                      d="M189.774 314.652H135.535C134.74 314.652 134.089 314.001 134.089 313.206C134.089 312.41 134.74 311.759 135.535 311.759H189.774C190.57 311.759 191.221 312.41 191.221 313.206C191.221 314.001 190.57 314.652 189.774 314.652Z"
                      fill="black"
                    />
                    <g opacity="0.98">
                      <path
                        d="M163.75 157.875C185.274 157.875 202.75 175.351 202.75 196.875C202.75 218.399 185.274 235.875 163.75 235.875C142.226 235.875 124.75 218.399 124.75 196.875C124.75 175.351 142.226 157.875 163.75 157.875Z"
                        fill="#48BB78"
                      />
                    </g>
                    <path
                      d="M163.75 160.312C183.929 160.312 200.312 176.696 200.312 196.875C200.312 217.054 183.929 233.438 163.75 233.438C143.571 233.438 127.188 217.054 127.188 196.875C127.188 176.696 143.571 160.312 163.75 160.312Z"
                      stroke="#48BB78"
                      strokeWidth="3.65625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M146.154 199.312L155.599 209.062L181.345 184.688" stroke="white" strokeWidth="3.65625" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Box>
              </Center>

              <Center>
                <Box width={305}>Scan QR with your phone camera to Try On</Box>
              </Center>
            </Container>
          </Box>
          <Box w={'100%'} maxH={350} h={300} bg="whiteAlpha" bottom={0} position="fixed" id="box-footer" zIndex={1900}>
            <Box pb={0} pt={0} w={'100%'} h={150} bottom={0} position="relative">
              <Container centerContent position={'relative'} top={55}>
                <Box margin={2} padding="4" maxW="md">
                  <Stack spacing={2} direction="row" align="left" marginBottom={0}>
                    <Button colorScheme={'gray'} width={'70px'} height={'30px'} borderRadius={'20px'} fontSize={9} onClick={onModelBtnAction}>
                      On Model
                    </Button>
                    <Button bg={'rgba(0, 0, 0, 0.92)'} colorScheme={'blackAlpha'} width={'70px'} height={'30px'} borderRadius={'20px'} marginRight={0} fontSize={9}>
                      On Me
                    </Button>
                    {/* <Button colorScheme={'gray'} width={'70px'} height={'30px'} borderRadius={'20px'} fontSize={9} onClick={onCompare}>
                      Compare
                    </Button> */}
                  </Stack>
                </Box>
              </Container>
            </Box>
            <Box pb={0} pt={0} w={'100%'} h={180} bg="#FFFFFF" bottom={0} position="relative">
              <Box h="20px" id="box-title-product" position={'absolute'} left={'20px'} top={'70px'}></Box>
              <Heading id="box-price-product" as="h5" size="smll" className="tutor-text" color="black" textAlign="left" position={'absolute'} left={'20px'} top={'90px'}></Heading>
              {categoryDefault.login === 'true' ? (
                <>
                  <Box h="20px">
                    <Button
                      bg={'rgba(0, 0, 0, 0.92)'}
                      colorScheme={'blackAlpha'}
                      width={'125px'}
                      height={'30px'}
                      borderRadius={'20px'}
                      position={'absolute'}
                      right={'20px'}
                      top={'70px'}
                      padding={5}
                      onClick={addtobag}
                    >
                      Add to Bag
                    </Button>
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </>
      ) : null}
      {on_me === 'off' && cat === 'rings' && on_compare === 'off' ? (
        <>
          <Footer
            params={{
              OnMe: on_me,
              img: imageModelDefault.Rings,
              OnCompare: 'off',
              ProductImageThumb: imageStackLS.ProductImageThumb.Rings,
              ProductImage: imageStackLS.ProductImage.Rings,
              productName: imageStackLS.productName.Rings,
              productPrice: imageStackLS.productPrice.Rings,
              productID: imageStackLS.productID.Rings,
            }}
          />
        </>
      ) : on_me === 'off' && cat === 'rings' && on_compare === 'on' ? (
        <Footer
          params={{
            OnMe: on_me,
            img: imageModelDefault.Rings,
            OnCompare: on_compare,
            ProductImageThumb: imageStackLS.ProductImageThumb.Rings,
            ProductImage: imageStackLS.ProductImage.Rings,
            productName: imageStackLS.productName.Rings,
            productPrice: imageStackLS.productPrice.Rings,
            productID: imageStackLS.productID.Rings,
          }}
        />
      ) : null}
      {on_me === 'off' && cat === 'bracelets' && on_compare === 'off' ? (
        <Footer
          params={{
            OnMe: on_me,
            img: imageModelDefault.Bracelets,
            OnCompare: 'off',
            ProductImageThumb: imageStackLS.ProductImageThumb.Bracelets,
            ProductImage: imageStackLS.ProductImage.Bracelets,
            productName: imageStackLS.productName.Bracelets,
            productPrice: imageStackLS.productPrice.Bracelets,
            productID: imageStackLS.productID.Bracelets,
          }}
        />
      ) : on_me === 'off' && cat === 'bracelets' && on_compare === 'on' ? (
        <Footer
          params={{
            OnMe: on_me,
            img: imageModelDefault.Bracelets,
            OnCompare: on_compare,
            ProductImageThumb: imageStackLS.ProductImageThumb.Bracelets,
            ProductImage: imageStackLS.ProductImage.Bracelets,
            productName: imageStackLS.productName.Bracelets,
            productPrice: imageStackLS.productPrice.Bracelets,
            productID: imageStackLS.productID.Bracelets,
          }}
        />
      ) : null}
      {on_me === 'off' && cat === 'earrings' && on_compare === 'off' ? (
        <Footer
          params={{
            OnMe: on_me,
            img: imageModelDefault.Earings,
            OnCompare: 'off',
            ProductImageThumb: imageStackLS.ProductImageThumb.Earings,
            ProductImage: imageStackLS.ProductImage.Earings,
            productName: imageStackLS.productName.Earings,
            productPrice: imageStackLS.productPrice.Earings,
            productID: imageStackLS.productID.Earings,
          }}
        />
      ) : on_me === 'off' && cat === 'earrings' && on_compare === 'on' ? (
        <Footer
          params={{
            OnMe: on_me,
            img: imageModelDefault.Earings,
            OnCompare: on_compare,
            ProductImageThumb: imageStackLS.ProductImageThumb.Earings,
            ProductImage: imageStackLS.ProductImage.Earings,
            productName: imageStackLS.productName.Earings,
            productPrice: imageStackLS.productPrice.Earings,
            productID: imageStackLS.productID.Earings,
          }}
        />
      ) : null}
      {
        <Box
          id="loader-capture"
          style={{
            position: 'fixed',
            top: '0px',
            backgroundColor: '#686c70',
            opacity: '0.7',
            width: '100%',
            height: '100%',
            zIndex: 5000,
          }}
          align="center"
          display="none"
        >
          <div className="div-loader" style={{ backgroundColor: '#FFFFF', position: 'absolute', top: '300px' }}>
            <Spinner radius={60} color={'black'} stroke={9} visible={true} />
          </div>
        </Box>
      }
    </>
  )
}
