import React,{useState} from 'react';
import Lottie from "react-lottie";
import animationData from "../loading.jsom";
import { useSelector } from "react-redux";
import ".Process.scss";

function Process() {
    const [play, setPlay] = useState(false);

    const state = useSelector((state)=> state.processReducer);

    const defaultOptions={
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings:{
            preserveAspectRatio: "xMidYMid slice",
        },
    };
  return (
    <div className='Process'>
    <h5>
        Seceret Key : <span>"obvwoqcbv21801f19d0zibcoavwpnq"</span>
    </h5>
    <div className='incomming'>
        <h4>Incomming Data</h4>
        <p>{state.cypher}</p>
    </div>
    <Lottie
    options={defaultOptions}
    height={150}
    width={150}
    isStopped={play} />
    <div className='crypt'>
        <h4>Decypted </h4>
    </div>    
    </div>
  )
}

export default Process