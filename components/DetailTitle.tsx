'use client'

import { useState } from "react";
import TokenIcon from "./TokenIcon";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Divider } from "@mui/material";



interface Props {
    tokenType: string;
    title: string;
}
const DetailTitle = (props: Props) => {
    const { tokenType, title } = props;
    const handleBack = ()=>{
        history.back()
    }
    return (
        <div className="min-h-[12.5rem] bg-black text-white px-16 pt-10 pb-20 mb-[-4.25rem] ">
            <div className="flex items-center px-5">
                <div onClick={handleBack} className="btn btn-sm border-white text-white border-opacity-[0.1] h-[36px] btn-secondary rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Go Back
                </div>
                <div tabIndex={0} className="m-1 btn bg-inherit text-white text-lg border-[0px] hover:bg-inherit">
                    <TokenIcon type={tokenType} />
                    {title}
                    <div className="badge badge-xs text-[.5625rem] mb-2 border-[0px] text-white bg-gradient-to-r from-[#E600A6] to-[#FFC850]">V1</div>
                </div>
            </div>
            <section className="flex gap-8 px-5">
                <div className="flex items-center gap-2">
                    <TokenIcon type="btc" />
                    <div className="flex flex-col">
                        <span className="text-gray-400">WBTC</span>
                        <div className="flex gap-2 items-center">
                            <strong className="text-lg">Wrapped BTC</strong>
                            <div className="tooltip" data-tip="View token contracts">
                                <div className="rounded-btn border border-gray-400 bg-slate-600 hover:text-gray-400 w-6 h-6 flex items-center justify-center cursor-pointer">
                                    <OpenInNewRoundedIcon style={{ fontSize: 14 }} />
                                </div>
                            </div>
                            <div className="tooltip" data-tip="Add token to wallet">
                                <div className="rounded-btn border border-gray-400 bg-slate-600 hover:text-gray-400 w-6 h-6 flex items-center justify-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[.875rem] h-[.875rem]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider style={{ background: '#a6adbb4d', height: "51px", width: 1 }} />
                <div className="flex flex-col">
                    <span className="text-gray-400">Reserve Size</span>
                    <strong className="text-lg">$10.00K</strong>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400">Available liquidity</span>
                    <strong className="text-lg">$10.00K</strong>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400 ">Utilization Rate</span>
                    <strong className="text-lg">-0.16%</strong>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400">Oracle price</span>
                    <strong className="text-lg">$10.00K</strong>
                </div>
                {/* <div className="flex flex-col">
                    <span className="text-gray-400 ">Health factor</span>

                    <strong className="text-[#F89F1A] flex items-center gap-2 text-lg   ">1.12
                        <div className="badge badge-xs rounded-sm text-[.5625rem] border-[0px] text-white bg-gray-700">RISK DETAILS</div>
                    </strong>
                </div> */}

            </section>
        </div>
    )
}
export default DetailTitle;