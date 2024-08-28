import { getChainConfigEntry } from '@/config/chain'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { cn } from '@/ui/utils/style'
import { mainnet } from 'viem/chains'
import { FarmTile, FarmTileProps } from '../components/farm-tile/FarmTile'

export interface FarmsViewProps {
  activeFarms: FarmTileProps[]
  inactiveFarms: FarmTileProps[]
}

export function FarmsView({ activeFarms, inactiveFarms }: FarmsViewProps) {
  const { logo: chainLogo, name: chainName } = getChainConfigEntry(mainnet.id).meta
  return (
    <PageLayout className="max-w-5xl gap-8 px-3 lg:px-0">
      <div className="flex flex-row items-center gap-4">
        <Typography variant="h2">Farms</Typography>
        <div className="flex translate-y-0.5 flex-row items-center gap-1">
          <img src={chainLogo} className="h-5 w-5" />
          <Typography className="font-semibold text-primary text-xs">{chainName}</Typography>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {activeFarms.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className={cn('font-semibold text-xl', inactiveFarms.length === 0 && 'hidden')}>Active farms</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 md:gap-8">
              {activeFarms.map((farm) => (
                <FarmTile key={farm.detailsLink} {...farm} />
              ))}
            </div>
          </div>
        )}
        {activeFarms.length > 0 && inactiveFarms.length > 0 && <div className="border-basics-border border-t" />}
        {inactiveFarms.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className={cn('font-semibold text-xl', activeFarms.length === 0 && 'hidden')}>Available farms</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 md:gap-8">
              {inactiveFarms.map((farm) => (
                <FarmTile key={farm.detailsLink} {...farm} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}