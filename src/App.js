import {QrReader} from 'react-qr-reader';
import {useState} from "react";
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal'
import Lottie from 'react-lottie';
import * as tickAnimation from './lottie/tick.json'
import * as errorAnimation from './lottie/error.json'
const buttonStyle = {
  display: 'block',
  margin: '10px auto'
};

const tickOptions = {
  loop: true,
  autoplay: true,
  animationData: tickAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const errorOptions = {
  loop: true,
  autoplay: true,
  animationData: errorAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const Home = () => {
  const [data, setData] = useState({});
  const [isOpen, setOpen] = useState(true);
  const [isPaused, setPaused] = useState(true);
  const [isStopped, setStopped] = useState(true);
  const [isNftOwner, setNftOwner] = useState(false);
  const toggleModal = () => setOpen(!isOpen);
  const modalStyles = {
    overlay: {
      backgroundColor: '#000000',
      width: '100%',
      height: '100%'
    },
  };
  return (
      <div style={{flex: 1, backgroundColor: '#dfcccb'}}>
        <QrReader
            onResult={(result, error) => {
              if (!!result) {
                  setNftOwner(!isNftOwner);
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
              {isNftOwner ? <Lottie options={tickOptions}
                    height={400}
                    width={400}
                    isStopped={isStopped}
                    isPaused={isPaused}/> : <Lottie options={errorOptions}
                    height={400}
                    width={400}
                    isStopped={isStopped}
                    isPaused={isPaused}/>
              }
            <button onClick={toggleModal}>
              Close Modal
            </button>
          </Modal>

        </CSSTransition>
      </div>
  )
}

export default Home
