import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {WalletConnectConnector} from "wagmi/connectors/walletConnect";
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { Buffer } from 'buffer'

// polyfill Buffer for client
if (!window.Buffer) {
    window.Buffer = Buffer
}

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    publicProvider(),
])

export default function Profile({setAccount}) {
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

    if (data) {
        setAccount(data.address)
        return (
            <div>
                Connected to {data.address}
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        )

    }
    return <button onClick={() => connect()}>Connect Wallet</button>
}
