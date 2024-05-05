$(function(){
    var radar = echarts.init(document.getElementById('radar'));
    option = {
        title: {
            text: ''
        },
        tooltip: {},
        legend: {
            x:"center",
            y:'bottom',
            textStyle:{
                color:"#fff"
            }
        },
        color: ['#ff7744'],
        radar: {
            shape:"circle",
            name:{
                textStyle: {
                    color:'#fff'
                }
            },
            indicator: [
                { name: '低碳状态', max: 100},
                { name: '排放趋势', max: 100},
                { name: '气候雄心', max: 100},
            ],
            center: ['50%','50%'],
            radius: "58%"
        },
        series: [{
            name: '',
            type: 'radar',
            itemStyle : {
                normal : {
                    splitLine: {
                        lineStyle: {

                        }
                    },
                    label: {
                        show: false,
                        textStyle:{
                        },
                },
                }
            },
            data : [
                {
                    value : [61.68,22.68,37],
                },
            ]
        }]
    };
    radar.setOption(option);


    var graduateyear = echarts.init(document.getElementById('graduateyear'));
    option = {
        title : {
            text:"",
            x:'center',
            y:'top',
            textStyle:
            {
                color:'#fff',
                fontSize:13
            }
        },
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '8%',
            bottom: '5%',
            top:"13%",
            containLabel: true
        },
        color:["#72b332",'#35a9e0'],
        legend: {
            data:['碳排放增速','GDP增速'],
            show:true,

            right:'15%',
            y:"0",
            textStyle:{
                color:"#999",
                fontSize:'13'
            },
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['2013','2014','2015','2016','2017','2018','2019','2020'],
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: '#2d3b53'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:"#fff"
                    },
                    alignWithLabel: true,
                    interval:0,
                    rotate:'15'
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: '#2d3b53'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:"#999"
                    }
                },
            }
        ],
        series : [
            {
                name:'碳排放增速',
                type:'line',
                smooth:true,
                symbol:'roundRect',
                data:[9,-4,3,-2,-4,-3,2,9]
            },
            {
                name:'GDP增速',
                type:'line',
                smooth:true,
                symbol:'roundRect',
                data:[13,10.5,10,8.2,8,8.3,8.7,5.5]
            }
        ]
    };
    graduateyear.setOption(option);

    var sexrate = echarts.init(document.getElementById('sexrate'));
    var total = {
        name: '2030'
    };
    option = {
        title: [{
            text: total.name,
            left: '48%',
            top: '38%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 18
            }
        }, {
            text: total.value,
            left: '48%',
            top: '44%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 18
            }
        }],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        color:['#70a3ff','#ff7f4e'],
        legend: {
            orient: 'vertical',
            x:'center',
            bottom:'5%',
            selectedMode:false,
            data: ['碳达峰目标年',],
            show:true,
            textStyle:{
                color:'#fff',
                fontWeight:'bold'
            },
        },

        series : [
            {
                name: '',
                type: 'pie',
                selectedMode: 'single',
                radius: ['45%', '55%'],
                center: ['50%', '40%'],
                data: [
                    {value: 2030, name: '碳达峰目标年'},
                    {value: 0, name: 'test2'}
                ],
                label: {
                    normal: {
                        show: false,
                        position: "outer",
                        align:'left',
                        textStyle: {
                            rotate:true
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label:{
                            show: true,
                            formatter: '{b} {c}'
                        }
                    }

                }
            }
        ]
    };
    sexrate.setOption(option);
 
    
    var householdrate = echarts.init(document.getElementById('householdrate'));
    var total = {
        name: '绿地'
    };
    option = {
        title: [{
            text: total.name,
            left: '48%',
            top: '38%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 18
            }
        }, {
            text: total.value,
            left: '48%',
            top: '44%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 18
            }
        }],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        color:['#4f9de7','#4acf79'],
        legend: {
            orient: 'vertical',
            x:'center',
            bottom:'5%',
            selectedMode:false,
            data: ['林业用地面积','人工林面积'],
            show:true,
            textStyle:{
                color:'#fff',
                fontWeight:'bold'
            },
        },
        series : [
            {
                name: '绿地',
                type: 'pie',
                selectedMode: 'single',
                radius: ['45%', '55%'],
                center: ['50%', '40%'],
                data: [
                    {value: 1236.79, name: '林业用地面积'},
                    {value: 310.53, name: '人工林面积'}
                ],
                label: {
                    normal: {
                        show: false,
                        position: "outer",
                        align:'left',
                        textStyle: {
                            rotate:true
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label:{
                            show: true,
                            formatter: '{b} {c}'
                        }
                    }
                }
            }
        ]
    };
    householdrate.setOption(option);
   

    var courserate = echarts.init(document.getElementById('courserate'));
   var option = {
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      bottom: "0%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "地区单位GDP二氧化碳排放",
        type: "pie",
        radius: ["10%", "70%"],
        center: ["50%", "40%"],
        roseType: "radius",
        label: {
          fontSize: 10
        },
        labelLine: {
          length: 4,
          length2: 8
        },
        data: [
          { value: 0.74, name: "西安" },
          { value: 7.04, name: "榆林" },
          { value: 1.17, name: "宝鸡" },
          { value: 1.63, name: "延安" },
          { value: 1.61, name: "汉中" },
          { value: 1.57, name: "商洛" },
          { value: 1.29, name: "咸阳" },
          { value: 0.62, name: "安康" }
        ]
      }
    ]
  };


  window.addEventListener("resize", function() {
    myChart.resize();
  });
    courserate.setOption(option);

    var professionrate = echarts.init(document.getElementById('professionrate'));
   var option = {
    color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    legend: {
      bottom: "0%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "能源结构",
        type: "pie",
        radius: ["40%", "60%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center"
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 74, name: "煤炭" },
          { value: 18, name: "其他化石能源" },
          { value: 8, name: "非化石能源" }
        ]
      }
    ]
  };

  
  window.addEventListener("resize", function() {
    myChart.resize();
  });
    professionrate.setOption(option);
 
    var changedetail = echarts.init(document.getElementById('changedetail'));
    option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b}</br>{a}: {c}</br>{a1}: {c1}'
        },
        toolbox: {
            show:false,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['',''],
            show:false
        },
        grid:{
            top:'18%',
            right:'5%',
            bottom:'8%',
            left:'5%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['2012','2013','2014','2015','2016','2017','2018','2019','2020'],
                splitLine:{
                    show:false,
                    lineStyle:{
                        color: '#3c4452'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel:{
                    textStyle:{
                        color:"#fff"
                    },
                    lineStyle:{
                        color: '#519cff'
                    },
                    alignWithLabel: true,
                    interval:0
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '碳排放总量/亿吨',
                nameTextStyle:{
                    color:'#fff'
                },
                min: 2.2,
                max:3,
                interval: 0.2,
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: '#23303f'
                    }
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#115372'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel:{
                    textStyle:{
                        color:"#fff"
                    },
                    alignWithLabel: true,
                    interval:0

                }
            },
            {
                min: 6,
                max: 7.5,
                interval: 0.5,
                type: 'value',
                name: '人均碳排量 吨/人',
                nameTextStyle:{
                    color:'#fff'
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color: '#23303f'
                    }
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#115372'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel:{
                    textStyle:{
                        color:"#fff"
                    },
                    alignWithLabel: true,
                    interval:0

                }
            }
        ],
        color:"yellow",
        series: [
            {
                name:'碳排放总量',
                type:'bar',
                data:[2.60,2.51,2.58,2.54,2.45,2.38,2.43,2.65,2.86],
                boundaryGap: '45%',
                barWidth:'40%',

                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#6bc0fb','#7fec9d','#fedd8b','#ffa597','#84e4dd','#ffffff','#ffccff','#cccccc','#ccffcc'
                            ];
                            return colorList[params.dataIndex]
                        },label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    }
                }
            },

            {
                name:'人均碳排放量',
                type:'line',
                yAxisIndex: 1,
                lineStyle: {
                    normal: {
                        color:'#c39705'
                    }
                },
                data:[6.94,6.68,6.84,6.7,6.43,6.23,6.29,6.85,7.4]
            }
        ]
    };
    changedetail.setOption(option);

    var juniorservice = echarts.init(document.getElementById('juniorservice'));
    option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {           
                type : 'shadow'  
            }
        },
        color:['#eaff00','#22ac38'],
        legend: {
            right:'0',
            data: ['煤炭消费量/十万吨', '原油消费量/万吨'],
            textStyle:{
                color:'#00ffff'
            }
        },
        grid: {
            left: '8%',
            right: '4%',
            bottom: '3%',
            top:'10%',
            containLabel: true
        },
        xAxis:  {
            type: 'value',
            splitLine:{
                show:true,
                lineStyle:{
                    color: '#1e2b43'
                }
            },
            axisLine: {
                show:false,
                lineStyle: {
                    color: '#115372'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel:{
                textStyle:{
                    color:"#fff"
                },
                alignWithLabel: true,
                interval:0

            }
        },
        dataZoom: [{
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            start: 0,
            x:'0',
            end: 60,
            handleStyle:{
                color:"#519cff",
                backgroundColor:'#519cff'
            },
            textStyle:{
                color:"#fff"},
            borderColor:"#519cff"
        }],
        yAxis: {
            type: 'category',
            data: ['2009','2010','2011','2012','2013','2014','2015','2016','2017','2018',' 2019','2020','m','n','o','p','q','r','s','t'],
            splitLine:{
                show:false,
                lineStyle:{
                    color: '#1e2b43'
                }
            },

            axisTick: {
                show: false
            },
            axisLine: {
                show:true,
                lineStyle: {
                    color: '#115372'
                }
            },
            axisLabel:{
                textStyle:{
                    color:"#419aff"
                },
                lineStyle:{
                    color: '#519cff'
                },
                alignWithLabel: true,
                interval:0
            }
        },
        series: [
            {
                name: '原油消费量/万吨',
                type: 'bar',
                stack: '比例',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        textStyle:{
                            color:'#333'
                        }
                    }

                },
                data: [1764,1870,2104,2095,2267,2230,2249,2101,1823,1853,1864,1837]
            },
            {
                name: '煤炭消费量/十万吨',
                type: 'bar',
                stack: '比例',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle:{
                            color:'#00f0ff'
                        }

                    }
                },
                data: [894,949,1163,1331,1577,1727,1837,1837,1967,2006,1939,2154]
            }
        ]
    };
    juniorservice.setOption(option);


    var maps = echarts.init(document.getElementById('mapadd'));
    option = {
        tooltip : {
            trigger: 'item',
            formatter: '{b}'
        },
        series : [{
            name: '陕西',
            type: 'map',
            mapType: '陕西',
            roam: false,
            top:'8%',
            zoom:1.3,
            x:'25%',
            selectedMode : 'single',
            itemStyle:{
                normal:{
                    label:{
                        show:true,
                        textStyle: {
                            color: "#231816"
                        }
                    },
                    areaStyle:{color:'#B1D0EC'},
                    color:'#B1D0EC',
                    borderColor:'#dadfde'
                },
                emphasis:{
                    label:{
                        show:true,
                        textStyle:{
                            color:'#fa4f04'
                        }
                    },
                    areaStyle:{color:'red'}
                }
            },
            data:[
                {name:'西安市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#edce00'
                        }
                    }
                },
                {name:'铜川市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#0abcee'
                        }
                    }
                }, 
                {name:'宝鸡市',
                    itemStyle: {
                        normal: {
                            areaColor: '#92d050',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'咸阳市',
                    itemStyle: {
                        normal: {
                            areaColor: '#88ddf5',
                            borderColor: '#88ddf5',
                        }
                    }
                },
                {name:'渭南市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'延安市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'汉中市',
                    itemStyle: {
                        normal: {
                            areaColor: '#45b5ef',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'榆林市',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffd811',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'安康市',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffa312',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'商洛市',
                    itemStyle: {
                        normal: {
                            areaColor: '#92d050',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
              
            ]
        }]
    };
    maps.setOption(option);

})