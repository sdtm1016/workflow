define(function(require, exports, module) {


	// 蒙层
	var tips1 = $('.freshman2-dialog .tips1');
	var tips2 = $('.freshman2-dialog .tips2');
	var tips3 = $('.freshman2-dialog .tips3');
	var tips4 = $('.freshman2-dialog .tips4');
	var tips5 = $('.freshman2-dialog .tips5');
	var tips2_pos = $('.header .my-growth').offset();
	var tips3_pos = $('.header>ul>li').eq(2).find('em').offset();
	var tips1_pos = $('.header>ul>li').eq(0).find('em').offset();
	var tips5_pos = $(window).height()-211;

	var tips4_pos = $('.powerful .dial-wrapper').offset();


	// 各提示元素的定位
	function position(){
	  $('.freshman2-dialog .tips1').css('top',tips1_pos.top+6+'px');
	  $('.freshman2-dialog .tips1').css('left',tips1_pos.left+'px');
	  
	  $('.freshman2-dialog .tips2').css('top',tips2_pos.top+'px');
	  $('.freshman2-dialog .tips2').css('left',tips2_pos.left-60+'px');

	  $('.freshman2-dialog .tips3').css('top',tips3_pos.top+'px');
	  $('.freshman2-dialog .tips3').css('left',tips3_pos.left-160+'px');

	  $('.freshman2-dialog .tips4').css('top',tips4_pos.top-80+'px');	// 重构环境中要这么写
	  // $('.freshman2-dialog .tips4').css('top', '125px');	// 开发环境中要这么写
	  
	  $('.freshman2-dialog .tips5').css('top',tips5_pos+'px');
	}

	// 点击逻辑
	function eventBind(){
		$('.freshman2-dialog').on('click',function(){
	    if(tips1.hasClass('show')){
	      tips1.removeClass('show');
	      tips2.addClass('show');
	    }
	    else if(tips2.hasClass('show')){
	      tips2.removeClass('show');
	      tips3.addClass('show');
	    }
	    else if(tips3.hasClass('show')){

	      tips3.removeClass('show');
	      $('.vipzone-wrapper').css('-webkit-transform',"translate3d(0px, " + (-tips4_pos.top+200) + "px, 0px)");
	      setTimeout(function(){
	        tips4.addClass('show');
	        },800);
	    }
	    else if(tips4.hasClass('show')){
	      tips4.removeClass('show');
	      $('.vipzone-wrapper').css('-webkit-transform',"translate3d(0px, 0px, 0px)");
	      tips5.addClass('show');
	    }
	    else if(tips5.hasClass('show')){
	      $('.vipzone-wrapper').css('-webkit-transform','none');
	      $('.freshman2-dialog').removeClass('show');
	      $('.signin-dialog').addClass('show');
	      $('.topad-dialog').addClass('noshow');
	    }
	  });
	}


	$(window).on('touchmove', '.freshman2-dialog', function() {
		event.preventDefault();
		return;
	})

	module.exports={
		position:position,
		bind:eventBind
	}

});