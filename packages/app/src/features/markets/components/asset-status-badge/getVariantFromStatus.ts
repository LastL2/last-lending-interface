import { MarketAssetStatus } from '@/domain/market-info/reserve-status'

type StatusVariant = 'white' | 'gray' | 'orange' | 'red'

export function getVariantFromStatus(status: MarketAssetStatus): StatusVariant {
  if (status === 'yes') {
    return 'white'
  }
  if (status === 'no') {
    return 'gray'
  }
  if (status === 'supply-cap-reached' || status === 'borrow-cap-reached') {
    return 'red'
  }
  return 'orange'
}
