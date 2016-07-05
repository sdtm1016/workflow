define(function(require, exports, module) {



	/*
	 * 生成会员身份态环形图表
	 *
	 * @param {string} wrapper - wrapper div
	 * @param {int} growth_current - 成长加速当前值
	 * @param {int} growth_svip - 超会对应的成长加速值
	 * @param {int} growth_min - 成长加速最小值
	 * @param {int} growth_max - 成长加速最大值
	 * @param {int} level_current - 等级加速当前值
	 * @param {int} level_svip - 超会对应的等级加速值
	 * @param {int} level_min - 等级加速最小值
	 * @param {int} level_max - 等级加速最大值
	 * @param {int} game_current - 游戏加成当前值
	 * @param {int} game_svip - 超会对应的游戏加成值
	 * @param {int} game_min - 游戏加成最小值
	 * @param {int} game_max - 游戏加成最大值
	 * @param {function} callback - 信息图点击回调
	 *
	 */
	function drawVipDount(wrapper, growth_current, growth_svip, growth_min, growth_max, level_current, level_svip, level_min, level_max, game_current, game_svip, game_min, game_max, callback) {
		if ($(wrapper).length == 0) {
            return ;
        }

		var played = false,	// 动画是否已经播放过
	    	$dial = $(wrapper),
	        
	        $num1 = $('.dial-num .game .val'),
	        $num2 = $('.dial-num .growth .val'),
	        $num3 = $('.dial-num .level .val'),

	        $leftFrom = $dial.find('.left .from'),
	        $leftTo = $dial.find('.left .to'),
	        $rightFrom = $dial.find('.right .from'),
	        $rightTo = $dial.find('.right .to'),

	        $left = $dial.find('.left .volume'),
	        $svipLeft = $dial.find('.left .volume.s'),
	        $right = $dial.find('.right .volume'),
	        $svipRight = $dial.find('.right .volume.s'),
	        $pointer = $dial.find('.layer-above .pointer'),
	        $switch = $dial.find('.center .switch'),
	        $level = $dial.find('.center .lswitch'),

	        tmp1 = 0,
	        tmp2 = 0,
	        tmp3 = 0,

	        threshold = 3,	// 距离圆环多远时执行动画
	        dialTop = $dial.offset().top,
	        dialHeight = $dial.height(),
	        screenHeight = document.documentElement.clientHeight;

	        $num1.text(tmp1);
	        $num2.text(tmp2);
	        $num3.text(tmp3);

	        $leftFrom.text(growth_min);
	        $leftTo.text(growth_max);
			$rightFrom.text(game_min+'%');
	        $rightTo.text(game_max+'%');


		// 滚动触发动画
	    $(window).on('scroll', scrollAnimate);

		function scrollAnimate() {
			if (document.body.scrollTop + screenHeight >= dialTop + dialHeight + threshold && document.body.scrollTop <= dialTop - threshold) {
	            dialAnimate();
	            $(window).off('scroll', scrollAnimate);
	        } else {
	            played = false;
	        }
		}

	    // 圆环动画
	    function dialAnimate() {
	        if (played === true) {
	            return;
	        }
	        played = true;

			if (!$dial.hasClass('isInitial')) {
				$dial.addClass('isInitial');

				tmp1 = numChange(1, $num1, tmp1, game_current, game_current/8, 0);
		        tmp2 = numChange(1, $num2, tmp2, growth_current, growth_current/8, 0);
		        tmp3 = numChange(1, $num3, tmp3, level_current, level_current/8, 1);

		        $left.css({
		        	'clip': 'rect('+(120-(growth_current-growth_min)/(growth_max-growth_min)*120)+'px, 65px, 120px, 0)'
		        })
	        	$right.css({
		        	'clip': 'rect('+(120-(game_current-game_min)/(game_max-game_min)*120)+'px, 65px, 120px, 0)'
		        })
		        if (2*level_current <= level_max+level_min) {
		        	$pointer.css({
			        	'-webkit-transform': 'rotate('+((level_current-level_min)/(level_max-level_min)*134*2-134)+'deg);'
			        })
		        } else {
		        	$pointer.css({
			        	'-webkit-transform': 'rotate('+((2*level_current-level_max-level_min)/(level_max-level_min))*134+'deg);'
			        })
		        }

		        setTimeout(function() {
		        	played = false;
		    		dialAnimate();	
		        }, 500)
			}
			else {
				setTimeout(function() {
					tmp1 = numChange(1, $num1, tmp1, game_svip, (game_svip-game_current)/8, 0);
		        	tmp2 = numChange(1, $num2, tmp2, growth_svip, (growth_svip-growth_current)/8, 0);
		        	tmp3 = numChange(1, $num3, tmp3, level_svip, (level_svip-level_current)/8, 1);

		        	$left.css({ 'opacity': 0 })
		        	$right.css({ 'opacity': 0 })
		        	$svipLeft.css({ 'opacity': 1 })
		        	$svipRight.css({ 'opacity': 1 })
		        	$level.css({ '-webkit-transform': 'translateY(-15px)' })
		        	$switch.css({ '-webkit-transform': 'translateY(-35px)' })
		        	$dial.find('.level').css({ 'background-color': '#ffae07' })

			        $left.css({
			        	'clip': 'rect('+(120-(growth_svip-growth_min)/(growth_max-growth_min)*120)+'px, 65px, 120px, 0)'
			        })
		        	$right.css({
			        	'clip': 'rect('+(120-(game_svip-game_min)/(game_max-game_min)*120)+'px, 65px, 120px, 0)'
			        })
			        if (2*level_svip <= level_max+level_min) {
			        	$pointer.css({
				        	'-webkit-transform': 'rotate('+((level_svip-level_min)/(level_max-level_min)*134*2-134)+'deg);'
				        })
			        } else {
			        	$pointer.css({
				        	'-webkit-transform': 'rotate('+((2*level_svip-level_max-level_min)/(level_max-level_min))*134+'deg);'
				        })
			        }

			        setTimeout(function() {
			        	tmp1 = numChange(0, $num1, tmp1, game_current, (game_svip-game_current)/8, 0);
			        	tmp2 = numChange(0, $num2, tmp2, growth_current, (growth_svip-growth_current)/8, 0);
			        	tmp3 = numChange(0, $num3, tmp3, level_current, (level_svip-level_current)/8, 1);

			        	$left.css({ 'opacity': 1 })
		        		$right.css({ 'opacity': 1 })
			        	$svipLeft.css({ 'opacity': 0 })
		        		$svipRight.css({ 'opacity': 0 })
		        		$level.css({ '-webkit-transform': 'none' })
			        	$switch.css({ '-webkit-transform': 'none' })
			        	$dial.find('.level').css({ 'background-color': '#ef462e' })

			        	$left.css({
				        	'clip': 'rect('+(120-(growth_current-growth_min)/(growth_max-growth_min)*120)+'px, 65px, 120px, 0)'
				        })
			        	$right.css({
				        	'clip': 'rect('+(120-(game_current-game_min)/(game_max-game_min)*120)+'px, 65px, 120px, 0)'
				        })
				        if (2*level_current <= level_max+level_min) {
				        	$pointer.css({
					        	'-webkit-transform': 'rotate('+((level_current-level_min)/(level_max-level_min)*134*2-134)+'deg);'
					        })
				        } else {
				        	$pointer.css({
					        	'-webkit-transform': 'rotate('+((2*level_current-level_max-level_min)/(level_max-level_min))*134+'deg);'
					        })
				        }
			        }, 1200)
		        }, 300)
			}
	    }

	    $dial.find('.center').on('click', function() {
	    	played = false;
	    	dialAnimate();
	    	callback ? callback() : '';
	    })
	}








	/*
	 * 生成超级会员身份态环形图表
	 *
	 * @param {string} wrapper - wrapper div
	 * @param {boolean} isSvip8 - 是否 SVIP8
	 * @param {int} growth_svip - 超会对应的成长加速值
	 * @param {int} growth_min - 成长加速最小值
	 * @param {int} growth_max - 成长加速最大值
	 * @param {int} level_svip - 超会对应的等级加速值
	 * @param {int} level_min - 等级加速最小值
	 * @param {int} level_max - 等级加速最大值
	 * @param {int} game_svip - 超会对应的游戏加成值
	 * @param {int} game_min - 游戏加成最小值
	 * @param {int} game_max - 游戏加成最大值
	 * @param {function} callback - 信息图点击回调
	 *
	 */
	function drawSvipDount(wrapper, isSvip8, growth_svip, growth_min, growth_max, level_svip, level_min, level_max, game_svip, game_min, game_max, callback) {
		if ($(wrapper).length == 0) {
            return ;
        }

		var played = false,	// 动画是否已经播放过
	    	$dial = $(wrapper),
	        
	        $num1 = $('.dial-num .game .val'),
	        $num2 = $('.dial-num .growth .val'),
	        $num3 = $('.dial-num .level .val'),

	        $leftFrom = $dial.find('.left .from'),
	        $leftTo = $dial.find('.left .to'),
	        $rightFrom = $dial.find('.right .from'),
	        $rightTo = $dial.find('.right .to'),

	        $left = $dial.find('.left .volume'),
	        $right = $dial.find('.right .volume'),
	        $pointer = $dial.find('.layer-above .pointer'),
	        $switch = $dial.find('.center .switch'),
	        $level = $dial.find('.center .lswitch'),

	        tmp1 = 0,
	        tmp2 = 0,
	        tmp3 = 0,

	        threshold = 3,	// 距离圆环多远时执行动画
	        dialTop = $dial.offset().top,
	        dialHeight = $dial.height(),
	        screenHeight = document.documentElement.clientHeight;

	        $num1.text(tmp1);
	        $num2.text(tmp2);
	        $num3.text(tmp3);

	        $leftFrom.text(growth_min);
	        $leftTo.text(growth_max);
			$rightFrom.text(game_min+'%');
	        $rightTo.text(game_max+'%');


		// 滚动触发动画
	    $(window).on('scroll', scrollAnimate);


		function scrollAnimate() {
			if (document.body.scrollTop + screenHeight >= dialTop + dialHeight + threshold && document.body.scrollTop <= dialTop - threshold) {
	            dialAnimate();
	            $(window).off('scroll', scrollAnimate);
	        } else {
	            played = false;
	        }
		}


	    // 圆环动画
	    function dialAnimate() {
	        if (played === true) {
	            return;
	        }
	        played = true;

			if (!$dial.hasClass('isInitial')) {
				$dial.addClass('isInitial');

				if (isSvip8) {
					tmp1 = numChange(1, $num1, tmp1, game_max, game_max/8, 0);
		        	tmp2 = numChange(1, $num2, tmp2, growth_max, growth_max/8, 0);
		        	tmp3 = numChange(1, $num3, tmp3, level_max, level_max/8, 1);

		        	$level.css({ '-webkit-transform': 'translateY(-15px)' })
		        	$switch.css({ '-webkit-transform': 'translateY(-35px)' })

			        $left.css({
			        	'clip': 'rect(0, 65px, 120px, 0)'
			        })
		        	$right.css({
			        	'clip': 'rect(0, 65px, 120px, 0)'
			        })
		        	$pointer.css({
			        	'-webkit-transform': 'rotate(134deg)'
			        })
				}
				else {
					tmp1 = numChange(1, $num1, tmp1, game_svip, game_svip/8, 0);
			        tmp2 = numChange(1, $num2, tmp2, growth_svip, growth_svip/8, 0);
			        tmp3 = numChange(1, $num3, tmp3, level_svip, level_svip/8, 1);

			        $left.css({
			        	'clip': 'rect('+(120-(growth_svip-growth_min)/(growth_max-growth_min)*120)+'px, 65px, 120px, 0)'
			        })
		        	$right.css({
			        	'clip': 'rect('+(120-(game_svip-game_min)/(game_max-game_min)*120)+'px, 65px, 120px, 0)'
			        })
			        if (2*level_svip <= level_max+level_min) {
			        	$pointer.css({
				        	'-webkit-transform': 'rotate('+((level_svip-level_min)/(level_max-level_min)*134*2-134)+'deg);'
				        })
			        } else {
			        	$pointer.css({
				        	'-webkit-transform': 'rotate('+((2*level_svip-level_max-level_min)/(level_max-level_min))*134+'deg);'
				        })
			        }

			        setTimeout(function() {
			        	played = false;
			    		dialAnimate();	
			        }, 500)
				}
			}
			else {
				setTimeout(function() {

					if (isSvip8) {
						tmp1 = 0;
						tmp2 = 0;
						tmp3 = 0;

						$num1.text(0);
						$num2.text(0);
						$num3.text(0);

						$level.css({
							'-webkit-transition': 'none',
							'-webkit-transform': 'none'
						})
			        	$switch.css({
			        		'-webkit-transition': 'none',
			        		'-webkit-transform': 'none'
			        	})

			        	$left.css({
			        		'-webkit-transition': 'none',
				        	'clip': 'rect(120px, 65px, 120px, 0)'
				        })
			        	$right.css({
			        		'-webkit-transition': 'none',
				        	'clip': 'rect(120px, 65px, 120px, 0)'
				        })
			        	$pointer.css({
			        		'-webkit-transition': 'none',
				        	'-webkit-transform': 'rotate(-134deg)'
				        })


			        	setTimeout(function() {
							tmp1 = numChange(1, $num1, tmp1, game_max, game_max/8, 0);
				        	tmp2 = numChange(1, $num2, tmp2, growth_max, growth_max/8, 0);
				        	tmp3 = numChange(1, $num3, tmp3, level_max, level_max/8, 1);

				        	$level.css({
				        		'-webkit-transition': '-webkit-transform 700ms ease',
				        		'-webkit-transform': 'translateY(-15px)'
				        	})
				        	$switch.css({
				        		'-webkit-transition': '-webkit-transform 700ms ease',
				        		'-webkit-transform': 'translateY(-35px)'
				        	})
					        $left.css({
					        	'-webkit-transition': 'clip 700ms cubic-bezier(.17,.67,.69,1.14),opacity 200ms ease',
					        	'clip': 'rect(0, 65px, 120px, 0)'
					        })
				        	$right.css({
				        		'-webkit-transition': 'clip 700ms cubic-bezier(.17,.67,.69,1.14),opacity 200ms ease',
					        	'clip': 'rect(0, 65px, 120px, 0)'
					        })
				        	$pointer.css({
				        		'-webkit-transition': '-webkit-transform 700ms cubic-bezier(.17,.67,.69,1.14)',
					        	'-webkit-transform': 'rotate(134deg)'
					        })
			        	}, 100)
					}
					else {
						tmp1 = numChange(1, $num1, tmp1, game_max, (game_max-game_svip)/8, 0);
			        	tmp2 = numChange(1, $num2, tmp2, growth_max, (growth_max-growth_svip)/8, 0);
			        	tmp3 = numChange(1, $num3, tmp3, level_max, (level_max-level_svip)/8, 1);

			        	$level.css({ '-webkit-transform': 'translateY(-15px)' })
			        	$switch.css({ '-webkit-transform': 'translateY(-35px)' })

				        $left.css({
				        	'clip': 'rect(0, 65px, 120px, 0)'
				        })
			        	$right.css({
				        	'clip': 'rect(0, 65px, 120px, 0)'
				        })
			        	$pointer.css({
				        	'-webkit-transform': 'rotate(134deg)'
				        })

				        setTimeout(function() {
				        	tmp1 = numChange(0, $num1, tmp1, game_svip, (game_max-game_svip)/8, 0);
				        	tmp2 = numChange(0, $num2, tmp2, growth_svip, (growth_max-growth_svip)/8, 0);
				        	tmp3 = numChange(0, $num3, tmp3, level_svip, (level_max-level_svip)/8, 1);

			        		$level.css({ '-webkit-transform': 'none' })
				        	$switch.css({ '-webkit-transform': 'none' })

				        	$left.css({
					        	'clip': 'rect('+(120-(growth_svip-growth_min)/(growth_max-growth_min)*120)+'px, 65px, 120px, 0)'
					        })
				        	$right.css({
					        	'clip': 'rect('+(120-(game_svip-game_min)/(game_max-game_min)*120)+'px, 65px, 120px, 0)'
					        })
					        if (2*level_svip <= level_max+level_min) {
					        	$pointer.css({
						        	'-webkit-transform': 'rotate('+((level_svip-level_min)/(level_max-level_min)*134*2-134)+'deg);'
						        })
					        } else {
					        	$pointer.css({
						        	'-webkit-transform': 'rotate('+((2*level_svip-level_max-level_min)/(level_max-level_min))*134+'deg);'
						        })
					        }
				        }, 1200)
					}
		        }, 300)
			}
	    }

	    $dial.find('.center').on('click', function() {
	    	played = false;
	    	dialAnimate();
	    	callback ? callback() : '';
	    })
	}






	/*
	 * 生成过期会员身份态环形图表
	 *
	 * @param {string} wrapper - wrapper div
	 * @param {int} growth_current - 成长加速当前值
	 * @param {int} growth_svip - 超会对应的成长加速值
	 * @param {int} growth_min - 成长加速最小值
	 * @param {int} growth_max - 成长加速最大值
	 * @param {int} level_current - 等级加速当前值
	 * @param {int} level_svip - 超会对应的等级加速值
	 * @param {int} level_min - 等级加速最小值
	 * @param {int} level_max - 等级加速最大值
	 * @param {int} game_current - 游戏加成当前值
	 * @param {int} game_svip - 超会对应的游戏加成值
	 * @param {int} game_min - 游戏加成最小值
	 * @param {int} game_max - 游戏加成最大值
	 * @param {function} callback - 信息图点击回调
	 *
	 */
	function drawOverdueDount(wrapper, growth_current, growth_svip, growth_min, growth_max, level_current, level_svip, level_min, level_max, game_current, game_svip, game_min, game_max, callback) {
		if ($(wrapper).length == 0) {
            return ;
        }

		var played = false,	// 动画是否已经播放过
	    	$dial = $(wrapper),
	        
	        $num1 = $('.dial-num .game .val'),
	        $num2 = $('.dial-num .growth .val'),
	        $num3 = $('.dial-num .level .val'),

	        $leftFrom = $dial.find('.left .from'),
	        $leftTo = $dial.find('.left .to'),
	        $rightFrom = $dial.find('.right .from'),
	        $rightTo = $dial.find('.right .to'),

	        $left = $dial.find('.left .volume'),
	        $right = $dial.find('.right .volume'),
	        $pointer = $dial.find('.layer-above .pointer'),
	        $switch = $dial.find('.center .switch'),
	        $level = $dial.find('.center .lswitch'),

	        tmp1 = game_svip,
	        tmp2 = growth_svip,
	        tmp3 = level_svip,

	        threshold = 3,	// 距离圆环多远时执行动画
	        dialTop = $dial.offset().top,
	        dialHeight = $dial.height(),
	        screenHeight = document.documentElement.clientHeight;

	        $num1.text(tmp1);
	        $num2.text(tmp2);
	        $num3.text(tmp3);

	        $left.css({
	        	'clip': 'rect('+(120-(growth_svip-growth_min)/(growth_max-growth_min)*120)+'px, 65px, 120px, 0)'
	        })
        	$right.css({
	        	'clip': 'rect('+(120-(game_svip-game_min)/(game_max-game_min)*120)+'px, 65px, 120px, 0)'
	        })
	        if (2*level_svip <= level_max+level_min) {
	        	$pointer.css({
		        	'-webkit-transform': 'rotate('+((level_svip-level_min)/(level_max-level_min)*134*2-134)+'deg);'
		        })
	        } else {
	        	$pointer.css({
		        	'-webkit-transform': 'rotate('+((2*level_svip-level_max-level_min)/(level_max-level_min))*134+'deg);'
		        })
	        }

	        $leftFrom.text(growth_min);
	        $leftTo.text(growth_max);
			$rightFrom.text(game_min+'%');
	        $rightTo.text(game_max+'%');


		// 滚动触发动画
	    $(window).on('scroll', scrollAnimate);


		function scrollAnimate() {
			if (document.body.scrollTop + screenHeight >= dialTop + dialHeight + threshold && document.body.scrollTop <= dialTop - threshold) {
	            dialAnimate();
	            $(window).off('scroll', scrollAnimate);
	        } else {
	            played = false;
	        }
		}


	    // 圆环动画
	    function dialAnimate() {
	        if (played === true) {
	            return;
	        }
	        played = true;

			if (!$dial.hasClass('isInitial')) {
				$dial.addClass('isInitial');

				tmp1 = numChange(0, $num1, tmp1, game_current, game_svip/8, 0);
		        tmp2 = numChange(0, $num2, tmp2, growth_current, (growth_svip-growth_current)/8, 0);
		        tmp3 = numChange(0, $num3, tmp3, level_current, level_svip/8, 1);

		        $dial.find('.level').css({ 'background-color': '#b9b5a5' })
		        $left.css({
		        	'clip': 'rect(120px, 65px, 120px, 0)'
		        })
	        	$right.css({
		        	'clip': 'rect(120px, 65px, 120px, 0)'
		        })
	        	$pointer.css({
		        	'-webkit-transform': 'rotate(-134deg);'
		        })
		        $level.css({ '-webkit-transform': 'translateY(-15px)' })
		        $switch.css({ '-webkit-transform': 'translateY(-35px)' })
			}
			else {
				setTimeout(function() {
					tmp1 = numChange(1, $num1, tmp1, game_svip, (game_svip-game_current)/8, 0);
		        	tmp2 = numChange(1, $num2, tmp2, growth_svip, (growth_svip-growth_current)/8, 0);
		        	tmp3 = numChange(1, $num3, tmp3, level_svip, (level_svip-level_current)/8, 1);

		        	$level.css({ '-webkit-transform': 'none' })
		        	$switch.css({ '-webkit-transform': 'none' })
		        	$dial.find('.level').css({ 'background-color': '#ffae07' })

			        $left.css({
			        	'clip': 'rect('+(120-(growth_svip-growth_min)/(growth_max-growth_min)*120)+'px, 65px, 120px, 0)'
			        })
		        	$right.css({
			        	'clip': 'rect('+(120-(game_svip-game_min)/(game_max-game_min)*120)+'px, 65px, 120px, 0)'
			        })
			        if (2*level_svip <= level_max+level_min) {
			        	$pointer.css({
				        	'-webkit-transform': 'rotate('+((level_svip-level_min)/(level_max-level_min)*134*2-134)+'deg);'
				        })
			        } else {
			        	$pointer.css({
				        	'-webkit-transform': 'rotate('+((2*level_svip-level_max-level_min)/(level_max-level_min))*134+'deg);'
				        })
			        }

			        setTimeout(function() {
			        	tmp1 = numChange(0, $num1, tmp1, game_current, game_svip/8, 0);
				        tmp2 = numChange(0, $num2, tmp2, growth_current, (growth_svip-growth_current)/8, 0);
				        tmp3 = numChange(0, $num3, tmp3, level_current, level_svip/8, 1);

				        $dial.find('.level').css({ 'background-color': '#b9b5a5' })
				        $left.css({
				        	'clip': 'rect(120px, 65px, 120px, 0)'
				        })
			        	$right.css({
				        	'clip': 'rect(120px, 65px, 120px, 0)'
				        })
			        	$pointer.css({
				        	'-webkit-transform': 'rotate(-134deg);'
				        })
				        $level.css({ '-webkit-transform': 'translateY(-15px)' })
				        $switch.css({ '-webkit-transform': 'translateY(-35px)' })
			        }, 1200)
		        }, 300)
			}
	    }

	    $dial.find('.center').on('click', function() {
	    	played = false;
	    	dialAnimate();
	    	callback ? callback() : '';
	    })
	}






	/*
	 * 成长值升降提示
	 * 
	 * @param {string} wrapper  - 传入类名
	 * @param {int} change     - 变动值
	 *
	 */
	function numMarquee(wrapper, change) {
		if (typeof change !== 'number' || $(wrapper).length == 0) {
			return;
		}
		this.wrapper = $(wrapper);
		this.wrapper.find('.rank .change').text(change);

		if (this.wrapper.offset().left < 1) {
			this.wrapper.css({
				'margin-left': Math.ceil(Math.abs(this.wrapper.offset().left))+2
			})	
		}
	}
	numMarquee.prototype = {
		show: function() {
			if (this.wrapper.length > 0) {
				this.wrapper.css({
					'opacity': 1,
					'top': -10
				});
			}
			return this;
		},
		hide: function() {
			if (this.wrapper.length > 0) {
				this.wrapper.css({
					'opacity': 0,
					'top': 0
				});
			}
			return this;
		}
	}





	/*
	 * 数字递增递减函数
	 * 
	 * @param {string} flag - 增减还是递减 (1:递增, else: 递减)
	 * @param {object} obj  - 传入 jQuery 对象
	 * @param {int} tmp     - 呈现于页面中的数字，也是递增递减的基数
	 * @param {int} last    - 最终的数值
	 * @param {int} step    - 递增递减的幅度
	 * @param {int} point   - 保留小数点后几位
	 * @param {int} suffix  - 数字的后缀（单位）
	 *
	 */
	function numChange(flag, obj, tmp, last, step, point, suffix, callback) {
	    suffix = suffix ? suffix : '';
	    var timer = function() {
	        setTimeout(function() {
	            flag === 1 ? tmp+=step:tmp-=step;
	            obj.text(tmp.toFixed(point)+suffix);

	            if(flag === 1 ? tmp<=last:tmp>=last){
	                timer();
	            }
	            else {
	                obj.text(last+suffix);
	                callback ? callback() : '';
	            }
	        }, 60);
	    }
	    if (step != 0) {
	        timer();
	        return last;
	    }
	}





	/*
	 * 函数节流（计算短时间内点击数）
	 * @param {function} fu - 要执行的函数 
	 * @param {int} delay   - 时间阈值
	 *
	 */
	function throttle(method, delay, context) {
	    clearTimeout(method.tId);
	    method.tId = setTimeout(function(){
	        method.call(context);
	    }, delay);
	}





	/*
	 * 顶栏透明
	 */
	// var mqq = require('http://open.mobile.qq.com/sdk/qqapi.js?_bid=152')

	// if (mqq.QQVersion.split('.')[0]>5) {
	// 	mqq.build('mqq.ui.setWebViewBehavior', {
	// 		iOS: function (params) {
	// 			mqq.invoke("ui", "setWebViewBehavior", params);
	// 		},
	// 		android: function (params) {
	// 			mqq.invoke("ui", "setWebViewBehavior", params);
	// 		},
	// 		supportInvoke: true,
	// 		support: {
	// 			iOS: '6.3.5',
	// 			android: '6.3.5'
	// 		}
	// 	});


	// 	mqq.build('mqq.ui.getTitleBarHeight', {
	// 		iOS: function (params) {
	// 			mqq.invoke("ui", "getTitleBarHeight", params);
	// 		},
	// 		android: function (params) {
	// 			mqq.invoke("ui", "getTitleBarHeight", params);
	// 		},
	// 		supportInvoke: true,
	// 		support: {
	// 			iOS: '6.3.5',
	// 			android: '6.3.5'
	// 		}
	// 	});

	// 	$(window).off('touchmove').on('touchmove', function () {
	// 		handler();
	// 	});

	// 	$(window).off('scroll').on('scroll', function () {
	// 		handler();
	// 	});

	// 	var height = 128,
	// 		lastStatus = 0;

	// 	function handler() {
	// 		var top = $(window).scrollTop();

	// 		if (top > height) {
	// 			if (lastStatus == 1) {
	// 				mqq.ui.setWebViewBehavior({
	// 					titleText: '我的超级会员',
	// 					navBgColor: 0x00B6F8,
	// 					navTextColor: 0xFFFFFF,
	// 					webPageBackgroundColorOpen: true,
	// 					webPageBackgroundColor: 0x0F0000
	// 				});
	// 			}
	// 			lastStatus = 2;

	// 		} else if (top < (height / 2)) {
	// 			if (lastStatus == 2) {
	// 				mqq.ui.setWebViewBehavior({
	// 					titleText: '',
	// 					navBgColor: 0x00B6F8,
	// 					navBgColorAlpha: 0,
	// 					webPageBackgroundColorOpen: true,
	// 					webPageBackgroundColor: 0x0F0000
	// 				});
	// 			}
	// 			lastStatus = 1;
	// 		}
	// 	}
	// }
	// else {
	// 	$('body').addClass('lower');
	// }





	module.exports = {
		'drawVipDount': drawVipDount,
		'drawSvipDount': drawSvipDount,
		'drawOverdueDount': drawOverdueDount,
		'numMarquee': numMarquee
	};



});