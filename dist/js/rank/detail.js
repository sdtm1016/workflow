$(function(){
    $('#navigator').on("tap",function(){
        var navClass=$("#main").attr("class");
        if(navClass.indexOf("move")>-1){
            $("#main, .mod-menu").removeClass("move");
            $('body').removeClass('showGlobalMenu');
        }else{
            $("#main, .mod-menu").addClass("move");
            $('body').addClass('showGlobalMenu');
        }
        return false;
    });

    function tab_scr(num){
        var gradeList = $('#feature-grade-list'+num);
        gradeList.find('.inner').css({
            'width': 70 * gradeList.find('dl').length,
            'overflow': 'hidden'
        });
        var myscroll = new IScroll(gradeList[0], {
            scrollY: false,
            scrollX: true,
            scrollbars: false,
            preventDefault: false,
            eventPassthrough: true
        });
        myscroll.scrollToElement('dl:nth-child(5)', 1000);
    }
    tab_scr(0)
    // ===========TAB=======================
    function tab(){
       var tab=document.querySelector('.mod-detail-nav');
       var tab_li=tab.getElementsByTagName('li');
       // console.log(tab_li.length);
       for(var i=0;i<tab_li.length;i++){
            tab_li[i].index=i;
            tab_li[i].addEventListener('click',function(){
                $('.mod-detail-nav li').removeClass('current');
                $('.mod-detail-nav li').eq(this.index).addClass('current');
                $('.mod-list-record').css({'display':'none'});
                $('.mod-list-record').eq(this.index).css({'display':'block'});
                // myscroll(this.index);
                if(this.index==2){
                   tab_scr(this.index+1); 
                }
                tab_scr(this.index);
            },false) 
        }
    }
    tab();
});










