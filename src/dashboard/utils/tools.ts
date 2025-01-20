import type { InitialSetting } from "../environment/types/reducer"

export const isEdit = (status: InitialSetting['status']) => {
  if (status == 'edit') { return true }
  return false
}

export function toCurrency(value: string | number) {
  const local = 'en-US'
  const options: Intl.NumberFormatOptions = { style: 'currency', currency: 'USD' }

  if (typeof value == 'number') {
    return value.toLocaleString(local, options)
  }
  return parseFloat(value).toLocaleString(local, options)
}