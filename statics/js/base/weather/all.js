var all=new Vue({
    el: '#all',
    data: {
        datatype:'1',
        regionselect:'广州',
        countryselect:'中国',
        trade:'传养果汁',
        suanfatype:'1',
        modeltime:'2016',
        options: ['传养果汁','水PET','矿物质水','稀释果汁','CAN'],
        countrys:[
            { text: '中国', value: '中国' }
        ],
        regions:[
            { text: '广州', value: '广州' }
        ],
        times:[
            { text: '2016年', value: '2016' }
        ],
        regressions:[
            { text: '多元线性回归', value: '1' },
            { text: 'Lasso回归', value: '2' },
            { text: '岭回归', value: '3' }
        ],
        tables: [
            { text: '天气状况表', value: '1' },
            { text: '销售状况表', value: '2' }
        ]

    },
    methods: {

        dataload11:function(){  //从页面模块1跳到2（步骤条编号） 上传功能无后台不可用
            $('#dataup').addClass("active");
            $('#dataload1').addClass("hidden");
            $('#dataup1').removeClass("hidden");

            //文件上传。。请忽略下方代码
            var control = $('#file-zh');
            control.fileinput({
                language: 'zh', //设置语言
                uploadUrl:  "../../weather/upexcel", //上传的地址
                uploadExtraData:function(previewId,index){
                    var data={
                        excelType:all.datatype
                        // files:$('#file-zh').val()
                    };
                    return data;
                },
                allowedFileExtensions: ['xlsx'],//接收的文件后缀
                uploadAsync: true, //默认异步上传
                showUpload: true, //是否显示上传按钮
                showRemove : true, //显示移除按钮
                showPreview : true, //是否显示预览
                showCaption: false,//是否显示标题
                browseClass: "btn btn-primary", //按钮样式
                maxFileCount: 1, //表示允许同时上传的最大文件个数
                enctype: 'multipart/form-data',
                validateInitialCount:true,
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
            }).on("fileuploaded", function (event, data, previewId, index) {    //一个文件上传成功
                var json = eval("("+data.response+")");//将json类型字符串转换为json对象
                //alert(json.unusual);
                if(json.errorfiletype==="1")
                    alert("请选择正确类型的文件");
                if(json.unusual==="1"){
                    var obj = [];
                    $.each(json.data, function(i, d) {
                        obj.push(d);
                        // alert(obj.coursename);
                    });


                    $('#datareport').addClass("active");
                    $('#dataup1').addClass("hidden");
                    $('#datareport1').removeClass("hidden");
                    $('#error').removeClass("hidden");
                    $('#sale').bootstrapTable('destroy');
                    if(all.datatype==='1'){

                        //$('#sale').bootstrapTableEx('destroy');
                        $('#sale').bootstrapTable({
                            data : obj,
                            pagination:true,
                            paginationLoop:true,
                            clickToSelect: true,
                            pageNumber:1,
                            pageSize:10,
                            pageList:[10, 20,30,40, 60],
                            //search:true,
                            columns: [{
                                checkbox: true
                            }, {
                                field : "Id",
                                title : "序号",
                                width : "200px"
                            }, {
                                field : "Country",
                                title : "国家",
                                width : "200px"
                            }, {
                                field : "Region",
                                title : "地区",
                                width : "200px"
                            }, {
                                field : "saledate",
                                title : "日期",
                                width : "200px"
                            },{
                                field : "MaxTemperature",
                                title : "最高气温",
                                width : "200px"
                            },{
                                field : "MinTemperature",
                                title : "最低气温",
                                width : "200px"
                            },{
                                field : "Weather",
                                title : "天气",
                                width : "200px"
                            },{
                                field : "WindDirection",
                                title : "风向",
                                width : "200px"
                            },{
                                field : "WindPower",
                                title : "风力",
                                width : "200px"
                            }]
                        }).bootstrapTable('refresh');
                    }else{
                        //$('#sale').bootstrapTableEx('destroy');
                        $('#sale').bootstrapTable({
                            data : obj,
                            pagination:true,
                            paginationLoop:true,
                            clickToSelect: true,
                            pageNumber:1,
                            pageSize:10,
                            pageList:[10, 20,30,40, 60],
                            //search:true,
                            columns: [{
                                checkbox: true
                            }, {
                                field : "Id",
                                title : "序号",
                                width : "200px"
                            }, {
                                field : "Country",
                                title : "国家",
                                width : "200px"
                            }, {
                                field : "Region",
                                title : "地区",
                                width : "200px"
                            }, {
                                field : "Trade",
                                title : "商品",
                                width : "200px"
                            }, {
                                field : "saledate",
                                title : "销售日期",
                                width : "200px"
                            }, {
                                field : "sales",
                                title : "销量",
                                width : "100px"
                            }]
                        }).bootstrapTable('refresh');
                    }

                }
                if(json.unusual==="2"){
                    $('#datareport').addClass("active");
                    $('#dataup1').addClass("hidden");
                    $('#datareport1').removeClass("hidden");
                    $('#right').removeClass("hidden");
                }

            });
            $("#fileDiv").css("display","");

        },
        dataup11:function(){  //忽略
            $('#datareport').removeClass("active");
            $('#dataup1').removeClass("hidden");
            $('#datareport1').addClass("hidden");
            $('#right').addClass("hidden");
            $('#error').addClass("hidden");
            $.ajax({
                url: "/weather/deleteall?_"+$.now(),
                type: 'post'
            })

        },
        dataup12:function(){   //跳过按钮  页面模块2到4
            $('#datareport').addClass("active");
            $('#datapre').addClass("active");
            $('#dataup1').addClass("hidden");
            $('#datapre1').removeClass("hidden");
        },
        datareport11:function(){//忽略
            $('#datapre').addClass("active");
            $('#datareport1').addClass("hidden");
            $('#datapre1').removeClass("hidden");
            $('#right').addClass("hidden");
            $('#error').addClass("hidden");
        },
        datareport12:function () {//忽略
            $('#datareport').removeClass("active");
            $('#dataup1').removeClass("hidden");
            $('#datareport1').addClass("hidden");
            $('#right').addClass("hidden");
            $('#error').addClass("hidden");
        },
        datapre10:function(){  //数据预处理（无效）
            $.ajax({
                url: "/weather/dataprework?_"+$.now(),
                type: 'post',
                dataType: "json",
                success: function (data) {
                    var json = eval("("+data+")");//将json类型字符串转换为json对象
                    if(json.success==='1'){
                        $("#message").text("预处理完毕");
                        $("#Modal").modal('show');
                    }else{
                        $("#message").text("无预处理数据");
                        $("#Modal").modal('show');
                    }

                },
                error: function () {
                    //alert('系统出错');
                }
            })
        },
        datapre11:function(){  //下一步按钮  页面模块4到5
            $('#model').addClass("active");
            $('#datapre1').addClass("hidden");
            $('#model1').removeClass("hidden");
            $('#chart').addClass("hidden");
        },
        xishu:function () {//按钮点击功能模块--皮尔逊相关系数的柱状图（写死）
            // $.ajax({
            //     url: "/weather/analyse?_"+$.now(),
            //     type: 'post',
            //     data:{"country":all.countryselect,"region":all.regionselect,"trade":all.trade,"time":all.modeltime},
            //     dataType: "json",
            //     success: function (data) {
            //         var json = eval("("+data+")");//将json类型字符串转换为json对象
                    $('#chartxi').removeClass("hidden");
                    var myChart = echarts.init(document.getElementById('chartxi'));




            var webkitDep = {

                "type": "force",

                "categories": [//关系网类别，可以写多组

                    {

                        "name": "人物关系",//关系网名称

                        "keyword": {},

                        "base": "人物关系"

                    }

                ],

                "nodes": [//展示的节点

                    {

                        "name": "刘烨",//节点名称

                        "value": 30,

                        "category": 0//与关系网类别索引对应，此处只有一个关系网所以这里写0

                    },

                    {

                        "name": "霓娜",

                        "value": 10,

                        "category": 0

                    },

                    {

                        "name": "诺一",

                        "value": 10,

                        "category": 0

                    }

                ],

                "links": [//节点之间连接

                    {

                        "source": 0,//起始节点，0表示第一个节点

                        "target": 1 //目标节点，1表示与索引为1的节点进行连接

                    },

                    {

                        "source": 0,

                        "target": 2

                    }

                ]

            };





            option = {

                legend: {

                    data: ['人物关系']//此处的数据必须和关系网类别中name相对应

                },

                series: [{

                    type: 'graph',

                    layout: 'force',

                    animation: false,

                    label: {

                        normal: {

                            show:true,

                            position: 'right'

                        }

                    },

                    draggable: true,

                    data: webkitDep.nodes.map(function (node, idx) {

                        node.id = idx;

                        return node;

                    }),

                    categories: webkitDep.categories,
                    symbolSize:function (value,params){
                        return value;
                    },
                    force: {

                        edgeLength: 105,//连线的长度

                        repulsion: 100  //子节点之间的间距

                    },

                    edges: webkitDep.links

                }]

            };




           // myChart.setOption(option);

            // var option = {
                    //     title : {
                    //         text: '皮尔逊相关系数'
                    //     },
                    //     tooltip : {
                    //         trigger: 'axis'
                    //     },
                    //     legend: {
                    //         data:['系数值']
                    //     },
                    //     toolbox: {
                    //         show : true,
                    //         feature : {
                    //             mark : {show: true},
                    //             dataView : {show: true, readOnly: false},
                    //             magicType : {show: true, type: ['line', 'bar']},
                    //             restore : {show: true},
                    //             saveAsImage : {show: true}
                    //         }
                    //     },
                    //     calculable : true,
                    //     xAxis : [
                    //         {
                    //             type : 'category',
                    //             data:[1,2,3,4]
                    //
                    //             // data : json.dx
                    //         }
                    //     ],
                    //     yAxis : [
                    //         {
                    //             type : 'value'
                    //         }
                    //     ],
                    //     series : [
                    //         {
                    //             name:'系数值',
                    //             type:'bar',
                    //             barWidth:20,
                    //             data : [0.31241421,-0.341441,0.2142412,0.7646252],
                    //             //data:json.dy,
                    //             markLine : {
                    //                 data : [
                    //                     {type : 'average', name: '平均值'}
                    //                 ]
                    //             }
                    //         }
                    //     ],
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top',
                    //             textStyle: {
                    //                 color: 'black'
                    //             }
                    //         }
                    //     }
                    // };
                    myChart.setOption(option);

            //     },
            //     error: function () {
            //         //alert('系统出错');
            //     }
            // })
        },
        modelcreate:function(){  //按钮--模型曲线图（写死）
            $('#my').modal('show');
            // $.ajax({
            //     url: "/weather/modelcreate?_"+$.now(),
            //     type: 'post',
            //     data:{"country":all.countryselect,"region":all.regionselect,"trade":all.trade,"regression":all.suanfatype,"time":all.modeltime},
            //     dataType: "json",
            //     success: function (data) {
            //         var json = eval("("+data+")");//将json类型字符串转换为json对象
                    $('#chart').removeClass("hidden");
                    $('#my').modal('hide');
                    var myChart = echarts.init(document.getElementById('chart'));
                    var option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['拟合后月销量','实际月销量']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : [1,2,3,4,5,6,7,8,9,10,11,12]
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    formatter: '{value} 件'
                                }
                            }
                        ],
                        series : [
                            {
                                name:'拟合后月销量',
                                symbol:'none',  //这句就是去掉点的
                                smooth:true,  //这句就是让曲线变平滑的
                                type:'line',
                                data : [19,285,378,456,755,1026,1557,865,986,510,611,312],
                                markPoint : {
                                    data : [
                                        {type : 'max', name: '最大值'},
                                        {type : 'min', name: '最小值'}
                                    ]
                                },
                                markLine : {
                                    data : [
                                        {type : 'average', name: '平均值'}
                                    ]
                                }
                            },{
                                name:'实际月销量',
                                symbol:'none',  //这句就是去掉点的
                                //smooth:true,  //这句就是让曲线变平滑的
                                type:'line',
                                data:[119,215,318,526,665,826,1357,1865,1086,710,411,112],
                                itemStyle: { normal: { color: '#1E90FF' } },
                                markPoint : {
                                    data : [
                                        {type : 'max', name: '最大值'},
                                        {type : 'min', name: '最小值'}
                                    ]
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);

                // },
                // error: function () {
                //     //alert('系统出错');
                // }
            // })


        },
        model11:function(){   //从页面模块5到6（步骤条编号）
            $('#task').addClass("active");
            $('#model1').addClass("hidden");
            $('#task1').removeClass("hidden");
        },
        task10:function(){   //从页面模块6到5
            $('#task1').addClass("hidden");
            $('#model1').removeClass("hidden");
            $('#task').addClass("hidden");
        },
        task11:function(){   //从页面模块6到7  图加表（写死）
            $('#result').addClass("active");
            $('#task1').addClass("hidden");
            $('#result1').removeClass("hidden");
            // $('#my').modal('show');
            // $.ajax({
            //     url: "/weather/forecast?_"+$.now(),
            //     type: 'post',
            //     data:{"country":all.countryselect,
            //         "region":all.regionselect,
            //         "trade":all.trade,
            //         "regression":all.suanfatype,
            //         "startTime":$('#dtp_input5').val(),
            //         "endTime":$('#dtp_input6').val()},
            //     dataType: "json",
            //     success: function (data) {
            //         $('#my').modal('hide');
            //         var json = eval("("+data+")");//将json类型字符串转换为json对象
                    var myChart1 = echarts.init(document.getElementById('chart1'));
                    var option1 = {
                        title : {
                            text: '需求预测'
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['预测月销量']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data :  [1,2,3,4,5,6,7,8,9]
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    formatter: '{value} 件'
                                }
                            }
                        ],
                        series : [
                            {
                                name:'预测月销量',
                                symbol:'none',  //这句就是去掉点的
                                smooth:true,  //这句就是让曲线变平滑的
                                type:'line',
                                data : [19,285,378,456,755,1026,1557,865,986],
                                markPoint : {
                                    data : [
                                        {type : 'max', name: '最大值'},
                                        {type : 'min', name: '最小值'}
                                    ]
                                },
                                markLine : {
                                    data : [
                                        {type : 'average', name: '平均值'}
                                    ]
                                }
                            }
                        ]
                    };
                    myChart1.setOption(option1);
                    $('#rate').bootstrapTable({
                        data : [{"month":1,"presale":111,"postsale":222,"rate":"50%"},
                            {"month":1,"presale":111,"postsale":222,"rate":"50%"}],
                        pagination:true,
                        paginationLoop:true,
                        pageNumber:1,
                        pageSize:10,
                        pageList:[10, 20,30,40,50],
                        search:true,
                        // showPaginationSwitch:true,
                        //onlyInfoPagination:true,
                        columns: [{
                            field : "month",
                            title : "",
                            width : "300px"
                        }, {
                            field : "presale",
                            title : "实际销量",
                            width : "200px"
                        }, {
                            field : "postsale",
                            title : "预测销量",
                            width : "200px"
                        }, {
                            field : "rate",
                            title : "百分误差",
                            width : "250px"
                        }]
                    });
                    $('#dataGrid1').bootstrapTable('refresh');



            //     },
            //     error: function () {
            //         //alert('系统出错');
            //     }
            // })

        },
        result11:function () {
            location.href = "dataUpload.html";
        }
    }

});



