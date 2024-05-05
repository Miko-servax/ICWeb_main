 $(window).load(function(){$(".loading").fadeOut()})  
$(function () {

echarts_2()
echarts_3()
echarts_4()
echarts_5()
echarts_6()



function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));
 var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6", "#F57474", "#56D0E3", "#F8B448", "#1089E7", "#F8B448", "#8B78F6"];
  
  // 2. 指定配置和数据
  var option = {
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%"
      // containLabel: true
    },
    // 不显示x轴的相关信息
    xAxis: {
      show: false
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        data: ["2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"],
        // 不显示y轴的线
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: "#fff"
        }
      },
    ],
    series: [
      {
        name: "条",
        type: "bar",
        data: [8.71, 8.96, 8.69, 8.58, 8.18, 8.16, 8.22, 8.15, 8.35, 8.11, 7.08],
        yAxisIndex: 0,
        // 修改第一组柱子的圆角
        itemStyle: {
          barBorderRadius: 20,
          // 此时的color 可以修改柱子的颜色
          color: function(params) {
            // params 传进来的是柱子对象
            // console.log(params);
            // dataIndex 是当前柱子的索引号
            return myColor[params.dataIndex];
          }
        },
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 15,
        // 显示柱子内的文字
        label: {
          show: true,
          position: "inside",
          // {c} 会自动的解析为 数据  data里面的数据
          formatter: "{c}"
        }
      }
    ]
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });


    }
	function echarts_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart3'));
