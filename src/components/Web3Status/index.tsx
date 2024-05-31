import { useAccount } from '@starknet-react/core'
import { useL2WalletOverviewModal, useWalletConnectModal } from 'src/hooks/useModal'
import * as Icons from 'src/theme/components/icons'
import { shortenL2Address } from 'src/utils/address'

import { SecondaryButton } from '../Button'
import { Row } from '../Flex'
import WalletConnectModal from '../WalletModal/Connect'
import { L2WalletOverviewModal } from '../WalletModal/Overview'

function Web3StatusContent() {
  const { address: l2Account } = useAccount()

  // modal
  const [, toggleWalletConnectModal] = useWalletConnectModal()
  const [, toggleL2WalletOverviewModal] = useL2WalletOverviewModal()

  if (l2Account) {
    return (
      <Row gap={8}>
        <SecondaryButton onClick={toggleL2WalletOverviewModal} withIcon>
          <Row gap={8}>
            <Icons.Starknet width={16} />

            {shortenL2Address(l2Account)}
          </Row>
        </SecondaryButton>
      </Row>
    )
  } else {
    return <SecondaryButton onClick={toggleWalletConnectModal}>Connect wallet</SecondaryButton>
  }
}

export default function Web3Status() {
  return (
    <>
      <Web3StatusContent />

      <WalletConnectModal />
      <L2WalletOverviewModal />
    </>
  )
}
