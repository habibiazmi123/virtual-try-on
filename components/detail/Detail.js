import React, { useState, useEffect, useCallback } from 'react'
import { Text, Heading, Button, Box } from '@chakra-ui/react'
import { RiAddCircleFill, RiIndeterminateCircleFill } from 'react-icons/ri'
import Spinner from 'react-spinner-material'
import Header from '../header/Header'
import OnModel from '../onModel/OnModel'
import { URL_CART } from '../api/urls'
import useParamsStore from '../stores/useParamsStore'
import useProductStore from '../stores/useProductStore'
import useModelStore from '../stores/useModelStore'
import { VIEW_ON_ME } from '../values/view_modes'
import { useSearchParams } from 'next/navigation'

export default function Footer() {
  const query = useSearchParams()
  const params = useModelStore(s => s.footer_params)
  const view_mode = useModelStore(s => s.view_mode)
  const img_list = useModelStore(s => s.footer_params.img_list)

  const productID = params.productID
  const productId = query.get('product_id')

  // const cat = useParamsStore(s => s.cat)
  const customer_id = useParamsStore(s => s.customer_id)
  const login = useParamsStore(s => s.login)
  const index_product = useProductStore(s => s.index_product)
  const index_model = useModelStore(s => s.index_selected)

  const [is_initialized, setIsInitialized] = useState(false)
  const [on_login, setOnLogin] = useState('')
  const [product_name_default, setProductNameDefault] = useState('')
  const [product_price_default, setProductPriceDefault] = useState('')
  const [scale_zoom, setZoomScale] = useState({ scale: 1 })

  // ZoomIn ZoomOut
  function zoomIn() {
    const newscale = scale_zoom.scale + 0.2
    if (newscale <= 2.2) {
      setZoomScale({ scale: newscale })
      document.getElementById('box-onmodel').style.transform = 'scale(' + newscale + ')'
    }
  }

  function zoomOut() {
    const newscale = scale_zoom.scale - 0.2
    if (newscale >= 1) {
      setZoomScale({ scale: newscale })
      document.getElementById('box-onmodel').style.transform = 'scale(' + newscale + ')'
    }
  }
  // end | ZoomIn ZoomOut

  const addtobag = useCallback(() => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      customer_id,
      quantity: 1,
      product_id: productID[!index_product ? 0 : index_product],
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(URL_CART, requestOptions)
      .then(response => response.text())
      .then(() => {
        document.querySelector('#loader-capture').style.display = 'block'
        setTimeout(() => {
          window.open('https://mizora.jewelry/cart', '_blank')
          document.querySelector('#loader-capture').style.display = 'none'
        }, 3000)
      })
      .catch(error => console.log('error', error))
  }, [customer_id, index_product, productID])

  const init = useCallback(() => {
    const productNameDefault = params.productName[!index_product ? 0 : index_product]
    const productPriceDefault = params.productPrice[!index_product ? 0 : index_product]

    setOnLogin(!login ? 'false' : login)
    setProductNameDefault(productNameDefault)
    setProductPriceDefault(productPriceDefault)

    setIsInitialized(true)
  }, [index_model, index_product, login, params.productName, params.productPrice])

  useEffect(() => {
    if (!is_initialized) {
      init()
    }
  }, [index_model, index_product, init, is_initialized])

  return (
    <>
      <>
        <OnModel
          params={{
            img_list,
            ProductImage: !params.ProductImage ? [] : params.ProductImage[productId],
            ProductImageThumb: params.ProductImageThumb[productId],
          }}
        />
        <Header params={{ lengslider: img_list.length }} />
      </>

      <Box w={'100%'} maxH={350} h={300} bg="whiteAlpha" bottom={0} position="fixed" id="box-footer" zIndex={1900}>
        <Box pb={0} pt={0} w={'100%'} h={50} bottom={0} position="relative">
          <Box position={'absolute'} left={-2} top={-3} zIndex={200}>
            <Button
              style={{ transform: 'rotate(90deg)' }}
              width={'80px'}
              height={'35px'}
              borderRadius={'50px'}
              leftIcon={<RiAddCircleFill size={30} onClick={zoomIn} />}
              rightIcon={<RiIndeterminateCircleFill size={30} style={{ transform: 'rotate(90deg)' }} onClick={zoomOut} />}
            ></Button>
          </Box>
        </Box>
        <Box pb={0} pt={0} w={'100%'} h={180} bg={view_mode !== VIEW_ON_ME ? '#FFFFFF' : 'transparent'} bottom={0} position="relative">
          <Box h="20px" id="box-title-product" position={'absolute'} left={'20px'} top={'70px'}>
            <Text>{!product_name_default ? params.productName[0] : product_name_default}</Text>
          </Box>
          <Heading id="box-price-product" as="h5" size="smll" className="tutor-text" color="black" textAlign="left" position={'absolute'} left={'20px'} top={'90px'}>
            <Text>{!product_price_default ? params.productPrice[0] : product_price_default}</Text>
          </Heading>
          {on_login === 'true' ? (
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
        <div
          className="div-loader"
          style={{
            backgroundColor: '#FFFFF',
            position: 'absolute',
            top: '300px',
          }}
        >
          <Spinner radius={60} color={'black'} stroke={9} visible={true} />
        </div>
      </Box>
    </>
  )
}
