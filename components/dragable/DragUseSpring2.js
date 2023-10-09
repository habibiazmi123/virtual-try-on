import React, { useEffect } from 'react'
import { Divider, Flex, Text, Image, Box } from '@chakra-ui/react'
import Moveable from 'react-moveable'
import { isMobile } from 'react-device-detect'
import { CAT_BRACELETS, CAT_EARRINGS, CAT_RINGS } from '../values/product_categories'
import useModelStore from '../stores/useModelStore'

export default function Dragable() {
  const index_selected_model = useModelStore(s => s.index_selected)
  const categoryDefault = JSON.parse(localStorage.getItem('params'))
  const [imageProductDefault, setimageProductDefault] = React.useState()
  const imageRef = React.useRef(null)
  const [target, setTarget] = React.useState()
  const [IndexCompare, setIndexCompare] = React.useState(0)
  const [_, settrufalseRotate] = React.useState(0)
  const [__, setimgCtrl] = React.useState('off')
  const [valimgCtrl, setvalimgCtrl] = React.useState(0)
  const [viewAble, setViewAble] = React.useState(false)

  const dimensiProduct = React.useMemo(() => {
    if (categoryDefault.cat === CAT_EARRINGS) {
      return { ProductWidth: '100%' }
    } else if (categoryDefault.cat === CAT_BRACELETS) {
      return { ProductWidth: '100%' }
    } else if (categoryDefault.cat === CAT_RINGS) {
      return { ProductWidth: '100%' }
    } else {
      return { ProductWidth: '100%' }
    }
    // @todo: perlukah ditambahkan untuk Bangles dan Necklaces?
  }, [categoryDefault.cat])

  useEffect(() => {
    setimageProductDefault('./compareimage/coin_500.png')
  }, [])

  const DimensionViewable = React.useMemo(() => {
    const CW = !imageRef.current ? 100 : imageRef.current.clientWidth
    const CH = !imageRef.current ? 100 : imageRef.current.clientHeight
    const textH = IndexCompare === 0 ? '27.05 mm' : '24.10 mm'
    const textW = IndexCompare === 0 ? '27.05 mm' : '24.10 mm'
    const geserW = IndexCompare === 0 ? 90 : 90
    const geserWMobile = IndexCompare !== 0 && isMobile ? 40 : 40
    const geserH = IndexCompare === 0 ? 10 : 10
    return {
      name: 'dimensionViewable',
      props: {},
      events: {},
      render: () => (
        <div
          key={'dimension-viewer'}
          className={'moveable-dimension'}
          id="dimensi"
          style={{
            position: 'absolute',
            zIndex: 3001,
            // background: "#4af",
            borderRadius: '2px',
            padding: '2px 4px',
            color: 'white',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            willChange: 'transform',
            transform: `translate(${CW / 2 - geserW}px, ${CH}px) scale(1, 1)`,
          }}
        >
          <Box
            id="height-compare"
            style={{
              rotate: '90deg',
              position: 'absolute',
              transform: `translate(${(CW / 4 - CW) / 2 - geserWMobile}px, ${CH - CH / 2 + geserH}px) scale(1, 1)`,
            }}
          >
            <Flex alignItems="center" gap={0}>
              <Divider border="1px" orientation="horizontal" width={'10'} />
              <Divider border="1px" orientation="vertical" h={'5'} />
              <Text sx={{ whiteSpace: 'nowrap' }} padding={2}>
                {textH}
              </Text>
              <Divider border="1px" orientation="vertical" h={'5'} />
              <Divider border="1px" orientation="horizontal" width={'10'} />
            </Flex>
          </Box>
          <Box id="width-compare">
            <Flex alignItems="center" gap={0}>
              <Divider border="1px" orientation="horizontal" width={'10'} />
              <Divider border="1px" orientation="vertical" h={'5'} />
              <Text sx={{ whiteSpace: 'nowrap' }} padding={2}>
                {textW}
              </Text>
              <Divider border="1px" orientation="vertical" h={'5'} />
              <Divider border="1px" orientation="horizontal" width={'10'} />
            </Flex>
          </Box>
        </div>
      ),
    }
  }, [IndexCompare])

  const [frame, setFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: '0 0',
  })

  const onImgClick = React.useCallback(() => {
    setIndexCompare(index_selected_model)

    const movableOrigin = document.querySelectorAll('.moveable-origin')
    const moveableDirections = document.querySelectorAll('.moveable-direction')

    if (movableOrigin[1]) document.querySelectorAll('.moveable-origin')[1].style.opacity = 0
    if (moveableDirections[4]) moveableDirections[4].style.opacity = 0
    if (moveableDirections[5]) moveableDirections[5].style.opacity = 0
    if (moveableDirections[6]) moveableDirections[6].style.opacity = 0
    if (moveableDirections[7]) moveableDirections[7].style.opacity = 0

    setimgCtrl(imgCtrl => {
      if (imgCtrl === 'on') {
        setvalimgCtrl(2)
        setViewAble(true)
        return 'off'
      } else {
        setvalimgCtrl(0)
        setViewAble(false)
        return 'on'
      }
    })
  }, [index_selected_model])

  React.useEffect(() => {
    document.addEventListener('mousedown', onImgClick)
    setTarget(document.querySelector('.target2'))
    setFrame({
      translate: [0, 0],
      rotate: 0,
      transformOrigin: '0 0',
    })
  }, [onImgClick])

  return (
    <>
      {isMobile ? (
        <Box
          id="boxprod3"
          w={window.innerWidth / 2}
          h={'100%'}
          style={{
            position: 'absolute',

            opacity: 0.5,
          }}
        >
          <Image
            alt=""
            id="productBox2"
            ref={imageRef}
            w={`${dimensiProduct.ProductWidth}`}
            className="target2"
            onTouchEnd={onImgClick}
            src={`${imageProductDefault}`}
            style={{
              objectFit: 'contain',
              position: 'relative',
              transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
              transition: 'transform 0.3s ease 0s',
              transformOrigin: '0px 0px 0px',
              display: 'inline-block',
              zIndex: '1800',
              bottom: '258px',
              left: '67px',
            }}
          />
        </Box>
      ) : (
        // width set permodel
        <Box
          id="boxprod3"
          w={'100%'}
          h={window.innerHeight}
          style={{
            position: 'absolute',
            opacity: 0.5,
            left: '50%',
          }}
        >
          <Image
            alt=""
            id="productBox2"
            ref={imageRef}
            w={`${dimensiProduct.ProductWidth}`}
            className="target2"
            onClick={onImgClick}
            src={`${imageProductDefault}`}
            style={{
              objectFit: 'contain',
              position: 'relative',
              transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
              transition: 'transform 0.3s ease 0s',
              transformOrigin: '0px 0px 0px',
              maxWidth: '210px',
              maxHeight: '207px',
              display: 'inline-block',
              zIndex: '1800',
              top: '86px',
              left: '0',
              cursor: 'grab',
            }}
          />
        </Box>
      )}
      <Moveable
        target={target}
        zoom={valimgCtrl}
        draggable={true}
        resizable={false}
        rotatable={false}
        ables={[DimensionViewable]}
        props={{
          dimensionViewable: viewAble,
        }}
        onDrag={e => {
          frame.translate = e.beforeTranslate
        }}
        onDragEnd={({ lastEvent }) => {
          if (lastEvent) {
            settrufalseRotate(0)
          }
        }}
        onRotateStart={e => {
          e.set(frame.rotate)
        }}
        onRotate={e => {
          frame.rotate = e.beforeRotate
        }}
        onRotateEnd={({ lastEvent }) => {
          if (lastEvent) {
            frame.rotate = lastEvent.beforeRotate
            settrufalseRotate(1)
          }
        }}
        onRender={e => {
          const { translate, rotate, transformOrigin } = frame
          localStorage.setItem('dragableStatus', true)
          e.target.style.transformOrigin = transformOrigin
          e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)` + ` rotate(${rotate}deg)`
        }}
      />
    </>
  )
}
