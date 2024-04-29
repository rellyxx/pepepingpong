interface Props {
    height?: number | string;
    width?: number | string;
    onClick?:()=>void;
    children: any;
    type?: string;
}
const ButtonWithBg = (props: Props)=>{
    const { height=50, width=200, onClick, type="bgbtn" } = props;
    return (
        <button onClick={onClick} style={{height: height, width: width}} 
        className={`${type} bgbtn bg-contain bg-no-repeat bg-center border-none text-white text-base text-center cursor-pointer`}
        >
            {props.children}
        </button>
    )
}

export default ButtonWithBg;