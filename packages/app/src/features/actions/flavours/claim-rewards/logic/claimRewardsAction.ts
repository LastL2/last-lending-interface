import { incentiveControllerAbi } from '@/config/abis/incentiveControllerAbi'
import { ensureConfigTypes } from '@/domain/hooks/useWrite'
import { aaveDataLayerQueryKey } from '@/domain/market-info/aave-data-layer/query'
import { getBalancesQueryKeyPrefix } from '@/domain/wallet/getBalancesQueryKeyPrefix'
import { ActionConfig, ActionContext } from '../../../logic/types'
import { ClaimRewardsAction } from '../types'

export function createClaimRewardsActionConfig(action: ClaimRewardsAction, context: ActionContext): ActionConfig {
  const { account, chainId } = context

  return {
    getWriteConfig: () => {
      return ensureConfigTypes({
        address: action.incentiveControllerAddress,
        abi: incentiveControllerAbi,
        functionName: 'claimAllRewards',
        args: [action.assets, account],
      })
    },

    invalidates: () => [aaveDataLayerQueryKey({ chainId, account }), getBalancesQueryKeyPrefix({ chainId, account })],
  }
}