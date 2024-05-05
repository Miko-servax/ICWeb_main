        // 路径配置
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });
    var nodes = [];
	var links = [];
	var constMaxDepth = 2;
	var constMaxChildren = 7;
	var constMinChildren = 4;
	var constMaxRadius = 10;
	var constMinRadius = 2;
	
nodes = [//展示的节点  
        {  
            "name": "温室效应",//节点名称  
            "value": 63,
            "depth": 0,
            "id": 0,
            "category": 3//与关系网类别索引对应，此处只有一个关系网所以这里写0  
        },  
        {  
            "name": "产生原因",  
            "value": 40,  
            "category": 2,
            "depth": 1,
            "id": 1,  
        },  
        {  
            "name": "预测后果",  
            "value": 40,  
            "category": 2,
            "depth": 2,
            "id": 2, 
        },
       {  
            "name": "其他原因",  
            "value": 30,  
            "category": 1 ,
            "depth": 1,
            "id": 3
        },{  
            "name": "海洋生态恶化",  
            "value": 23,  
            "category": 0 ,
            "depth": 1,
            "id": 4
        },{  
            "name": "人口激增",  
            "value": 23,  
            "category": 0 ,
            "depth": 1,
            "id": 5
        },{  
            "name": "治理方法",  
            "value": 40,  
            "category": 2,
            "depth": 3,
            "id": 6, 
        }, 
           {  
            "name": "大气排放",  
            "value": 30,  
            "category": 1 ,
            "depth": 1,
            "id": 7
        },{  
            "name": "全氟碳化合物",  
            "value": 23,  
            "category": 0 ,
            "depth": 1,
            "id": 8
        },{  
            "name": "甲烷",  
            "value": 23,  
            "category": 0 ,
            "depth": 1,
            "id": 9
        },{  
            "name": "二氧化碳约55%",  
            "value": 23,  
            "category": 0 ,
            "depth": 1,
            "id": 10
        },{  
            "name": "氧化亚氮",  
            "value": 23,  
            "category": 0 ,
            "depth": 1,
            "id": 11
        },{  
            "name": "六氟化硫",  
            "value": 23,  
            "category": 0 ,
            "depth": 1,
            "id": 12
        },{  
            "name": "虫害增加",  
            "value": 30,  
            "category": 1 ,
            "depth": 2,
            "id": 13
        }
        ,{  
            "name": "传染病增加",  
            "value": 30,  
            "category": 1 ,
            "depth": 2,
            "id": 14
        },{  
            "name": "海平面上升",  
            "value": 30,  
            "category": 1 ,
            "depth": 2,
            "id": 15
        },{  
            "name": "土地干旱",  
            "value": 30,  
            "category": 1 ,
            "depth": 2,
            "id": 16
        },{  
            "name": "气候异常",  
            "value": 30,  
            "category": 1 ,
            "depth": 2,
            "id": 17
        },{  
            "name": "海洋风暴增加",  
            "value": 23,  
            "category": 0 ,
            "depth": 2,
            "id": 18
        },{  
            "name": "沙漠化面积增大",  
            "value": 23,  
            "category": 0 ,
            "depth": 2,
            "id": 19
        },{  
            "name": "节能减排",  
            "value": 30,  
            "category": 1 ,
            "depth": 3,
            "id": 20
        },{  
            "name": "保护环境",  
            "value": 30,  
            "category": 1 ,
            "depth": 3,
            "id": 21
        },{  
            "name": "发展绿色能源",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 22
        },{  
            "name": "发展低碳经济",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 23
        },{  
            "name": "减少使用化石燃料",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 24
        },{  
            "name": "少用氟氯碳化物",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 25
        },{  
            "name": "加大汽车排放监管",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 26
        },{  
            "name": "保护海洋资源",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 27
        },{  
            "name": "垃圾分类",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 28
        },{  
            "name": "减少森林破坏",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 29
        },{  
            "name": "增加绿地面积",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 30
        },{  
            "name": "研制利用温室气体的设备",  
            "value": 23,  
            "category": 0 ,
            "depth": 3,
            "id": 31
        }
    ];
    links =  [//节点之间连接  
        {  
            "source": 0,//起始节点，0表示第一个节点  
            "target": 1,
            "weight": 9
        },
        {  
            "source": 0,  
            "target": 2  
        },
        {  
            "source": 0,//起始节点，0表示第一个节点  
            "target": 6,
            "weight": 9
        },{
            "source": 1,  
            "target": 3  
        },{
            "source": 1,  
            "target": 7  
        },{  
            "source": 3,  
            "target": 4  
        }
        ,{  
            "source": 3,  
            "target": 5  
        },{
            "source": 7,  
            "target": 8  
        },{
            "source": 7,  
            "target": 9  
        },
        {
            "source": 7,  
            "target": 10 
        },{
            "source": 7,  
            "target": 11
        },{
            "source": 7,  
            "target": 12 
        },{
            "source": 2,  
            "target": 13 
        },{
            "source": 2,  
            "target": 14 
        },{
            "source": 2,  
            "target": 15 
        },{
            "source": 2,  
            "target": 16 
        },{
            "source": 2,  
            "target": 17 
        },{
            "source": 17,  
            "target": 18 
        },{
            "source": 16,  
            "target": 19 
        },{
            "source": 6,  
            "target": 20 
        },{
            "source": 6,  
            "target": 21 
        },{
            "source": 20,  
            "target": 22 
        },{
            "source": 20,  
            "target": 23
        },{
            "source": 20,  
            "target": 24 
        },{
            "source": 20,  
            "target": 25
        },{
            "source": 20,  
            "target": 26 
        },{
            "source": 21,  
            "target": 27 
        },{
            "source": 21,  
            "target": 28 
        },{
            "source": 21,  
            "target": 29 
        },{
            "source": 21,  
            "target": 30 
        },{
            "source": 21,  
            "target": 31 
        },{
            "source": 21,  
            "target": 32 
        }
    ] 
    for(var i=0; i<nodes.length; i++){
    	if(nodes[i].id == "0"){
    		nodes[i].itemStyle = {
    			normal: {
    				borderColor: '#000',
    				color:'blue',
    				label: {
		                show: true,
		            }
				}
    		}
    	}
    	else if(nodes[i].id == "22"){
    		nodes[i].itemStyle = {
    			normal: {
    				label: {
		                show: true,
		                textStyle:{
		                	color:'yellow'
		                }
		                
		            },
    			}
    		}
    	}
    	//22
    	nodes[i]["symbolSize"] = nodes[i].value *1.2;
    }
    console.log(nodes);
	require(
	    [
	        'echarts',
	        'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
	    ],
	    function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        var guanxi = ec.init(document.getElementById('guanxi')); 
			option3 = {
			    title : {
			        x:'right',
			        y:'bottom'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: '{b}'
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            restore : {show: true},
			          //  magicType: {show: true, type: ['force', 'chord']},
			            saveAsImage : {show: true}
			        }
			    },
			    legend: {
			        x: 'left',
			        data:['四级','三级', '二级'],
			        orient: 'left',
		      		x: 10,
		      		y: 10,
		            textStyle: {
		              fontSize: '14',
		              color: '#fff'
		            },
			    },
			    series : [
			        {
			            type:'force',
			            name : "Force tree",
			            ribbonType: false,
			            categories : [
			                {
			                    name: '四级'
			                },
			                {
			                    name: '三级'
			                },
			                {
			                    name: '二级'
			                }
			            ],
			            itemStyle: {
			                normal: {
								label: {
			                        show: true,
			                        textStyle:{
			                        	color:'#fff'
			                        }
			                    },
			                    nodeStyle : {
			                        brushType : 'both',
			                        borderColor : 'rgba(255,215,0,0.6)',
			                        borderWidth : 1
			                    }
			                }
			            },
			            minRadius : constMinRadius,
			            maxRadius : constMaxRadius,
			            symbolSize: function (params) {
			            	console.log(params)
			           	},
			            coolDown: 0.995,
			            steps: 10,
			            nodes : nodes,
			            links : links,
			            steps: 1
			        }
			    ]
			};
			console.log(option3)
				 guanxi.setOption(option3); 
	});
	