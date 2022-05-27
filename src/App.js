import {QrReader} from 'react-qr-reader';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi'
import {useState} from "react";
import { CSSTransition } from 'react-transition-group';
import { publicProvider } from 'wagmi/providers/public'
import Modal from 'react-modal'
import Lottie from 'react-lottie';
import Profile from './Profile'
import * as tickAnimation from './lottie/tick.json'
import * as errorAnimation from './lottie/error.json'
const buttonStyle = {
    display: 'block',
    margin: '10px auto'
};




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
    const [data, setData] = useState({});
    const [isOpen, setOpen] = useState(false);
    const [isPaused, setPaused] = useState(false);
    const [isStopped, setStopped] = useState(false);
    const [isNftOwner, setNftOwner] = useState(true);
    const toggleModal = () => setOpen(!isOpen);
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
                <Profile />
            </WagmiConfig>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setOpen(true);
                        console.log('scanned: ', result?.text);
                        setData(result);
                    }

                    console.log('scanned: ', result)
                }}
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
                    <button onClick={toggleModal}>
                        Close Modal
                    </button>
                    <button onClick={() => setNftOwner(false)}>
                        Set Error
                    </button>
                    <button onClick={() => setNftOwner(true)}>
                        Set As Owner
                    </button>
                </Modal>

            </CSSTransition>
        </div>
    )
}

export default Home
