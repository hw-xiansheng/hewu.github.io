(function () {

    $(function () {


        //顶部搜索框下拉弹出框
        $(".mRight .search .iptClear").focus(function () {
            $(this).dblclick(function () {
                $(".mRight .search .ipt").addClass("on");
            });
        }).blur(function () {
            $(".mRight .search .ipt").removeClass("on");
        });

        //顶部购物车价格计算
        var totalPrice=0;
        var allNum = 0;
        $(".shopMenu li").each(function (i,v) {
            var price = parseFloat($(this).find(".flexC .price").html());
            var num = parseInt(($(this).find(".flexC .num").html()));
            allNum+=num;
            totalPrice+=(price*num);
        });
        $(".shopMenu .total .allPrice").html(totalPrice);
        $(".shopMenu .total .allNum").html(allNum);


        // 右下角返回顶部事件
        $(".iconTitB").last().click(function () {
            $("body,html").animate({scrollTop:0},500);
        });

        // 加减按钮事件
        $(".numCtrl .reduce").click(function () {
           var value =  $(this).next().html();
            if(value==1){
                $(this).addClass("die");
                return;
            }else{
                $(this).next().html(--value);
                $(this).parent().find(".add").removeClass("die");
            }
        });
        $(".numCtrl .add").click(function () {
            var value = $(this).prev().html();
            if(value==5){
                $(this).addClass("die");
                return;
            }else{
                $(this).prev().html(++value);
                $(this).parent().find(".reduce").removeClass("die");
            }
        });



        /////////////////////////////////数据处理/////////////////////////////////////////////


        // 获取url页面传值
        function getUrlData(){
            var urlData = window.location.search;
            var urlDataArray = urlData.substr(1).split("&");
            var dataObj ={};
            $.each(urlDataArray,function(i,v){
                var smallArr =v.split("=");
                dataObj[smallArr[0]] = smallArr[1];
            });
            return dataObj;
        }
        window.getUrlData = getUrlData;

        // 导航请求数据
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getclass.php",
            data:{},
            dataType:"",
            success:function(data){
                var arr= $.parseJSON(data);
                $.each(arr,function(i,v){
                    var classId = v.classID;
                    var className = v.className;
                    var str = "<li><a href='list.html?classId="+classId+"'>"+className+"</a></li>";
                    $(".navMenu").append(str);
                });
                // 导航当前样式 【列表详情】
                if(getUrlData()){
                    var classId = getUrlData().classId;
                    $(".navMenu li").eq(classId).addClass("on");
                    $(".listName").html($(".navMenu li").eq(classId).html());
                }
            }
        });







    })

})();
