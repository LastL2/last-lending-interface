import { defineConfig } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'
import { base, gnosis, mainnet } from 'wagmi/chains'
import { z } from 'zod'
import 'dotenv/config'

const config: ReturnType<typeof defineConfig> = defineConfig({
  out: 'src/config/contracts-generated.ts',
  contracts: [],
  plugins: [
    etherscan({
      apiKey: z.string().parse(process.env.ETHERSCAN_API_KEY, {
        errorMap: () => ({
          message: "Couldn't process ETHERSCAN_API_KEY env variable",
        }),
      }),
      chainId: mainnet.id,
      contracts: [
        // Aave v3
        {
          name: 'LendingPoolAddressProvider',
          address: {
            [mainnet.id]: '0x02C3eA4e34C0cBd694D2adFa2c690EECbC1793eE',
            [gnosis.id]: '0xA98DaCB3fC964A6A0d2ce3B77294241585EAbA6d',
            // [lastSepolia.id]: '0xA8bd7972D4ca4bFB543d05322232279909F5f4fe',
          },
        },
        {
          name: 'LendingPool',
          address: {
            [mainnet.id]: '0xC13e21B648A5Ee794902342038FF3aDAB66BE987',
            [gnosis.id]: '0x2Dae5307c5E3FD1CF5A72Cb6F698f915860607e0',
            // [lastSepolia.id]: '0x3e9b7D063f0bC642207044360aE91F05F398B793',
          },
        },
        {
          name: 'WETHGateway',
          address: {
            [mainnet.id]: '0xBD7D6a9ad7865463DE44B05F04559f65e3B11704',
            [gnosis.id]: '0xBD7D6a9ad7865463DE44B05F04559f65e3B11704',
            // [lastSepolia.id]: '0x90411906bF54A2b78629A27Dc40038C87e4A8b93',
          },
        },
        {
          name: 'WalletBalanceProvider',
          address: {
            [mainnet.id]: '0xd2AeF86F51F92E8e49F42454c287AE4879D1BeDc',
            [gnosis.id]: '0xd2AeF86F51F92E8e49F42454c287AE4879D1BeDc',
            // [lastSepolia.id]: '0xb786C89F5D785aD1092E02153b09c6223a4443e7',
          },
        },
        {
          name: 'UiPoolDataProvider',
          address: {
            [mainnet.id]: '0xF028c2F4b19898718fD0F77b9b881CbfdAa5e8Bb',
            [gnosis.id]: '0xF028c2F4b19898718fD0F77b9b881CbfdAa5e8Bb',
            // need to update gho-core to aave v3.2.0
          },
        },
        {
          name: 'UiIncentiveDataProvider',
          address: {
            [mainnet.id]: '0xA7F8A757C4f7696c015B595F51B2901AC0121B18',
            [gnosis.id]: '0xA7F8A757C4f7696c015B595F51B2901AC0121B18',
            // need to update gho-core to aave v3.2.0
          },
        },
        {
          name: 'Collector',
          address: {
            [mainnet.id]: '0xb137E7d16564c81ae2b0C8ee6B55De81dd46ECe5',
            [gnosis.id]: '0xb9E6DBFa4De19CCed908BcbFe1d015190678AB5f',
            // need to update gho-core to aave v3.2.0
          },
        },
        {
          name: 'V3Migrator',
          address: {
            [mainnet.id]: '0xe2a3C1ff038E14d401cA6dE0673a598C33168460',
            // not needed - migrator from Aave v2 to v3
          },
        },
        // DAI/MKR
        {
          /**
           * Don't see this used currently
           * */
          name: 'Chainlog',
          address: {
            [mainnet.id]: '0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F',
            // contract registry managed by governance (related to MKR DAO)
          },
        },
        {
          /**
           * Used in savings deposit/withdraw and farms
           * Also used in `useNavbar` (can be removed)
           * */
          name: 'SavingsDai',
          address: {
            [mainnet.id]: '0x83f20f44975d03b1b09e64809b757c47f942beea',
            /// SavingsDai.sol -- A tokenized representation DAI in the DSR (pot)
          },
        },
        {
          /**
           * `domain/d3m-info/D3MInfoQuery.ts
           * Used in market details only for DAI
           * */
          name: 'Vat',
          address: {
            [mainnet.id]: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B',
            /// MKR - vat.sol -- Dai CDP database
          },
        },
        {
          /**
           * `domain/d3m-info/D3MInfoQuery.ts`
           * Used in market details only for DAI
           * */
          name: 'IAMAutoLine',
          address: {
            [mainnet.id]: '0xC7Bdd1F2B16447dcf3dE045C4a039A60EC2f0ba3',
            /// debt ceilings for multi-collateral DAI
          },
        },
        {
          /**
           * Used in debug function `features/debug/index.tsx`
           * `domain/savings-info/mainnetSavingsInfo.ts`
           * Used in savings
           * */
          name: 'Pot',
          address: {
            [mainnet.id]: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7',
            /// pot.sol -- Dai Savings Rate
          },
        },
        {
          /**
           * Used in savings deposit/withdraw for usdc<->susds
           * */
          name: 'PSMActions',
          address: {
            [mainnet.id]: '0x5803199F1085d52D1Bb527f24Dc1A2744e80A979',
            // * @notice Actions for swapping in PSM and depositing in an ERC4626 token.
          },
        },
        //Spark
        {
          /**
           * `features/market-details/logic/useMarketDetails.ts`
           * Used in market details page for certain assets (supply cap, borrow cap)
           * `http://localhost:4000/markets/1/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`
           * */
          name: 'CapAutomator',
          address: {
            [mainnet.id]: '0x2276f52afba7Cf2525fd0a050DF464AC8532d0ef',
            //https://github.com/marsfoundation/sparklend-cap-automator/blob/master/src/CapAutomator.sol
          },
        },
        {
          /**
           * `features/actions/flavours/psm-convert/logic/psmConvertAction.ts`
           * `features/actions/flavours/convert-stables/logic/createConvertStablesActions.ts`
           * Used in convert actions to convert usdc<->usds
           * */
          name: 'UsdsPsmWrapper',
          address: {
            [mainnet.id]: '0xA188EEC8F81263234dA3622A406892F3D630f98c',
            //https://etherscan.io/address/0xa188eec8f81263234da3622a406892f3d630f98c#code
          },
        },
        {
          /**
           * `features/actions/flavours/psm-convert/logic/psmConvertAction.ts`
           * `features/actions/flavours/convert-stables/logic/createConvertStablesActions.ts`
           * Used in convert actions to convert usdc<->dai
           * */
          name: 'DssLitePsm',
          address: {
            [mainnet.id]: '0xf6e72Db5454dd049d0788e411b06CfAF16853042',
            //https://etherscan.io/address/0xf6e72db5454dd049d0788e411b06cfaf16853042#code
          },
        },
        {
          /**
           * `features/actions/flavours/convert-stables/logic/createConvertStablesActions.ts`
           * Used for "upgrading" or "downgrading" dai<->usds and savings deposit/withdraw
           * */
          name: 'MigrationActions',
          address: {
            [mainnet.id]: '0xf86141a5657Cf52AEB3E30eBccA5Ad3a8f714B89',
            //https://etherscan.io/address/0xf86141a5657cf52aeb3e30ebcca5ad3a8f714b89#code
          },
        },
        {
          /**
           * Used in savings deposit/withdraw
           * */
          name: 'UsdsPsmActions',
          address: {
            [mainnet.id]: '0xd0A61F2963622e992e6534bde4D52fd0a89F39E0',
            //https://etherscan.io/address/0xd0a61f2963622e992e6534bde4d52fd0a89f39e0#code
          },
        },
      ],
    }),
    etherscan({
      apiKey: z.string().parse(process.env.GNOSISCAN_API_KEY, {
        errorMap: () => ({
          message: "Couldn't process GNOSISCAN_API_KEY env variable",
        }),
      }),
      chainId: gnosis.id,
      contracts: [
        {
          name: 'SavingsXDaiAdapter',
          address: {
            [gnosis.id]: '0xD499b51fcFc66bd31248ef4b28d656d67E591A94',
          },
        },
        {
          name: 'SavingsXDai',
          address: {
            [gnosis.id]: '0xaf204776c7245bF4147c2612BF6e5972Ee483701',
          },
        },
      ],
    }),
    etherscan({
      apiKey: z.string().parse(process.env.BASESCAN_API_KEY, {
        errorMap: () => ({
          message: "Couldn't process BASESCAN_API_KEY env variable",
        }),
      }),
      chainId: base.id,
      contracts: [
        {
          name: 'SSRAuthOracle',
          address: {
            [base.id]: '0x65d946e533748A998B1f0E430803e39A6388f7a1',
          },
        },
      ],
    }),
  ],
})

export default config
