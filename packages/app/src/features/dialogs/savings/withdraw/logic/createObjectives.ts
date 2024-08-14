import { TokenWithBalance } from '@/domain/common/types'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { WithdrawFromSavingsObjective } from '@/features/actions/flavours/withdraw-from-savings/types'
import { SavingsDialogFormNormalizedData } from '../../common/logic/form'
import { Mode } from '../types'

export interface CreateObjectivesParams {
  formValues: SavingsDialogFormNormalizedData
  receiver: CheckedAddress | undefined
  mode: Mode
  savingsTokenWithBalance: TokenWithBalance
}
export function createObjectives({
  formValues,
  receiver,
  mode,
  savingsTokenWithBalance,
}: CreateObjectivesParams): WithdrawFromSavingsObjective[] {
  const isMaxSelected = formValues.isMaxSelected

  return [
    {
      type: 'withdrawFromSavings',
      token: formValues.token,
      amount: isMaxSelected ? savingsTokenWithBalance.balance : formValues.value,
      isMax: isMaxSelected,
      savingsToken: savingsTokenWithBalance.token,
      receiver,
      mode,
    },
  ]
}