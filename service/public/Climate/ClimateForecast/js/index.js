var colors = ['#5793f3', '#d14a61', '#675bba'];

option = {
    color: colors,
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data:['火电发电量(亿度)', '风+光发电量(亿度)','水+核能发电量(亿度)'],
        icon: 'roundRect',
        textStyle: {
        	color: '#fff'
        }
    },
    grid: {
        top: 30,
        bottom: 60
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
            	color:'#fff',
            	interval: 0,
            	fontSize :12,
            	rotate:45,
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                	show: false,
                    formatter: function (params) {
                        return params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: [
            	"2020", "2022", 
            	"2024E", "2026E", 
            	"2028E", "2030E",  
            	"2032E", "2034E", 
            	"2036E", "2038E", 
            	"2040E", "2042E",  
            	"2044E", "2046E", 
            	"2048E", "2050E", 
            	"2052E", "2054E", 
            	"2056E", "2058E", 
            	"2060E", ]
        }
    ],
    yAxis: [
        {
            type: 'value',
            max : 300000,
            axisLabel: {
            	color:'#fff',
            	interval: 0,
            	fontSize :12,
            	formatter: '{value}'
            },
            min: 0,
            splitLine: {
                show: false
            },
           data: [1, 2, 3, 4, 5, 6, 7,8]
        }
    ],
    series: [
       
        {
            name:'火电发电量(亿度)',
            type:'line',
            symbol: 'circle',
	        symbolSize: 15,
	        smooth: true,
	        itemStyle: {
	            normal: {
	            	show: false,
	                color: '#DC143C',
	                opacity: 0
	            },
	            emphasis: {
	            	color: '#DC143C',
	            }
	        },
	        lineStyle: {
	            normal: {
					color: '#DC143C',
	            }
	        },
          	data: [49800,49500,45900,41000,38400,36100,31000,28000,
          			24400,21700,19600,17200,15300,12070,10600,9900,6800,4100,2500,960,0]
        },{
        	type: 'line',
	        name: '风+光发电量(亿度)',
	        symbol: 'circle',
	        symbolSize: 15,
	        smooth: true,
	        itemStyle: {
	            normal: {
	            	show: false,
	                color: '#7fffaa',
	                opacity: 0
	            },
	            emphasis: {
	            	color: '#7fffaa',
	            }
	        },
	        lineStyle: {
	            normal: {
					color: '#7fffaa',
	            }
	        },
	        data: [9300,10974,12949,15280,18030,21276,25105,29624,
	        	34957,41249,48674,57436,67774,79974,94369,111355,131399,155051,182961,215894,254755],
        },
        {
        	type: 'line',
	        name: '水+核能发电量(亿度)',
	        symbol: 'circle',
	        symbolSize: 15,
	        smooth: true,
	        itemStyle: {
	            normal: {
	                color: '#ffbe0d',
	                opacity: 0
	            },
	            emphasis: {
	            	color: '#ffbe0d',
	            }
	        },
	        lineStyle: {
	            normal: {
					color: '#ffbe0d',
	            }
	        },
	        data: [23200,23664,24137,24620,25112,25614,26126,26649,27182,
	        		27726,28280,28846,29423,30011,30611,31224,31848,32485,33135,33798,34473],
        }
    ]
};


