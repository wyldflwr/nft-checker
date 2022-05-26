import {QrReader} from 'react-qr-reader';
import {useState} from "react";
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal'
import Lottie from 'react-lottie';
import * as animationData from './lottie/tick.json'
const buttonStyle = {
  display: 'block',
  margin: '10px auto'
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const Home = () => {
  const [data, setData] = useState('No result');
  const [isOpen, setOpen] = useState(true);
  const [isPaused, setPaused] = useState(true);
  const [isStopped, setStopped] = useState(true);
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
                console.log('scanned: ', result?.text);
                console.log('scanned');
                setData();
                setOpen(true)
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
            <Lottie options={defaultOptions}
                    height={400}
                    width={400}
                    isStopped={isStopped}
                    isPaused={isPaused}/>
            <button onClick={toggleModal}>
              Close Modal
            </button>
          </Modal>

        </CSSTransition>
        <p>{data}</p>
      </div>
  )
}

export default Home
