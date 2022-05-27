import {QrReader} from 'react-qr-reader';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi'
import {useEffect, useState} from "react";
import { CSSTransition } from 'react-transition-group';
import { publicProvider } from 'wagmi/providers/public'
import Modal from 'react-modal'
import Lottie from 'react-lottie';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Buffer } from 'buffer'

import Profile from './Profile'
import Account from './Account'
import {contract} from "./ValidateTicket";
import * as tickAnimation from './lottie/tick.json'
import * as errorAnimation from './lottie/error.json'
const buttonStyle = {
    display: 'block',
    margin: '10px auto'
};


// polyfill Buffer for client
if (!window.Buffer) {
    window.Buffer = Buffer
}

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    publicProvider(),
])

const client = createClient({
    autoConnect: true,
    connectors: [
    new WalletConnectConnector({
        chains,
        options: {
            qrcode: true,
        },
    }),],
})


const tickOptions = {
    loop: false,
    autoplay: true,
    animationData: tickAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}
const errorOptions = {
    loop: false,
    autoplay: true,
    animationData: errorAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}
const Home = () => {
    const [isOpen, setOpen] = useState(false);
    const [isPaused, setPaused] = useState(false);
    const [isStopped, setStopped] = useState(false);
    const [isNftOwner, setNftOwner] = useState(true);
    const [address, setAddress] = useState('');
    const toggleModal = () => setOpen(!isOpen);
    const [accountData, setAccountData] = useState('');

    useEffect(() => {
        checkNfts(accountData);
    }, [accountData])

    const checkNfts = async (address) => {
        const res = await contract.balanceOfBatch([address, address], ['36567795427009012407374235082263121169480817132740453451039498777278430576680', '36567795427009012407374235082263121169480817132740453451039498778377942204446'])
        if (res[0].toNumber() + res[1].toNumber() > 0) {
            setNftOwner(true);
            setOpen(true);
        } else {
            setNftOwner(false);
            setOpen(true);
        }
    }

    const onScan = (result, error) => {
        if (!!result) {
            if (!!result.text) {
                if (result.text.length === 42) {
                    let address = result.text
                    checkNfts(address);
                    setAddress(address)
                } else if (result.text.slice(0,9) === 'ethereum:') {
                    let address = result.text.slice(9,51);
                    checkNfts(address);
                    setAddress(address)
                }

            }
        }

    }
    const modalStyles = {
        overlay: {
            alignSelf: 'center',
            padding: 50,
            backgroundColor: 'transparent',
            width: '80%',
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center'
        },
    };
    return (
        <div style={{flex: 1, backgroundColor: '#dfcccb',         justifyContent: 'center',
            alignItems: 'center'
        }}>
            <WagmiConfig client={client}>
                <Profile setAccount={setAccountData}/>
            </WagmiConfig>
            <QrReader
                onResult={onScan}
                style={{ height: '100%', width: '100%' }}
            >
            </QrReader>
            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames="dialog"
            >
                <Modal
                    isOpen={isOpen}
                    style={modalStyles}
                >
                    <button onClick={toggleModal}>
                        Close
                    </button>
                    <div style={{margin: 20}}>
                        {isNftOwner ?
                            <Lottie
                                options={tickOptions}
                                height={'50%'}
                                width={'50%'}
                                isStopped={isStopped}
                                isPaused={isPaused}/> :
                            <Lottie options={errorOptions}
                                    height={'50%'}
                                    width={'50%'}
                                    isStopped={isStopped}
                                    isPaused={isPaused}/>
                        }
                    </div>

                </Modal>

            </CSSTransition>
        </div>
    )
}

export default Home
