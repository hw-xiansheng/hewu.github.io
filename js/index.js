
(function(){
    // 首页左侧菜单功能
    $(function () {

        var pos = $("#fixPos").offset();
        $(".flMenu").css("left",pos.left-105+"px");
        $(window).scroll(function () {
            // 左侧菜单显示
            var scrollTop =  $("body").scrollTop();
            if(scrollTop>pos.top-130){
                $(".flMenu").fadeIn();
            }else{
                $(".flMenu").fadeOut();
            }
            // 页面滚动左边菜单切换样式
            $(".shopTitle").each(function () {
                if(scrollTop>$(this).offset().top-100){
                    $(".flMenu li").removeClass("on");
                    var className = "."+$(this).attr("id");
                    $(".flMenu").find(className).addClass("on");
                }
            })
        });





    /////////////////////////////////数据处理/////////////////////////////////////////////




        // Banner数据请求
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getBanner.php",
            type:"get",
            data:{},
            dataType:"JSONP",
            success:function(data){
                $.each(data,function(i,v){
                    var imgSrc = $.parseJSON(v.goodsBenUrl)[0];
                    var goodName = v.goodsName;
                    var str = "<li><a href='javascript:;'><img src="+imgSrc+" alt="+goodName+"></a></li>";
                    $(".liBox .bd ul").append(str);
                    var str2 ="<li><a href='javascript:;'>"+goodName+"</a><span></span></li>";
                    $(".liBox .hd ul").append(str2);
                });
                jQuery(".liBox").slide({mainCell:".bd ul",effect:"fold",autoPlay:true});
            }
        });


        // 热门数据获取
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getGoods.php",
            data:{},
            dataType:"jsonp",
            success:function(data){
                if(data){
                    // 拼接标题&容器
                    listTit(data,0);
                    // 拼接列表
                    listImg(data,0);

                    $("img.lazy").lazyload({
                        effect:"fadeIn",
                        threshold:200
                    });

                }else{

                }
            }
        });


        // 底下循环分类ID【1-5】下的八个数据放在首页
        for(var i=1; i<6; i++){
            (function (i) {  // 闭包！！！
                $.ajax({
                    url:"http://datainfo.duapp.com/shopdata/getGoods.php",
                    data:{
                        classID:i,
                        linenumber:8
                    },
                    dataType:"jsonp",
                    success:function(data){
                        if(data){
                            // 拼接标题&容器
                            listTit(data,i);
                            // 拼接列表
                            listImg(data,i);

                            $("img.lazy").lazyload({
                                effect:"fadeIn",
                                threshold:200
                            });
                        }else{

                        }
                    }
                });
            })(i)
        }


        // 拼接标题&容器
        function listTit(data,i){
            if(i){
                var className = data[0].className;
                var tit = "<div class='shopTitle' id='floor"+i+"'><span><b>"+className+"</b> / 专区</span><a href=list.html?classId="+i+">查看更多 >></a></div>";
            }else{
                var tit = "<div class='shopTitle' id='floor"+i+"'><span><b>精选</b> / 专区</span></div>";
            }
            var str = "<div class='shopInfo w12' id='cont"+i+"'><ul></ul></div>";
            $(".shopMain").append(tit);
            $(".shopMain").append(str);
        }


        // 拼接列表
        function listImg(data,listIndex){
            // for循环  data.length 可以控制显示个数
            for(var j=0; j<8;j++){
                // 折扣价格处理
                var nowPrice = 0;
                if(data[j].discount==0){
                    nowPrice= parseFloat(data[j].price);
                    nowPrice = nowPrice.toFixed(2);
                }else{
                    nowPrice = (data[j].discount/10)*(data[j].price);
                    nowPrice = nowPrice.toFixed(2);
                }
                // 拼接
                var str = "<li><a href=detail.html?classId="+data[j].classID+"&goodsId="+ data[j].goodsID+" class='infoPic'>" +
                    "<img  class='lazy'  src='img/loader.gif'  data-original="+data[j].goodsListImg+" alt="+data[j].goodsName+" ><span>"+data[j].goodsName+"</span></a>" +
                    "<div class='infoPrice'><a href=detail.html?classId="+data[j].classID+"&goodsId="+ data[j].goodsID+" ><span class='flexA'><em>¥</em>"+nowPrice+"</span><span class='flexB'><i>"+data[j].discount+"折</i><b>¥"+data[j].price+"</b></span><span class='flexC'><b>立即购买</b></span></a></div></li>";
                // 添加
                $("#cont"+listIndex).find("ul").append(str);
            }
        }


        //拼接左边的悬浮菜单
        function listMenu(){
            $.ajax({
                url:"http://datainfo.duapp.com/shopdata/getclass.php",
                data:{},
                dataType:"",
                type:"get",
                success:function(data){
                    data = $.parseJSON(data);
                    for(var i=0; i<6; i++){
                        console.log(data[i].icon);
                        var className = i ==0?"精选":data[i-1].className;
                        var str = "<li class='floor"+i+"'><a href='javascript:;'><i><img src="+data[i].icon+"></i><span>"+className+"</span></a></li>";
                        $(".flMenu ul").append(str);
                    }
                    // 绑定左侧菜单点击事件
                    $(".flMenu li").bind("click",function (){
                        var top = $("#"+$(this).attr("class")).offset().top-60;
                        $('body,html').animate({ scrollTop:top }, 800);
                    });
                }

            });

        }
        listMenu();


    })

})();