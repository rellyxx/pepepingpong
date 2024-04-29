"use client"
import { useEffect } from "react";
import img1 from "~~/public/img/Group 18702.svg";
import Image from "next/image";
import { Divider } from "@mui/material";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


const option = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '40px', 
    },
    legend: {
        show: false
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Jan21', 'Jan28', 'Feb04', 'Feb11', 'Feb18', 'Feb25', 'Feb30']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} %'
        }
    },
    series: [

        {
            name: 'Lowest',
            type: 'line',
            smooth: true, 
            symbol: 'none',
            lineStyle: {
                color: '#08BFBF', // 设置为红色
                width: 1,
                // 其他样式配置...
            },
            data: [1, -2, 2, 5, 3, 2, 0],
            // markPoint: {
            //     data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
            // },
            markLine: {
                data: [
                    { type: 'average', name: 'Avg',
                
                    label: {
                        formatter: function(params: { value: number; }) {
                            return 'Avg: ' + params.value.toFixed(2); + '%'// 显示 Avg Value 和平均数值，并保留两位小数
                          },
                      },
                    },
                    [
                        {
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        },
                        {
                            symbol: 'circle',
                            label: {
                                position: 'start',
                                formatter: 'Max'
                            },
                            type: 'max',
                            name: '最高点'
                        }
                    ]
                ]
            }
        }
    ]
};

    
const series =  [25];
const type = "radialBar" as any

