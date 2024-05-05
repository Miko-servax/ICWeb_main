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
                    value : [81.23, 50.41, 90.4],
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
                data:[-5,-1,-4,1,2,3,0.5,-2.5]
            },
            {
                name:'GDP增速',
                type:'line',
                smooth:true,
                symbol:'roundRect',
                data:[7.5,7,6.5,6.6,6.5,6.3,6,2]
            }
        ]
    };
    graduateyear.setOption(option);

    
    var sexrate = echarts.init(document.getElementById('sexrate'));
    var total = {
        name: '2020'
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
                    {value: 107.10, name: '林业用地面积'},
                    {value: 43.48, name: '人工林面积'}
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
          { value: 0.68, name: "海淀区" },
          { value: 0.68, name: "朝阳区" },
          { value: 0.68, name: "西城区" },
          { value: 0.68, name: "东城区" },
          { value: 0.68, name: "顺义区" },
          { value: 0.68, name: "丰台区" },
          { value: 0.68, name: "通州区" },
          { value: 0.68, name: "昌平区" }
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
          { value: 3, name: "煤炭" },
          { value: 87, name: "其他化石能源" },
          { value: 10, name: "非化石能源" }
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
                name: '碳排放总量 /亿吨',
                nameTextStyle:{
                    color:'#fff'
                },
                interval: 0.2,
                max:1.8,
                min: 1,
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
                min: 5.5,
                max: 8,
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
                data:[1.54, 1.46, 1.45, 1.39, 1.41, 1.45, 1.49, 1.49, 1.32],
                boundaryGap: '45%',
                barWidth:'40%',

                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#6bc0fb','#7fec9d','#ffffff','#ffffff','#ffa597','#84e4dd','#ffccff','#cccccc','#ccffcc'
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
                data:[7.47, 6.91, 6.76, 6.45, 6.52, 6.68, 6.92, 6.95, 6.17]
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
            data: ['煤炭消费量/万吨', '原油消费量/万吨'],
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
                data: [1162, 1116,1105,1075,870,1034,991,821,892,911,936,945]
            },
            {
                name: '煤炭消费量/万吨',
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
                data: [2664,2634,2366,2270,2019,1736,1165,847,490,276, 182,190 ]
            }
        ]
    };
    juniorservice.setOption(option);

    /* ===*/
    // var edubalance = echarts.init(document.getElementById('edubalance'));
    // option = {
    //     tooltip: {
    //         trigger: 'axis',
    //         formatter: '{b}</br>{a}: {c}</br>{a1}: {c1}</br>{a2}: {c2}</br>{a3}: {c3}'
    //     },
    //     toolbox: {
    //         show:false,
    //         feature: {
    //             dataView: {show: true, readOnly: false},
    //             magicType: {show: true, type: ['line', 'bar']},
    //             restore: {show: true},
    //             saveAsImage: {show: true}
    //         }
    //     },
    //     legend: {
    //         data:['test1','test2','test3','test4','test5'],
    //         right:"15%",
    //         textStyle:{
    //             color:'#fff'
    //         }
    //     },
    //     grid:{
    //         top:'18%',
    //         right:'5%',
    //         bottom:'8%',
    //         left:'5%',
    //         containLabel: true
    //     },
    //     xAxis: [
    //         {
    //             type: 'category',
    //             data: ['工藤新一','工藤新一','工藤新一','工藤新一'],
    //             splitLine:{
    //                 show:false,
    //                 lineStyle:{
    //                     color: '#3c4452'
    //                 }
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             axisLabel:{
    //                 textStyle:{
    //                     color:"#fff"
    //                 },
    //                 lineStyle:{
    //                     color: '#519cff'
    //                 },
    //                 alignWithLabel: true,
    //                 interval:0,
    //             }
    //         }
    //     ],
    //     yAxis: [
    //         {
    //             type: 'value',

    //             nameTextStyle:{
    //                 color:'#fff'
    //             },
    //             interval: 5,
    //             max:50,
    //             min: 0,
    //             splitLine:{
    //                 show:true,
    //                 lineStyle:{
    //                     color: '#23303f'
    //                 }
    //             },
    //             axisLine: {
    //                 show:false,
    //                 lineStyle: {
    //                     color: '#115372'
    //                 }
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             axisLabel:{
    //                 textStyle:{
    //                     color:"#fff"
    //                 },
    //                 alignWithLabel: true,
    //                 interval:0

    //             }
    //         },
    //         {
    //             min: 0,
    //             max: 100,
    //             interval: 20,
    //             type: 'value',
    //             name: '所',
    //             nameTextStyle:{
    //                 color:'#fff'
    //             },
    //             splitLine:{
    //                 show:true,
    //                 lineStyle:{
    //                     color: '#23303f'
    //                 }
    //             },
    //             axisLine: {
    //                 show:false,
    //                 lineStyle: {
    //                     color: '#115372'
    //                 }
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             axisLabel:{
    //                 textStyle:{
    //                     color:"#fff"
    //                 },
    //                 alignWithLabel: true,
    //                 interval:0

    //             }
    //         }
    //     ],
    //     color:"yellow",
    //     series: [
    //         {
    //             name:'test1',
    //             type:'bar',
    //             data:[21, 14, 17, 12],
    //             itemStyle: {
    //                 normal: {
    //                     color: '#76da91'
    //                     },label: {
    //                         show: true,
    //                         position: 'top',
    //                         formatter: '{c}'
    //                     }
    //                 }
    //         },
    //         {
    //             name:'test2',
    //             type:'bar',
    //             data:[12, 14, 17, 23],
    //             itemStyle: {
    //                 normal: {
    //                     color: '#f8cb7f'},
    //                 label: {
    //                         show: true,
    //                         position: 'top',
    //                         formatter: '{c}'
    //                     }
    //                 }
    //         },
    //         {
    //             name:'test3',
    //             type:'bar',
    //             data:[12, 14, 17, 13],
    //             itemStyle: {
    //                 normal: {
    //                     color: '#f89588'},
    //                 label: {
    //                         show: true,
    //                         position: 'top',
    //                         formatter: '{c}'

    //                 }
    //             }
    //         },
    //         {
    //             name:'test4',
    //             type:'bar',
    //             data:[2, 4, 7, 3],
    //             itemStyle: {
    //                 normal: {
    //                     color: '#7cd6cf'},
    //                 label: {
    //                         show: true,
    //                         position: 'top',
    //                         formatter: '{c}'
    //                     }
    //             }
    //         },
    //         {
    //             name:'test5',
    //             type:'line',
    //             yAxisIndex: 1,
    //             lineStyle: {
    //                 normal: {
    //                     color:'#c39705'
    //                 }
    //             },
    //             data:[30, 10, 90,75]
    //         }
    //     ]
    // };
    // edubalance.setOption(option);

    /* 地图 需要哪个省市的地图直接引用js 将下面的name以及mapType修改为对应省市名称*/
    var maps = echarts.init(document.getElementById('mapadd'));
    option = {
        tooltip : {
            trigger: 'item',
            formatter: '{b}'
        },
        series : [{
            name: '北京',
            type: 'map',
            mapType: '北京',
            roam: false,
            top:'8%',
            zoom:1.2,
            x:'25%',
            selectedMode : 'single',//multiple多选
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
                    borderColor:'#dadfde'//区块的边框颜色
                },
                emphasis:{//鼠标hover样式
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
                {name:'东城区',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#edce00'
                        }
                    }
                },
                {name:'西城区',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#0abcee'
                        }
                    }
                }, 
                {name:'朝阳区',
                    itemStyle: {
                        normal: {
                            areaColor: '#92d050',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'丰台区',
                    itemStyle: {
                        normal: {
                            areaColor: '#88ddf5',
                            borderColor: '#88ddf5',
                        }
                    }
                },
                {name:'石景山区',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'海淀区',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'门头沟区',
                    itemStyle: {
                        normal: {
                            areaColor: '#45b5ef',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'房山区',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffd811',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'通州区',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffa312',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'顺义区',
                    itemStyle: {
                        normal: {
                            areaColor: '#92d050',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'昌平区',
                    itemStyle: {
                        normal: {
                            areaColor: '#88ddf5',
                            borderColor: '#88ddf5',
                        }
                    }
                },
                {name:'大兴区',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'怀柔区',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'平谷区',
                    itemStyle: {
                        normal: {
                            areaColor: '#45b5ef',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'密云区',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'延庆区',
                    itemStyle: {
                        normal: {
                            areaColor: '#15d3ee',
                            borderColor: '#45b5ef',
                        }
                    }
                }
            ]
        }]
    };
    maps.setOption(option);

})