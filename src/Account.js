import { useAccount, useEnsName, useBalance } from 'wagmi'

export default function Account() {
  const { data: accountData } = useAccount()
  const {data: balanceData} = useBalance()
  const { data: ensNameData } = useEnsName({ address: accountData?.address })
  console.log('accountBalance: ', balanceData)
  // console.log('accountBalance: ', data)
  return (
    <div>

      {ensNameData ?? accountData?.address}
      {ensNameData ? ` (${accountData?.address})` : null}
    </div>
  )
}