var yearData = [
    {
      year: "2009", // 年份
      data: [
        // 两个数组是因为有两条线
        [160.14, 160.35, 160.73, 161.22, 161.75, 162.49, 162.82, 163.26, 163.78, 163.91, 164.14, 164.33],  //活立木总蓄积量164.33
        [69.5, 68.2, 62.4, 59.8, 61.9, 64.2, 68.3, 62.6, 59.4, 57.2, 58.8, 64.7]   //碳排放总量756.8
      ]
    },
    {
      year: "2010", // 年份
      data: [
        // 两个数组是因为有两条线
        [164.73, 165.17, 165.62, 165.91, 166.36, 166.69, 166.95, 167.23, 167.64, 168.05, 168.47, 168.96],  //168.96
        [75.4, 74.8, 69.6, 67.9, 67.4, 69.6, 70.2, 72.6, 68.3, 68.1, 69.5, 71.8]   //845.2
      ]
    },
    {
      year: "2011", // 年份
      data: [
        // 两个数组是因为有两条线
        [169.27, 169.62, 170.15, 170.47, 170.92, 171.32, 171.79, 172.12, 172.55, 172.96, 173.02, 173.31],  //173.31
        [81.2, 80.5, 78.8, 77.3, 75.3, 76.6, 78.4, 79.2, 73.5, 72.1, 76.4, 78.2]  //927.5
      ]
    },
    {
      year: "2012", // 年份
      data: [
        // 两个数组是因为有两条线
        [173.86, 174.25, 174.67, 175.14, 175.62, 176.06, 176.48, 176.89, 177.48, 177.93, 178.31, 178.87],  //178.87
        [85.1, 84.6, 83.3, 82.2, 80.7, 80.6, 82.4, 84.7, 80.3, 80.6, 79.1, 82.3]     //985.9
      ]
    },
    {
      year: "2013", // 年份
      data: [
        // 两个数组是因为有两条线
        [179.26, 179.78, 180.34, 180.88, 181.28, 181.69, 182.17, 182.52, 182.99, 183.51, 183.97, 184.39],   //184.39
        [86.6, 85.7, 86.9, 83.1, 84.6, 85.1, 85.8, 86.2, 82.7, 82.1, 81.5, 84.2]      //1014.5
      ]
    },
    {
      year: "2014", // 年份
      data: [
        // 两个数组是因为有两条线
        [184.87, 185.48, 185.86, 186.27, 186.68, 187.15, 187.74, 188.42, 188.94, 189.37, 189.71, 190.07],    //190.07
        [85.4, 84.6, 83.2, 82.6, 82.1, 82.4, 84.4, 85.6, 84.1, 82.3, 81.2, 84.7]     //1002.6
      ]
    },
    {
      year: "2015", // 年份
      data: [
        // 两个数组是因为有两条线
        [190.52, 191.03, 191.66, 192.21, 192.68, 193.06, 193.48, 193.89, 194.32, 194.69, 194.98, 195.27],     //195.27
        [84.1, 83.6, 82.8, 81.2, 79.7, 79.6, 81.4, 83.7, 79.3, 80.6, 79.1, 82.3]     //977.4
      ]
    },
    {
      year: "2016", // 年份
      data: [
        // 两个数组是因为有两条线
        [192.64, 192.99, 193.81, 194.38, 194.81, 195.35, 195.91, 196.46, 196.96, 197.67, 198.37, 199.69],        //199.69
        [84.1, 82.6, 81.3, 81.2, 79.7, 79.6, 81.4, 83.7, 79.3, 80.6, 79.1, 81.3]    //973.9
      ]
    },
    {
      year: "2017", // 年份
      data: [
        // 两个数组是因为有两条线
        [201.23, 201.52, 201.93, 202.34, 202.85, 203.24, 203.55, 203.87, 204.13, 204.48, 204.83, 205.31],        //205.31
        [85.9, 85.1, 83.7, 82.6, 83.1, 83.4, 84.4, 85.6, 84.1, 82.3, 81.6, 85.7]    //1007.5
      ]
    },
    {
      year: "2018", // 年份
      data: [
        // 两个数组是因为有两条线
        [205.68, 205.92, 206.27, 206.61, 206.94, 207.38, 207.73, 208.07, 208.56, 209.04, 209.68, 210.74],       //210.74
        [88.1, 88.2, 87.4, 84.6, 86.1, 86.6, 87.5, 87.9, 84.2, 83.6, 83.4, 85.7]     //1033.3
      ]
    },
    {
      year: "2019", // 年份
      data: [
        // 两个数组是因为有两条线
        [211.15, 211.59, 212.01, 212.42, 212.86, 213.23, 213.47, 213.72, 214.14, 214.53, 214.96, 215.29],        //215.29
        [90.3, 90.2, 89.4, 86.6, 87.1, 88.6, 89.5, 89.9, 85.4, 84.6, 85.4, 88.7]    //1055.7
      ]
    },
    {
      year: "2020", // 年份
      data: [
        // 两个数组是因为有两条线
        [215.53, 215.84, 216.14, 216.49, 216.74, 216.99, 217.37, 217.68, 217.95, 218.37, 218.87, 219.71],       //219.71
        [89.1, 89.2, 88.4, 85.6, 87.1, 87.6, 88.5, 88.9, 85.4, 84.6, 84.4, 86.7]     //1045.5
      ]
    },
  ];
 
  // 2.指定配置
  var option = {
    // 通过这个color修改两条线的颜色
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      trigger: "axis"
    },
    legend: {
      // 如果series 对象有name 值，则 legend可以不用写data
      // 修改图例组件 文字颜色
      textStyle: {
        color: "#4c9bfd"
      },
      // 这个10% 必须加引号
      right: "10%"
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true, // 显示边框
      borderColor: "#012f4a", // 边框颜色
      containLabel: true // 包含刻度文字在内
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd" // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      }
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd" // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: "#012f4a" // 分割线颜色
        }
      }
    },
    series: [
      {
        name: "碳排放总量(千万吨)",
        type: "line",
        // true 可以让我们的折线显示带有弧度
        smooth: true,
        data: yearData[0].data[0]
      },
      {
        name: "活立木总蓄积量(亿立方米)",
        type: "line",
        smooth: true,
        data: yearData[0].data[1]
      }
    ]
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });

  // 5.点击切换效果
  $(".tit").on("click", "a", function() {
    // alert(1);
    // console.log($(this).index());
    // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
    // console.log(yearData[$(this).index()]);
    var obj = yearData[$(this).index()];
    option.series[0].data = obj.data[0];
    option.series[1].data = obj.data[1];
  
    
    // 需要重新渲染
    myChart.setOption(option);
  });
    }


	function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));
        var option = {       
            grid: {
                    left: '0',
            		top: '30',
                    right: '0',
                    bottom: '10',
                    containLabel: true
                },
            legend: {

                    top: 0,
                    textStyle: {
                        color: "#fff",
                },

        itemWidth: 10,  // 设置宽度

        itemHeight: 10, // 设置高度

        },

        tooltip: {

            trigger: 'axis',

            axisPointer: { // 坐标轴指示器，坐标轴触发有效

                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'

            }

        },

        xAxis: {

            type: 'category',

            data: ["第一次","第二次","第三次","第四次","第五次","第六次","第七次","第八次","第九次"],

            axisTick: { //---坐标轴 刻度

                show: true, //---是否显示

            },

            axisLine: { //---坐标轴 轴线

                show: true, //---是否显示

                lineStyle: {

                    color: 'rgba(255,255,255,.1)',

                    width: 1,

                    type: 'dotted',

                },

            },

            axisLabel: {//X轴文字

                textStyle: {

                    fontSize: 8,

                    color: '#fff'

                },

            },

        },

        yAxis: {

            type: 'value',

            splitLine: {//分割线

                show: true,

                lineStyle: {
                    color: 'rgba(255,255,255,.1)',
                    width: 1,
                    type: 'dotted'

                }

            },

            axisLabel: {//Y轴刻度值

                formatter: '{value}',

                textStyle: {

                    fontSize: 12,

                    color: '#fff'

                },

            },

            axisLine: { //---坐标轴 轴线

                show: false, //---是否显示

            },

        },

        series: [ {

            name: '面积(万平方米)',

            type: 'bar',

            data: [12186.23, 11527.74, 12465.28, 13370.35, 15894.09, 17490.92, 19545.22, 20768.73, 22044.62],

            barWidth: 15, //柱图宽度
	
            itemStyle: {

                normal: { //设置颜色的渐变
            barBorderRadius: 50,
                    color: "#4fb69d",

                }

            },

        }]

    };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

	function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));

