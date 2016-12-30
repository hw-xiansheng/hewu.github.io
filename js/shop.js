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

        //数量变化小计，总计价格变化
        $(".numCtrl span").click(function () {
            var num = parseInt($(this).siblings("b").html());
            var price = parseFloat($(this).parents(".orderList").find(".price").html());
            $(this).parents(".orderList").find(".smallAnd i").html(num*price);
            allAccout();
        });
        function smallAccout() {
            var smallPrice=0;
            $(".orderList").each(function () {
                var num   = parseInt($(this).find(".numCtrl b").html());
                var price = parseFloat($(this).find(".price").html());
                console.log(price);
                $(this).find(".smallAnd i").html(num*price);
            });
        }
        smallAccout();
        function allAccout(){
            var allNum = 0;
            var allPrice =0;
            $(".orderList").each(function () {
                allNum+=parseInt($(this).find(".numCtrl b").html());
                allPrice+=parseFloat($(this).find(".smallAnd i").html());
            })
            console.log(allPrice);
            $("#allNum").html(allNum);
            $("#allPrice").html(allPrice);
        }
        allAccout();


    })



})();