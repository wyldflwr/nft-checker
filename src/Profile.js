import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {WalletConnectConnector} from "wagmi/connectors/walletConnect";
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    publicProvider(),
])

export default function Profile() {
    const { data } = useAccount()
    const { connect } = useConnect({
        connector: new WalletConnectConnector({
            chains,
            options: {
                qrcode: true,
            }
        })
    })
    const { disconnect } = useDisconnect()

    if (data)
        return (
            <div>
                Connected to {data.address}
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        )
    return <button onClick={() => connect()}>Connect Wallet</button>
}