const legendData = ['车辆数']; //图例
const color = ['#4A99FF', '#4BFFFC']; //线条边框颜色
const legend = {
    //data，就是取得每个series里面的name属性。
    orient: 'vertical',
    icon: 'circle', //图例形状
    padding: 0,
    top: 10,
    right: 20,
    itemWidth: 10, //小圆点宽度
    itemHeight: 10, // 小圆点高度
    itemGap: 10, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
    textStyle: {
        fontSize: 12,
        color: '#00E4FF',
    },
};
const tooltip = {
    show: true,
};
const indicator = [
    {
        name: '低碳状态',
        max: 100,
        color: '#ffffff',
    },
    {
        name: '排放趋势',
        max: 100,
        color: '#ffffff',
    },
    {
        name: '气候雄心',
        max: 100,
        color: '#ffffff',
    },
    {
        name: 'GDP发展',
        max: 100,
        color: '#ffffff',
    },
    {
        name: '森林资源',
        max: 100,
        color: '#ffffff',
    },
    {
        name: '中和水平',
        max: 100,
        color: '#ffffff',
    },
    
];
const dataArr = [
    {
        name: '现状',
        value: [60.53, 41.46, 35.55, 46.5, 4.1, 40.59],
        //中和水平计算方法：20%*低碳状态+25%*排放趋势+10%*气候雄心+30%*GDP发展+15%*森林资源
        symbolSize: 8,
        symbol: 'circle',

        lineStyle: {
            width: 2,
        },
        areaStyle: {
            // 单项区域填充样式
            color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                    {
                        offset: 0,
                        color: color[0],
                    },
                    {
                        offset: 0.5,
                        color: 'rgba(0,0,0,0)',
                    },
                    {
                        offset: 1,
                        color: color[0],
                    },
                ],
                global: false,
            },
            opacity: 1, // 区域透明度
        },
    },
];

option = {
    color,
    legend,
    tooltip,
    radar: {
        center: ['50%', '50%'], //圆心坐标距离左边和上边的距离
        radius: ['1%', '75%'], //内外半径，不写默认是75%
        startAngle: 90, //可以旋转图形
        shape: 'polygon',
        axisName: {
            color: '#ffffff',
            fontSize: 10 ,
        },
        indicator: indicator,
        splitArea: {
            show: true, //默认显示颜色分割区域，不需要显示
        },
        axisLine: {
            show: true, //是否显示十字交叉线
            //指向外圈文本的分隔线样式
            lineStyle: {
                color: '#153269', //线条颜色
            },
        },
        axisLabel: { show: false },
        splitLine: {
            //雷达一圈圈
            show: true,
            lineStyle: {
                type: 'solid',
                color: '#113865', // 雷达一圈圈颜色分隔线颜色
                width: 1, // 分隔线线宽
            },
        },
    },
    series: [
        {
            type: 'radar',
            data: dataArr,
        },
    ],
};


        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

	function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));

        const series = [
            {
                name: '煤炭',
                value: 56
            },
            {
                name: '天然气',
                value: 8.4
            },
            {
                name: '一次电力',
                value: 14.5
            },
            {
                name: '石油',
                value: 18.7
            },
            {
                name: '其他',
                value: 2.4
            }
        ]
        const color = [
            setColor('#9fe8ff', '#66ccff'),
            setColor('#fff7c0', '#ffec8c'),
            setColor('#62ffdf', '#33ffbb'),
            setColor('#ffd59f', '#ffab66'),
            '#7cff33',
            '#5470c6'
        ]
