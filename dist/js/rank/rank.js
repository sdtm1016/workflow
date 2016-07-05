define(function(require, exports, module) {

    var Swipe = require('../lib/swipe.js');
    require('../lib/fx.js');
    var length = $('.me').length;
    var Height = $(window).height();
    var offsetTop = $('.me').offset().top;


    // 渲染函数
    function rendom() {
        if ($('.sticky_wrap').css("position").indexOf("sticky") != -1) {
            $('.me').css({
                'display': 'none'
            });
        }
    }

    rendom();


    // 滚动操作
    $(window).scroll(function() {
        if ($('.sticky_wrap').css("position").indexOf("sticky") == -1) {
            // 不支持时做的操作
            $('.mod-list-global .ui-list').css({
                'margin-bottom': 60
            });
            $('.mod-list-role .ui-list').css({
                'margin-bottom': 60
            });

            $('.sticky_wrap').addClass('sticky');
            var border = document.body.scrollTop + Height;
            var out_border = document.body.scrollTop;
            if (border < offsetTop) {
                $('.sticky_wrap').animate({
                    'opacity': 1
                }, 'ease-out', '100', '', '');
            }
            if (border >= offsetTop && out_border < offsetTop) {
                $('.sticky_wrap').animate({
                    'opacity': 0
                }, 'ease-out', '100', '', '');
            }
            if (out_border > offsetTop) {
                $('.sticky_wrap').animate({
                    'opacity': 1
                }, 'ease-out', '100', '', '');
            }
        } else {
            $('.me').css({
                'display': 'none'
            });
        }
    });



    /*
     * 数字垂直跑马灯滚动（宽度自适应）
     * 
     * @param {string} wrapper  - 传入类名
     * @param {int} from     - 开始的数字 
     * @param {int} to       - 终点的数字 data-number
     * @param {int} speed    - 滚动速度（默认 700ms）
     * @param  样式结构
     */
    function numMarquee(wrapper, dom, from, to, speed) {
        if (typeof from !== 'number' || typeof to !== 'number') {
            throw Error('arguments should be number.');
            return;
        }
        this.options = {
            count: 0,
            translateY: 55,
            speed: speed ? speed : 500,
            from: from.toFixed(0),
            to: to.toFixed(0),
            offset: from - to
        }
        this.obj = {
            wrapper: $(wrapper),
            dom: dom
        }

        while (this.options.count <= Math.abs(this.options.offset)) {
            if (this.options.offset < 0) {
                this.obj.dom.append('<p>' + this.options.from++ + '</p>');
            } else {
                this.obj.dom.append('<p>' + this.options.from-- + '</p>');
            }
            this.options.count++;
        }
    }


    numMarquee.prototype = {
        show: function() {
            this.obj.wrapper.css({
                'opacity': 1,
                '-webkit-transform': 'translate(-50%, -10px)'
            });
            return this;
        },
        hide: function() {
            this.obj.wrapper.css({
                'opacity': 0,
                '-webkit-transform': 'translate(-50%, 0)'
            });
            return this;
        },
        start: function() {
            var self = this;
            setTimeout(function() {
                self.obj.dom.css({
                    '-webkit-transform': 'translateY(-' + (self.options.count) * self.options.translateY + 'px)',
                    '-webkit-transition': 'all ' + self.options.speed + 'ms ease',
                });
            }, 500);
            return this;
        }
    }



    /*
        @param 获取dom
        @param 进行圆环活动

    */
    ;
    (function() {
        var end_number = $('.sum_number').data('sum').toString(),
            length = $('.sum_number li').length;
        for (var i = 0; i < length; i++) {
            function model(i) {
                var from = Number($('.sum_number li').eq(i).text());
                var to = Number(end_number[i]);
                var dom = $('.sum_number li').eq(i);
                var marquee = new numMarquee('.sum_number', dom, from, to, 1500);
                marquee.start();
                setTimeout(link_animate, 1500);
            }
            model(i);
        }

    })()



    /*
      ============================

      @数字变化

      ============================
    */
    var time = function() {
        setTimeout(function() {
            var start_number = Number($('.sum_number').text());
            var end_number = $('.sum_number').data('sum');
            if (start_number < end_number) {
                start_number += 1;
                if (start_number != end_number) {
                    time();
                    $('.sum_number').text(start_number);
                } else {
                    link_animate();
                }
            } else {
                start_number -= 1;
                if (start_number != end_number) {
                    time();
                    $('.sum_number').text(start_number);
                } else {
                    link_animate();
                }
            }

        }, 80);
    }
    time();



    /*
      ========================================
    */
    /*
      @ 数字+1动画
      @ 获取当前节点    
        
    */

    $('.mod-praise').click(function() {
        if ($(this).find('.logo-praise').length) {
            $(this).find('.logo-praise').addClass('no-praise').removeClass('logo-praise');
            $(this).find('.add_praise').removeClass('add');
        } else {
            $(this).find('.add_praise').addClass('add');
            $(this).find('.no-praise').addClass('logo-praise').removeClass('no-praise');
        }
    })



    // 数值动画
    function link_animate() {
        // 升级
        var precent = $('.grap .link i').data('num');
        $('.svip .link i,.vip-red .link i').animate({
            'width': precent + '%'
        }, '300', 'ease-out', function() {
            $('.qipao').addClass('add2');
        }, '');
        // 降级
        $('.demote .link i').animate({
            'width': precent + '%',
            'background-color': '#777777'
        }, '300', 'ease-out', function() {
            $('.qipao').addClass('add2');
        }, '');
        $('.vip-demote .link i').animate({
            'width': precent + '%',
            'background-color': '#777777'
        }, '300', 'ease-out', function() {
            $('.qipao').addClass('add2');
        }, '');
    }



    //  tab切换事件
    $(".mod-rank-tab div").eq(0).on('click', function() {
        $(".mod-rank-tab div").eq(0).addClass('current');
        $(".mod-rank-tab div").eq(1).removeClass('current');
        $(".mod-list-role").css({
            'display': 'block'
        });
        $(".mod-list-global").css({
            'display': 'none'
        });
    })

    //
    $(".mod-rank-tab div").eq(1).on('click', function() {
        $(".mod-rank-tab div").eq(0).removeClass('current');
        $(".mod-rank-tab div").eq(1).addClass('current');
        $(".mod-list-role").css({
            'display': 'none'
        });
        $(".mod-list-global").css({
            'display': 'block'
        });
    })


    // 弹出框
    $('.info-vip-rank').on('click', function() {

        $('.rank-dialog').css({
            'display': '-webkit-box'
        });
        var elem = document.getElementById('mySwipe');
        window.mySwipe = Swipe(elem, {
            width: '200%',
            continuous: false,
            callback: function(index, element) {
                $('.dian li').css({
                    'background-color': '#ccc'
                });
                $('.dian li').eq(index).css({
                    'background-color': '#fff'
                });
            }
        });
    })


    // 关闭按钮
    $('.logo-close').on('tap', function() {
        $('.rank-dialog').css({
            'display': 'none'
        });
    })
})