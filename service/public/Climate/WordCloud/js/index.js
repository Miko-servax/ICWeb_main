 // 折线图
var colors = ['#0997c1', '#c22167', '#082773', '#604fb9', '#0067c3', '#68cdfb','#5793f3', '#d14a61', '#675bba'];

//碳交易行情
option1 = {
    color: colors,

   tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        right: '20%'
    },
    legend: {
        data:['湖北', '上海', '北京', '重庆', '广东', '天津', '深圳', '福建'],
        textStyle: {
            color:"#fff"
        },
        orient: 'left',
      	x: 'right',
        textStyle: {
          fontSize: '14',
          color: '#fff'
        },
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: [
                '2021/3/23',
                '2021/3/1',
                '2021/2/26',
                '2021/2/1',
                '2021/1/29',
                '2021/1/4',
                '2020/12/31',
                '2020/12/1',
                '2020/11/30',
                '2020/11/2',
                '2020/10/30',
                '2020/10/9',
                '2020/9/30',
                '2020/9/1',
                '2020/8/31',
                '2020/8/3',
                '2020/7/31',
                '2020/7/1',
                '2020/6/30',
                '2020/6/1',
                '2020/5/29',
                '2020/5/6',
                '2020/4/30',
                '2020/4/1',
                '2020/3/31',
                '2020/3/2',
                '2020/2/28',
                '2020/2/10',
                '2020/1/23',
                '2020/1/2',
            ],
            axisLabel: {
                formatter: '{value}',
                color:"#fff"
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额(元)',
            min: 0,
            max: 150,
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: colors[0]
                }
            },
            axisLabel: {
                formatter: '{value}',
                color:"#fff"
            },
            splitLine: {
	            show: true,
	            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
	              color: 'rgba(255, 255, 255, 0)',
	            }
          	},
        },
        {
            type: 'value',
            name: '降水量',
             show:false            
        },
        {
            type: 'value',
            name: '温度',
            show:false
        }
    ],
    series: [
        {
            name:'湖北',
            type:'line',
            yAxisIndex: 2,
            data:[30.35, 27.93, 29.98, 30.99, 26.5, 28.36, 27.3, 26.44, 25.86, 28.94, 31.65, 27.37, 28.89,
            29, 29, 27.8, 27.8, 26.39, 25.11, 25.62, 25.27, 25.5, 25.93, 25.34, 24.2, 27.51, 27.51, 27.51,
            27.12, 26.52]
        },
        {
            name:'上海',
            type:'line',
            yAxisIndex: 2,
            data:[41.5, 41.35, 41.35, 39.73, 39.73, 39, 39, 41.45, 41.45, 41.49, 40.13, 42, 42, 39.84, 40.09,
            40.8, 40.68, 38.59, 38.59, 41.9, 41.9, 44.55, 44.55, 36.01, 36.01, 41.98, 41.98, 35.03, 35.03,
            49.98, ]
        },
         {
            name:'北京',
            type:'line',
            yAxisIndex: 2,
            data:[36, 30, 30, 46.4, 48.75, 74.6, 74.6, 71, 88.8, 93.42, 89.44, 88.12, 87.62, 91.89, 95.28, 94,
            89.36, 93, 93, 88, 88, 86, 86, 86.7, 86.3, 84.5, 84.5, 84.5, 84.5, 70, ]
        },{
            name:'重庆',
            type:'line',
            yAxisIndex: 2,
            data:[24.755, 22, 22, 26.55, 26.55, 23.8, 23.8, 17.55, 17.55, 12.61, 14, 23.38, 21.25, 15.02,
            15.02, 15.02, 15.02, 22.5, 25, 22.5, 22.5, 36, 36, 37.69, 29.92, 29.11, 30.15, 28.22, 31.35,
            27.79]
        },
        {
            name:'广东',
            type:'line',
            yAxisIndex: 2,
            data:[36.41, 32.12, 31.99, 31.05, 31.35, 28.86, 28.41, 27.71, 27.47, 27.81, 27.47, 27.24,
            27.53, 28.09, 27.5, 28.12, 28.35, 27.6, 27.55, 28.18, 28.66, 28.32, 27.9, 16.74, 29.99, 28.6,
            28.77, 29.41, 27.15, 28.03]
        },
        {
            name:'天津',
            type:'line',
            yAxisIndex: 2,
            data:[24, 22, 22, 27.4, 27.2, 24, 24, 25, 25, 25.3, 25.35, 25.5, 25.5, 25.8, 25.8, 26.31, 26.61,
            26.64, 26.2, 23, 25, 19.5, 19, 20, 19.5, 17, 16.5, 15.15, 15.15, 15.8]
        },
        {
            name:'深圳',
            type:'line',
            yAxisIndex: 2,
            data:[66.94, 85.05, 87.44, 102.58, 105.2, 108.17, 109.57, 75.06, 80.69, 75.44, 73.12, 125.47, 
            129.17, 125.61, 133.47, 93.04, 75.75, 137.44, 150.63, 149.16, 132.04, 135.49, 127.37,
            119.46, 110.3, 87.66, 87.66, 62.88, 59.87, 62.08]
        },
        {
            name:'福建',
            type:'line',
            yAxisIndex: 2,
            data:[9, 9, 9, 8.19, 8.19, 8.19, 8.19, 17.12, 19.02, 12.17, 13.52, 18.11, 18.11, 18.76, 19.1,
            25.8, 25.8, 10.01, 9.1, 9.1, 9.1, 9.1, 9.1, 9.1, 9.1, 9.1, 9.1, 9.1, 14, 14]
        }
    ]
};

