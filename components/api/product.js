import React, { useCallback, useState, useEffect, useRef } from 'react'
import queryString from 'query-string'
import { URL_PRODUCT_CATEGORY } from './urls'
import useModelStore from '../stores/useModelStore'

export const useProductCategory = () => {
  const onSelectModel = useModelStore(s => s.onSelect)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [productImage, setProductImage] = useState({
    Rings: [],
    Bracelets: [],
    Earings: [],
  })
  const [productImageThumb, setProductImageThumb] = useState({
    Rings: [],
    Bracelets: [],
    Earings: [],
  })
  const [ProductName, setproductName] = useState({
    Rings: [],
    Bracelets: [],
    Earings: [],
  })
  const [ProductPrice, setproductPrice] = useState({
    Rings: [],
    Bracelets: [],
    Earings: [],
  })
  useEffect(() => {
    const queryParams = queryString.parse(window.location.search)
    // localStorage.setItem('params', JSON.stringify(queryParams))
    //getApi
    fetch(`${URL_PRODUCT_CATEGORY}/${queryParams.id_cat}`)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true)
          // console.log(result.data.data)
          var arrImgStackProduct = []
          var arrImgStackThumb = []
          var arrTitle = []
          var arrPrice = []
          for (let s = 0; s < result.data.data.length; s++) {
            arrTitle.push(result.data.data[s].title)
            arrPrice.push(result.data.data[s].price)
            arrImgStackThumb.push(result.data.data[s].photo_1)
            arrImgStackProduct.push(result.data.data[s].photo_vto)
          }
          // console.log(arrTitle)
          setProductImageThumb({
            Rings: arrImgStackThumb,
            Bracelets: arrImgStackThumb,
            Earings: arrImgStackThumb,
          })
          setproductName({
            Rings: arrTitle,
            Bracelets: arrTitle,
            Earings: arrTitle,
          })
          setproductPrice({
            Rings: arrPrice,
            Bracelets: arrPrice,
            Earings: arrPrice,
          })
          setItems(result)
        },
        error => {
          setIsLoaded(true)
          setError(error)
        }
      )
    //========================
    const KoordinatsLS = localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinats))
    const dragableStatus = localStorage.setItem('dragableStatus', false)
    // localStorage.setItem('IndexParams', 0)
    onSelectModel(0)

    // setParams(queryParams) // ???

    // console.log(productImageThumb)
    // console.log(ProductPrice)
  }, [ProductPrice, onSelectModel, productImageThumb])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return ProductPrice
  }
}
