(function () {
    $(function () {

        // 导航悬浮顶部
        var navTop = $(".nav").offset().top;
        $(window).scroll(function () {
            var scrollTop =  $("body").scrollTop();
            if(scrollTop>navTop){
                $(".nav").addClass("on");
            }else{
                $(".nav").removeClass("on");
            }
        });

        // 排序事件
        $(".order").click(function () {
            $(".order").removeClass("on");
            $(this).addClass("on");
        });

        // 价格选择事件
        $(".priceCheck input").click(function () {
            $(".orderPrice").addClass("on");
            $(".priceBox .cancle").click(function () {
                $(".priceCheck input").val("");
            })
        });
        $(".orderPrice").mouseleave(function () {
            $("body").click(function (e) {
                var target = $(e.target);
                if( target.closest(".orderPrice").length == 0){
                    $(".orderPrice").removeClass("on");
                }
            })
        });



        /////////////////////////////////数据处理/////////////////////////////////////////////


        // 获取分类下的数据
        //var Index = 0;
        function showList(Index){
            var classId = getUrlData().classId;
            var maxNum =5;
            $.ajax({
                url:"http://datainfo.duapp.com/shopdata/getGoods.php",
                type:"post",
                data:{
                    classID:classId,
                    linenumber:maxNum,
                    pageCode:Index
                },
                dataType:"jsonp",
                success:function(data){
                    if(data){
                        imgList(data);
                        addPage(Index,maxNum);
                    }else{
                        noData();
                    }
                }
            });
        }
        showList(0);

        //拼接列表
        function imgList(data){
            $(".shopInfo ul").empty();
            $.each(data,function(i,v){
                var truePrice=0;
                truePrice = parseFloat(v.discount==0?v.price:v.price*(v.discount/10));
                truePrice = truePrice.toFixed(2);
                var str ="<li>" +
                    "<a href=detail.html?classId="+v.classID+"&goodsId="+ v.goodsID+" class='infoPic'>" +
                    "<img  class='lazy'  src='img/loader.gif'  data-original="+ v.goodsListImg+" alt="+ v.goodsName+">" +
                    "<span>"+v.goodsName+"</span>" +
                    "</a>" +
                    "<div class='infoPrice'>" +
                    "<a href=detail.html?classId="+v.classID+"&goodsId="+v.goodsID+">" +
                    "<span class='flexA'>" +
                    "<em>¥</em>"+truePrice+"</span>" +
                    "<span class='flexB'>" +
                    "<i>"+ v.discount+"折</i><b>¥"+ v.price+"</b>" +
                    "</span>" +
                    "<span class='flexC'>" +
                    "<b>立即购买</b>" +
                    "</span>" +
                    "</a>" +
                    "</div>" +
                    "</li>";

                $(".shopInfo ul").append(str);

            });

            // 启用js
            $("img.lazy").lazyload({
                effect:"fadeIn",
                threshold:200
            });
        }



        // 分页
        function addPage(Index,maxNum){
            var classId = getUrlData().classId;
            $.ajax({
                url:"http://datainfo.duapp.com/shopdata/getGoods.php",
                data:{
                    classID:classId,
                    linenumber:maxNum,
                    pageCode:++Index
                },
                type:"post",
                dataType:"jsonp",
                success:function(nextData){
                    var str;
                    console.log(nextData);
                    if(--Index==0){ // 如果是首页
                        console.log("---");
                        console.log("yes");
                        console.log("---");
                        if(nextData){  // 判断下一页有数据显示 【下一页】
                            $(".shopInfo .page").remove();
                            str = "<div class='page'><span><a href='javascript:;' class='right'></a></span></div>";
                        }
                    }else{ // 如果不是首页 [肯定要有上一页，判断有没有下一页]
                        if(nextData){
                            $(".shopInfo .page").remove();
                            if(nextData.length<maxNum){
                                str = "<div class='page'><span><a href='javascript:;' class='left'></a></span></div>";
                            }else{ // 【显示左右页】
                                str = "<div class='page'><span><a href='javascript:;' class='left'></a></span><span><a href='javascript:;' class='right'></a></span></div>";
                            }
                        }else{
                            $(".shopInfo .page").remove();
                            str = "<div class='page'><span><a href='javascript:;' class='left'></a></span></div>";
                        }
                    }

                    $(".shopInfo").append(str);
                    // 绑定分页事件 ajax加载
                    $(".page .left").bind("click",function(){
                        showList(--Index);
                    });
                    $(".page .right").bind("click",function(){
                        showList(++Index);
                    })
                }
            });
        }

        // 没有数据
        function noData(){
            var str = "<div class='noDataInfo'><div class='boxClear'><span><img src='img/nodata.png'></span><b>为毛！没有数据！呜呜呜。。。</b></div></div>";
            $(".shopInfo").append(str);
        }




    });
})();

