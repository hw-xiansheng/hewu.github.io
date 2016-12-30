(function () {

    $(function () {

        // 导航悬浮顶部
        var titTop  = $(".botLeft .fixBox").offset().top;
        var titLeft = $(".botLeft .fixBox").offset().left;
        $(window).scroll(function () {
            var scrollTop =  $("body").scrollTop();
            if(scrollTop>titTop-40){
                $(".fixBox .titInfo").css({
                    "position":"fixed",
                    "left":titLeft,
                    "top":0
                });
                $(".botLeft .titInfo .btnBuy").removeClass("on");
            }else{
                $(".fixBox .titInfo").css({
                    "position":"relative",
                    "left":0,
                    "top":0
                });
                $(".botLeft .titInfo .btnBuy").addClass("on");
            }
        });

        $(".titInfo span").click(function () {
            $(".titInfo span").removeClass("on");
            $(this).addClass("on");
            var id = $(this).attr("data-id");
            var top = $("#"+id).offset().top;
            $('body,html').animate({ scrollTop:top-100 },300);
        });

        /////////////////////////////////数据处理/////////////////////////////////////////////


        // 获取详情页数据
        var goodsId = getUrlData().goodsId;
        var classId = getUrlData().classId;
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getGoods.php",
            type:"post",
            data:{
                goodsID:goodsId
            },
            dataType:"jsonp",
            success:function(data){
                var data = data[0];
                $(".articleName").html(data.goodsName);
                shopInfo(data);
                shopImage(data);
                deatilInfo(data);
            }
        });

        // 拼接右上角信息
        function shopInfo(data){
            var curMoney =0;
            var smallMoney =0;
            if(data.discount==0){
                curMoney = parseFloat(data.price).toFixed(2);
            }else{
                curMoney =  parseFloat(data.discount/10)*parseFloat(data.price);
                curMoney = curMoney.toFixed(2);
                smallMoney = data.price-curMoney;
                smallMoney = smallMoney.toFixed(2);
            }
            var str ="<h3>" +
                "<b class='red'>今日特卖</b>"+data.goodsName+"</h3>" +
                "<h4>"+data.goodsName+"</h4>" +
                "<div class='infoShop'><div class='shopDis'>" +
                "<div class='flexA'><em> ¥</em><i class='curMoney'>"+curMoney+"</i></div><div class='flexB'> <span>市场价</span><i>"+data.price+"</i></div>" +
                "<div class='flexC'><span>折扣</span><b>"+data.discount+"</b></div>" +
                "<div class='flexD'><span>您节省了</span><b>"+smallMoney+"</b> </div><img src='img/sside1.png'></div>" +
                "<div class='shopChose'>" +
                "<div class='line'>" +
                "<span class='lineInfo'>运费</span><div class='infoKd'>包邮 <a href=''>（偏远地区除外）</a></div>" +
                "</div>" +
                "<div class='line'>" +
                "<span class='lineInfo'>颜色</span>" +
                "<div class='infoColor'>" +
                "<ul> <li>红色</li> <li>黄色</li> <li>黑色</li> <li>蓝色</li> <li>紫色</li><li class='die'>绿色</li> <li class='on'>黑色</li><li>蓝色</li><li>紫色</li> <li>绿色</li></ul>" +
                "</div></div>" +
                "<div class='line'>" +
                "<span class='lineInfo'>尺码</span>" +
                "<div class='infoCm'><ul><li>100码</li><li class='on'>110码</li><li>120码</li><li>130码</li><li>140码</li><li class='die'>150码</li></ul></div></div>" +
                "<div class='line'>" +
                "<span class='lineInfo'>购买数量</span>" +
                "<div class='numCtrl'><span class='reduce die'>-</span><b>1</b><span class='add'>+</span></div><span class='label'>每人最多购买5件</span></div></div>" +
                "<button class='btnClear btnBuy'><i></i>立即抢购 </button>" +
                "<p class='timeLast'><i></i><span>还剩 <b>2</b>天<b>19</b> 时<b>19</b>分<b>19</b>秒</span></p></div>"
            $(".topRight").append(str);
        }


        // 拼接左上角图片相册
        function shopImage(data){
            var imgsUrl = $.parseJSON(data.imgsUrl);
            $("#MagnifierWrap2 .spec-items ul").empty();
            $(".MagTargetImg").attr("src",imgsUrl[0]);
            $.each(imgsUrl,function (i,v) {
                var str = "<li><img src="+v+"></li>";
                $("#MagnifierWrap2  .spec-items ul").append(str);
            });
        }
        

        // 底部商品信息
        function  deatilInfo(data) {
            // 商品描述
            if(data.detail){
                $("#goodDeatil p").html(data.detail);
            }else{
                $("#goodDeatil p").html("哎呀！管理员偷懒，没有商品描述。。。");
            }
            // 商品图片
            var imgArr = $.parseJSON(data.goodsBenUrl);
            $.each(imgArr,function (i,v) {
                var str = "<img class='lazy' src='img/bgColor.png' data-original="+v+" alt='"+data.goodsName+"' />";
                $("#goodImg").append(str);
            });

            $("#nowPirc").html($(".curMoney").html());

            // 启动js
            MagnifierF("MagnifierWrap2");
            $("img.lazy").lazyload({
                effect:"fadeIn",
                threshold:200
            });
        }


        // 拼接右边热门推荐数据
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getGoods.php",
            data:{},
            dataType:"jsonp",
            success:function(data){
                console.log(data);
                // for循环  data.length 可以控制显示个数
               for(var i=0; i<data.length;i++){
                   var str = "<dl>" +
                       "<a href=detail.html?classId="+data[i].classID+"&goodsId="+ data[i].goodsID+" >" +
                       "<dt><img class='lazy' src='img/loader.gif' data-original="+data[i].goodsListImg+" alt="+data[i].goodsName+"></dt>" +
                       "<dd><p>"+data[i].goodsName+"</p><span><em>¥ </em>"+ data[i].price+"</span></dd>" +
                       "</a></dl>";
                   $(".botRight .boxClear").append(str);
               }
                $("img.lazy").lazyload({
                    effect:"fadeIn",
                    threshold:200
                });
            }
        })



    })


})();