const centerX = '40%'

function setColor(start, end) {
    return {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
            {
                offset: 0,
                color: start // 0% 处的颜色
            },
            {
                offset: 1,
                color: end // 100% 处的颜色
            }
        ]
    }
}

let inter = null
let timer = null
let dataIndex = 0
let countToNum = series
.map(item => item.value)
.reduce((prev, next) => {
    return prev + next
}, 0)

let oldAllRate = 0
series.forEach((o, index) => {
    o.oldAllRate = oldAllRate.toFixed(1)
    if (index === series.length - 1) {
        o.rate = oldAllRate === 0 && o.value === 0 ? 0 : (100 - oldAllRate).toFixed(1)
    } else {
        o.rate = countToNum > 0 ? ((o.value / countToNum) * 100).toFixed(1) : 0
        oldAllRate += Number(o.rate)
    }
})

function setRing() {
    dataIndex = series.length
    clearInterval(inter)
    setPieData(100, 5, 100)
    timer = setTimeout(() => {
        setPieData(0, 5, 100)
        setCarousel()
    }, 2000)
}

function setCarousel(val = 0) {
    clearInterval(inter)
    dataIndex = val
    inter = setInterval(() => {
        if (dataIndex !== series.length) {
            setPieData(series[dataIndex].rate, dataIndex, series[dataIndex].oldAllRate)
            const i = dataIndex === series.length ? 0 : dataIndex
            const timeCar = setTimeout(() => {
                setPieData(0, i, Number(series[i].oldAllRate))

                const timeReset = setTimeout(() => {
                    setPieData(0, i, Number(series[i].rate) + Number(series[i].oldAllRate))
                    clearTimeout(timeReset)
                }, 500)

                clearTimeout(timeCar)
            }, 2000)
        }
        if (dataIndex === series.length) {
            setPieData(0, 0, 100)
            setRing()
        } else {
            dataIndex++
        }
    }, 3000)
}
function setPieData(v, i, start) {
    myChart.setOption({
        series: [
            {
                data: series
            },
            {
                startAngle:90 - start * 3.6,
                clockwise: true,
                data: [
                    {
                        value: v,
                        name: '',
                        // animationTypeUpdate: 'expansion',
                        itemStyle: {
                            color: color[i]
                        }
                    },
                    {
                        value: 100 - v,
                        name: '',
                        itemStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                ]
            }
        ]
    })
}

setCarousel()

option = {
   // backgroundColor: '#033c76',
    fontSize: 16,
    tooltip: {
        trigger: 'item',
        textStyle: {
            color: '#fff'
        },
        backgroundColor: 'rgba(16, 32, 40, 0.88)',
        borderRadius: 4,
        borderColor: '#20749e',
        formatter: params => {
            return params.marker + params.name + ': ' + params.value
        }
    },
    legend: {
        right: '-1%',
        width: '10%',
        itemGap: 10,
        itemWidth: 14,
        itemHeight: 14,
        top: 'center',
        textStyle: {
            color: '#fff',
            rich: {
                a: {
                    fontSize: 12,
                    padding: [1, 0, 0, 0],
                    width: 85
                },
                b: {
                    fontSize: 10,
                    width: 55
                }
            }
        },
        data: series.map((o, i) => {
            o.itemStyle = {
                color: color[i]
            }
            return o
        })
    },
    series: [
        {
            type: 'pie',
            hoverAnimation: false,
            color: color,
            center: [centerX, '50%'],
            radius: ['43%', '70%'],
            startAngle: 90,
            avoidLabelOverlap: false,
            label: null,
            emphasis: null,
            labelLine: null,
            itemStyle: {
                borderWidth: 5, // 间距的宽度
                borderColor: 'rgba(0, 0, 0, 0.6)' //背景色
            },
            data: series
        },
        {
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            center: [centerX, '50%'],
            radius: ['75%', '80%'],
            startAngle: 90,
            label: null,
            emphasis: null,
            labelLine: null,
            data: [
                {
                    value: 0,
                    name: ''
                },
                {
                    value: 100,
                    name: '',
                    itemStyle: {
                        color: 'rgba(0,0,0,0)'
                    }
                }
            ]
        }
    ]
};
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
})



		
		
		


		









