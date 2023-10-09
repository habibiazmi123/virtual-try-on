import { create } from 'zustand'

const useParamsStore = create(set => ({
  id_cat: undefined,
  cat: undefined,
  login: undefined,
  customer_id: undefined,
  setParams: params =>
    set(state => ({
      ...params,
    })),
}))

export default useParamsStore