///饼图
option2 = {
      title: {
        text: '合计',
        textStyle:{
        	color: '#fff'
        },
        subtext: '24,130.9',
        subtextStyle: {
        	color: '#fff',
        	fontSize:18,
        },
        x: 'center',
        y: 'center' 
      },
      tooltip: {
        trigger: 'item',
        formatter: '{c}'
      },
      legend: {
      	show: true,
        y: 'top',
        data:['北京','福建','广东','湖北','上海','深圳','天津','重庆'],
      	orient: 'left',
  		x: 0,
  		y: 0,
        textStyle: {
          fontSize: '14',
          color: '#fff'
        },
      },
      calculable: true,
      series: [
        {
          color: ['#0997c1', '#c22167', '#082773', '#604fb9', '#0067c3', '#68cdfb'],
          type: 'pie',
          radius: [50, 200],
          center: ['50%', '50%'],
          label: {
              normal: {
                color:"#fff"
              }
          },
          tooltip: {
      	    formatter: function (params) {
          	   var b=parseFloat(params.value).toString();
			   var len=b.length;
			   if(len<=3){return b;}
			   var r=len%3;
			   var aNew = b.split(".")[1];
			   return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(",")+"."+aNew:b.slice(r,len).match(/\d{3}/g).join(",");
            }
          },
          itemStyle: {
                normal: {       }
          },
          data: [
             {value: 1461.5, name:'北京'},
             {value: 847.0, name: '福建'},
             {value: 7755.1, name: '广东'},
             {value: 7827.6, name: '湖北'},
             {value: 1739.7, name: '上海'},
             {value: 2710.9, name: '深圳'},
             {value: 920.1, name: '天津'},
             {value: 869.0, name: '重庆'}
          ]
        }
      ]
    }

option22 = {
      title: {
        text: '合计',
        subtext: '586,621.4',
        subtextStyle: {
        	color: '#fff',
        	fontSize:18,
        },
        textStyle:{
        	color: '#fff',
        	verticalAlign: 'top'
        },
        x: 'center',
        y: 'center' 
      },
      tooltip: {
        trigger: 'item',
        formatter: '{c}'
      },
      legend: {
      	show: true,
        y: 'top',
        data:['北京','福建','广东','湖北','上海','深圳','天津','重庆'],
          	orient: 'top',
      		x: 0,
      		y: 0,
            textStyle: {
              fontSize: '14',
              color: '#fff'
            },
      },
      calculable: true,
      series: [
        {
          color: ['#0997c1', '#c22167', '#082773', '#604fb9', '#0067c3', '#68cdfb'],
          type: 'pie',
          radius: [50, 200],
          center: ['50%', '50%'],
          label: {
              normal: {
                color:"#fff"
              }
          },
          tooltip: {
      	    formatter: function (params) {
          	   var b=parseFloat(params.value).toString();
			   var len=b.length;
			   if(len<=3){return b;}
			   var r=len%3;
			   var aNew = b.split(".")[1];
			   return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(",")+"."+aNew:b.slice(r,len).match(/\d{3}/g).join(",");
            }
          },
          itemStyle: {
                normal: {
                }
          },
          data: [
             {value: 90577.7, name:'北京'},
             {value: 17138.0, name: '福建'},
             {value: 159065.6, name: '广东'},
             {value: 168834.7, name: '湖北'},
             {value: 51842.5, name: '上海'},
             {value: 73751.8, name: '深圳'},
             {value: 20103.6, name: '天津'},
             {value: 5309.5, name: '重庆'}
          ]
        }
      ]
    }