optionbtm = {
    color: colors,

    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data:['燃料电池货车销量(万辆)', '燃料电池客车销量(万辆)'],
        icon: 'roundRect',
        textStyle: {
        	color: '#fff'
        }
    },
    grid: {
        top: 30,
        bottom: 60
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
            	color:'#fff',
            	interval: 0,
            	fontSize :12,
            	rotate:45,
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                	show: false,
                    formatter: function (params) {
                        return params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: ["2020", "2022", 
            	"2024E", "2026E", 
            	"2028E", "2030E",  
            	"2032E", "2034E", 
            	"2036E", "2038E", 
            	"2040E", "2042E",  
            	"2044E", "2046E", 
            	"2048E", "2050E", 
            	"2052E", "2054E", 
            	"2056E", "2058E", 
            	"2060E",]
        }
    ],
    yAxis: [
        {
            type: 'value',
            max : 180,
            axisLabel: {
            	color:'#fff',
            	interval: 0,
            	fontSize :12,
            	formatter: '{value}'
            },
            min: 1,
            splitLine: {
                show: false
            },
        }
    ],
    series: [
       
        {
            name:'燃料电池货车销量(万辆)',
            type:'line',
            symbol: 'circle',
	        symbolSize: 15,
	        smooth: true,
	        itemStyle: {
	            normal: {
	            	show: false,
	                color: '#DC143C',
	                opacity: 0
	            },
	            emphasis: {
	            	color: '#DC143C',
	            }
	        },
	        lineStyle: {
	            normal: {
					color: '#DC143C',
	            }
	        },
	        data: [2.00,2.4,2.88,3.46,4.15,4.97,7.46,11.18,16.77,
	        	25.16,37.74,56.61,84.92,127.38,129.93,132.53,135.18,137.88,140.64,143.45,146.32]
        },{
        	type: 'line',
	        name: '燃料电池客车销量(万辆)',
	        symbol: 'circle',
	        symbolSize: 15,
	        smooth: true,
	        itemStyle: {
	            normal: {
	            	show: false,
	                color: '#00eef8',
	                opacity: 0
	            },
	            emphasis: {
	            	color: '#00eef8',
	            }
	        },
	        lineStyle: {
	            normal: {
					color: '#00eef8',
	            }
	        },
	        data: [1.3,1.63,2.03,2.54,3.17,3.97,4.95,6.19,7.75,9.69,12.11,15.13,18.92,23.65,23.89,24.13,24.37,24.61,24.86,25.10,25.36],
        }
    ]
};


//中间的图
optioncenter = {
    color: colors,

    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data:['工业部门', '建筑部门','交通部门'],
        icon: 'roundRect',
        textStyle: {
        	color: '#fff'
        }
    },
    grid: {
        top: 30,
        bottom: 60
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
            	color:'#fff',
            	interval: 0,
            	fontSize :12,
            	rotate:45,
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                	show: false,
                    formatter: function (params) {
                        return params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: ["2017", "2025E", "2035E", "2050E"]
        }
    ],
    yAxis: [
        {
            type: 'value',
            max : 100,
            axisLabel: {
            	color:'#fff',
            	interval: 0,
            	fontSize :12,
            	formatter: '{value}'
            },
            min: 1,
            splitLine: {
                show: false
            },
           data: [1, 2, 3, 4, 5, 6, 7,8]
        }
    ],
    series: [
       
        {
            name:'工业部门',
            type:'line',
	        symbol: 'circle',
	        symbolSize: 15,
	        smooth: true,
	        itemStyle: {
	            normal: {
	            	show: false,
	                color: '#ff00f8',
	                opacity: 0
	            },
	            emphasis: {
	            	color: '#ff00f8',
	            }
	        },
	        lineStyle: {
	            normal: {
					color: '#ff00f8',
	            }
	        },
          data: [28,36,43,51]
        },{
        	type: 'line',
	        name: '建筑部门',
	        symbol: 'circle',
	        symbolSize: 15,
	        smooth: true,
	        itemStyle: {
	            normal: {
	            	show: false,
	                color: '#00eef8',
	                opacity: 0
	            },
	            emphasis: {
	            	color: '#00eef8',
	            }
	        },
	        lineStyle: {
	            normal: {
					color: '#00eef8',
	            }
	        },
	        data: [39,44,56,63],
        },
        {
        	type: 'line',
	        name: '交通部门',
	        symbol: 'circle',
	        symbolSize: 15,
	        smooth: true,
	        itemStyle: {
	            normal: {
	                color: '#ffbe0d',
	                opacity: 0
	            },
	            emphasis: {
	            	color: '#ffbe0d',
	            }
	        },
	        lineStyle: {
	            normal: {
					color: '#ffbe0d',
	            }
	        },
	        data: [2,6,14,35],
        }
    ]
}