const radialOption = {
    colors: ["#FC81E8"],
    chart: {
        height: "120px",
        width: "120px",
        type: type,
        sparkline: {
            enabled: true,
        },

    },
    plotOptions: {
        radialBar: {
            startAngle: -90,
            track: {
                background: '#F9F0FB',
            },
            dataLabels: {
                show: true,
                name: {
                    show: false,
                },
                value: {
                    formatter: function (val: string) {
                        return parseFloat(val).toFixed(2) + "%";
                    },
                    offsetY: 5,
                    color: '#111',
                    fontSize: '10px',
                    show: true,
                }
            },
            hollow: {
                margin: 0,
                size: "40%",
            }
        },
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -3,
            bottom: -1,
        },
    },
    labels: ["Supply APR"],
    stroke: {
        lineCap: 'round'
    },
    legend: {
        show: true,
        position: "bottom" as any,
        fontSize: '8px',
        offsetY: -20,
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    yaxis: {
        show: true,
        labels: {
            formatter: function (value: string) {
                return value + '%';
            }
        }
    }
} as any
const Detail = () => {

    useEffect(() => {
        if (document.getElementById("area-chart")) {
            var chartDom = document.getElementById('area-chart');
            var myChart = echarts.init(chartDom);
            option && myChart.setOption(option);
        }
    }, [])



  

    return (
        <div className="p-4">
            <strong>
                Reserve status & configuration
            </strong>
            <section className="flex py-4">
                <div className="text-sm pt-8">
                    <div className="w-36">
                    Supply Info

                    </div>
                </div>
                <div className='flex-auto'>
                    <div className="flex">
                        <ApexChart type="radialBar" options={radialOption} series={series} height={200} width={120} />
                        <div className="flex gap-4">
                            <div className="flex flex-col mt-8">
                                <div className="flex gap-1">
                                    <span className="text-gray-400 text-xs ">Total supplied</span> <Image src={img1} alt="" />
                                </div>
                                <div className="flex gap-1 items-center">
                                    <strong>321.08K</strong>
                                    <span className="text-gray-400 text-xs flex gap-1">of</span>
                                    <strong>1.32M</strong>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <span className="text-gray-400 text-xs flex gap-1">$3.00B</span>
                                    <span className="text-gray-400 text-xs flex gap-1">of</span>
                                    <span className="text-gray-400 text-xs flex gap-1">$4.01B</span>
                                </div>
                            </div>
                            <Divider style={{ background: '#a6adbb4d', height: "31px", width: 1, marginTop: '2rem' }} />
                            <div className="flex flex-col mt-8">
                                <div className="flex gap-1">
                                    <span className="text-gray-400 text-xs ">APY</span> <Image src={img1} alt="" />
                                </div>
                                <div className="flex gap-1 items-center">
                                    <strong>{"<0.01%"}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <ReactECharts option={option} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <div>Collateral usage</div> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#08BF33]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <div className="text-[#08BF33]">Can be collateral</div> 
                        </div>
                        <div className="flex gap-2">
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[11.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Max LTV</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[13.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Liquidation threshold</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[13.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Liquidation penalty</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
            <Divider className="w-full  h-4"/>
            <section className="flex py-4">
                <div className="text-sm pt-8">
                    <div className="w-36">
                        Borrow Info
                    </div>
                </div>
                <div className='flex-auto'>
                    <div className="flex">
                        <ApexChart type="radialBar" options={radialOption} series={series} height={200} width={120} />
                        <div className="flex gap-4">
                            <div className="flex flex-col mt-8">
                                <div className="flex gap-1">
                                    <span className="text-gray-400 text-xs ">Total supplied</span> <Image src={img1} alt="" />
                                </div>
                                <div className="flex gap-1 items-center">
                                    <strong>321.08K</strong>
                                    <span className="text-gray-400 text-xs flex gap-1">of</span>
                                    <strong>1.32M</strong>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <span className="text-gray-400 text-xs flex gap-1">$3.00B</span>
                                    <span className="text-gray-400 text-xs flex gap-1">of</span>
                                    <span className="text-gray-400 text-xs flex gap-1">$4.01B</span>
                                </div>
                            </div>
                            <Divider style={{ background: '#a6adbb4d', height: "31px", width: 1, marginTop: '2rem' }} />
                            <div className="flex flex-col mt-8">
                                <div className="flex gap-1">
                                    <span className="text-gray-400 text-xs ">APY</span> <Image src={img1} alt="" />
                                </div>
                                <div className="flex gap-1 items-center">
                                    <strong>{"<0.01%"}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <ReactECharts option={option} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <div>Collateral usage</div> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#08BF33]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <div className="text-[#08BF33]">Can be collateral</div> 
                        </div>
                        <div className="flex gap-2">
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[11.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Max LTV</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[13.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Liquidation threshold</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[13.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Liquidation penalty</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
            <Divider className="w-full h-4"/>
            <section className="flex py-4">
                <div className="text-sm">
                    <div className="w-36">
                        E-Mode Info
                    </div>
                </div>
                <div className='flex-auto'>
                
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <div>Collateral usage</div> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#08BF33]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <div className="text-[#08BF33]">Can be collateral</div> 
                        </div>
                        <div className="flex gap-2">
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[11.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Max LTV</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[13.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Liquidation threshold</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                                <div className="border border-gray-400 rounded p-2 flex flex-col w-[13.125rem]">
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-400">Liquidation penalty</div> 
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                            <circle cx="5.5" cy="5.5" r="5" stroke="black"/>
                                            <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div >60.00%</div>
                                </div>
                        </div>
                        <div className="text-xs text-gray-400">
                        E-Mode increases your LTV for a selected category of assets, meaning that when E-mode is enabled, vou will have higheborrowing power over assets of the same E-mode category which are defined by Aave Governance, You can enter E-Modfrom your Dashboard, To learn more about E-Mode and applied restrictions in FAQ or Aave V3 Technical Paper.
                        </div>
                    </div>
                </div>
            </section>
            <Divider className="w-full h-4"/>
            <section className="flex py-4">
                <div className="text-sm ">
                    <div className="w-36">
                        Interest rate model
                    </div>
                </div>
                <div className='flex-auto'>
                
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-gray-400 text-sm">Utilization Rate</div> 
                            <div className="text-sm">0.53%</div> 
                        </div>
                        <div className="w-full">
                            <ReactECharts option={option} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Detail