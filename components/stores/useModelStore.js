import { create } from 'zustand'
import { Koordinats } from '../koordinat'
import { VIEW_ON_MODEL } from '../values/view_modes'

const useModelStore = create(set => ({
  index_selected: 0,
  koordinats: { ...Koordinats },
  footer_params: {
    img_list: [],
    ProductImageThumb: {},
    ProductImage: {},
    productName: {},
    productPrice: {},
    productID: {},
  },
  view_mode: VIEW_ON_MODEL,
  onSelect: index => set({ index_selected: index }),
  setKoordinats: obj => set({ koordinats: { ...obj } }),
  setFooterParams: obj => set(state => ({ footer_params: { ...state.footer_params, ...obj } })),
  setImgList: list => set(state => ({ footer_params: { ...state.footer_params, img_list: list } })),
  setViewMode: v => set({ view_mode: v }),
}))

export default useModelStore
