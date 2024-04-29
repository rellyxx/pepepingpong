import { useState } from "react"
import TokenInput from "./TokenInput"

interface Props {
    defaultValue1:string;
    defaultValue2:string;
}

const SwitchToken = (props:Props)=>{

    const {defaultValue1,defaultValue2} = props;

    const [ value1, setValue1 ] = useState(defaultValue1)
    const [ value2, setValue2 ] = useState(defaultValue2)

    const handleSwitchValue = () =>{
            setValue1(value2)
            setValue2(value1)
    }

    return (
        <div>   
                <TokenInput hideLabel tokenType={value1} />
                    <div className="flex justify-center items-center">
                        <div onClick={handleSwitchValue} className="rounded-full border w-[2rem] h-[2rem] p-1 my-[-4px] bg-white z-10 flex items-center justify-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </div>
                    </div>
                <TokenInput hideLabel hideBalance tokenType={value2} />
        </div>
    )
}

export default SwitchToken;