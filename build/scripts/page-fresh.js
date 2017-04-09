(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ADRSandbox = require('./../core/sandbox'),
    ADRApplication = new scaleApp.Core(ADRSandbox)
    ;

ADRApplication.use(scaleApp.plugins.ls);
ADRApplication.use(scaleApp.plugins.util);
ADRApplication.use(scaleApp.plugins.submodule, {
    inherit: true,             // use all plugins from the parent's Core
    use: ['ls','submodule', 'util'],        // use some additional plugins
    useGlobalMediator: true   // emit and receive all events from the parent's Core
});

ADRApplication.userAgent = new UAParser();

module.exports = ADRApplication;
},{"./../core/sandbox":2}],2:[function(require,module,exports){
var ADRSandbox = function(core, instanceId, options, moduleId) {

    // define your API
    this.namespace = "adr";

    // e.g. provide the Mediator methods 'on', 'emit', etc.
    core._mediator.installTo(this);

    // ... or define your custom communication methods
    this.myEmit = function(channel, data){
        core.emit(channel + '/' + instanceId, data);
    };

    // maybe you'd like to expose the instance ID
    this.id = instanceId;

    this.options = options;

    //temporarily put on sandbox for ease access
    this.userAgent = new UAParser();

    return this;
};

module.exports = ADRSandbox;
},{}],3:[function(require,module,exports){
var moduleVinDSHeader = function(sandbox){
    var _this = this;

    _this.handleMegaMenu = function(){
        _this.objects.$megaMenuItems.each(function(){
            var $this = $(this),
                $target = $($this.data('target'))
            ;

            $this
                .on('mouseenter', function () {
                    $this
                        .addClass('active')
                        .siblings('.active')
                        .removeClass('active')
                    ;

                    _this.objects.$megaMenuContents.removeClass('active');

                    $target
                        .addClass('active')
                    ;
                })
            ;
        });

        _this.objects.$megaMenu.on('mouseleave', function(){
            _this.objects.$megaMenuItems.removeClass('active');
            _this.objects.$megaMenuContents.removeClass('active');
        });
    }



    _this.init = function (options) {
        _this.objects = {};
        _this.objects.$megaMenu = $('#segment_navigation__mega_menu');
        _this.objects.$megaMenuItems = _this.objects.$megaMenu.find('>.list > .item');
        _this.objects.$megaMenuContents = _this.objects.$megaMenu.find('> .contents > .content');

        _this.handleMegaMenu();
    }

    _this.destroy = function(){

    }

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}

module.exports = moduleVinDSHeader;
},{}],4:[function(require,module,exports){
'use strict';

/**
 * init application
 */

var application = require('./core/application');

/**
 * register modules
 */
//temporariliy use vinds.header module
application.register('moduleHeader', require('./modules/vinds.header'));

if ($('.page-list.page-fresh').length) {
    application.register('pageHome', require('./pages/page-fresh.home'));
}


/**
 * start
 */
$(function () {
    application.start();
});

//expose application to global
if ('undefined' === typeof window['PageFreshApplication']) {
    window['PageFreshApplication'] = application;
}
},{"./core/application":1,"./modules/vinds.header":3,"./pages/page-fresh.home":5}],5:[function(require,module,exports){
'use strict';

var pageFreshHome = function (sandbox) {
    var _this = this;

    _this.handleSegment1 = function () {
        var $segment = $('#main__segment_1');
        $segment.find('.carousel-indicators').niceScroll({
            horizrailenabled: false
        });
    }

    _this.handleSegment3 = function () {
        var $segment = $('#main__segment_3');
        $segment.find('.body >.list').slick({
            //centerMode: true,
            //variableWidth: true,
            infinite: false,
            dots: false,
            slidesToShow: 6,
            slidesToScroll: 5,
            prevArrow: '<span class="slick-prev"></span>',
            nextArrow: '<span class="slick-next"></span>',
            responsive: [
                {
                    breakpoint: 1270,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 4,
                        infinite: false
                    }
                }
            ]
        });
    }

    _this.init = function (data) {
        _this.handleSegment1();
        _this.handleSegment3();
    };

    _this.destroy = function () { }

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}

module.exports = pageFreshHome;
},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9jb3JlL2FwcGxpY2F0aW9uLmpzIiwic291cmNlL3NjcmlwdHMvY29yZS9zYW5kYm94LmpzIiwic291cmNlL3NjcmlwdHMvbW9kdWxlcy92aW5kcy5oZWFkZXIuanMiLCJzb3VyY2Uvc2NyaXB0cy9wYWdlLWZyZXNoLmpzIiwic291cmNlL3NjcmlwdHMvcGFnZXMvcGFnZS1mcmVzaC5ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQURSU2FuZGJveCA9IHJlcXVpcmUoJy4vLi4vY29yZS9zYW5kYm94JyksXHJcbiAgICBBRFJBcHBsaWNhdGlvbiA9IG5ldyBzY2FsZUFwcC5Db3JlKEFEUlNhbmRib3gpXHJcbiAgICA7XHJcblxyXG5BRFJBcHBsaWNhdGlvbi51c2Uoc2NhbGVBcHAucGx1Z2lucy5scyk7XHJcbkFEUkFwcGxpY2F0aW9uLnVzZShzY2FsZUFwcC5wbHVnaW5zLnV0aWwpO1xyXG5BRFJBcHBsaWNhdGlvbi51c2Uoc2NhbGVBcHAucGx1Z2lucy5zdWJtb2R1bGUsIHtcclxuICAgIGluaGVyaXQ6IHRydWUsICAgICAgICAgICAgIC8vIHVzZSBhbGwgcGx1Z2lucyBmcm9tIHRoZSBwYXJlbnQncyBDb3JlXHJcbiAgICB1c2U6IFsnbHMnLCdzdWJtb2R1bGUnLCAndXRpbCddLCAgICAgICAgLy8gdXNlIHNvbWUgYWRkaXRpb25hbCBwbHVnaW5zXHJcbiAgICB1c2VHbG9iYWxNZWRpYXRvcjogdHJ1ZSAgIC8vIGVtaXQgYW5kIHJlY2VpdmUgYWxsIGV2ZW50cyBmcm9tIHRoZSBwYXJlbnQncyBDb3JlXHJcbn0pO1xyXG5cclxuQURSQXBwbGljYXRpb24udXNlckFnZW50ID0gbmV3IFVBUGFyc2VyKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFEUkFwcGxpY2F0aW9uOyIsInZhciBBRFJTYW5kYm94ID0gZnVuY3Rpb24oY29yZSwgaW5zdGFuY2VJZCwgb3B0aW9ucywgbW9kdWxlSWQpIHtcclxuXHJcbiAgICAvLyBkZWZpbmUgeW91ciBBUElcclxuICAgIHRoaXMubmFtZXNwYWNlID0gXCJhZHJcIjtcclxuXHJcbiAgICAvLyBlLmcuIHByb3ZpZGUgdGhlIE1lZGlhdG9yIG1ldGhvZHMgJ29uJywgJ2VtaXQnLCBldGMuXHJcbiAgICBjb3JlLl9tZWRpYXRvci5pbnN0YWxsVG8odGhpcyk7XHJcblxyXG4gICAgLy8gLi4uIG9yIGRlZmluZSB5b3VyIGN1c3RvbSBjb21tdW5pY2F0aW9uIG1ldGhvZHNcclxuICAgIHRoaXMubXlFbWl0ID0gZnVuY3Rpb24oY2hhbm5lbCwgZGF0YSl7XHJcbiAgICAgICAgY29yZS5lbWl0KGNoYW5uZWwgKyAnLycgKyBpbnN0YW5jZUlkLCBkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gbWF5YmUgeW91J2QgbGlrZSB0byBleHBvc2UgdGhlIGluc3RhbmNlIElEXHJcbiAgICB0aGlzLmlkID0gaW5zdGFuY2VJZDtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgIC8vdGVtcG9yYXJpbHkgcHV0IG9uIHNhbmRib3ggZm9yIGVhc2UgYWNjZXNzXHJcbiAgICB0aGlzLnVzZXJBZ2VudCA9IG5ldyBVQVBhcnNlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBRFJTYW5kYm94OyIsInZhciBtb2R1bGVWaW5EU0hlYWRlciA9IGZ1bmN0aW9uKHNhbmRib3gpe1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICBfdGhpcy5oYW5kbGVNZWdhTWVudSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVJdGVtcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJCgkdGhpcy5kYXRhKCd0YXJnZXQnKSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgJHRoaXNcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLmFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51Q29udGVudHMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51Lm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVJdGVtcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51Q29udGVudHMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX3RoaXMuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cyA9IHt9O1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51ID0gJCgnI3NlZ21lbnRfbmF2aWdhdGlvbl9fbWVnYV9tZW51Jyk7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVJdGVtcyA9IF90aGlzLm9iamVjdHMuJG1lZ2FNZW51LmZpbmQoJz4ubGlzdCA+IC5pdGVtJyk7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVDb250ZW50cyA9IF90aGlzLm9iamVjdHMuJG1lZ2FNZW51LmZpbmQoJz4gLmNvbnRlbnRzID4gLmNvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgX3RoaXMuaGFuZGxlTWVnYU1lbnUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBfdGhpcy5pbml0LFxyXG4gICAgICAgIGRlc3Ryb3k6IF90aGlzLmRlc3Ryb3lcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVWaW5EU0hlYWRlcjsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaW5pdCBhcHBsaWNhdGlvblxyXG4gKi9cclxuXHJcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoJy4vY29yZS9hcHBsaWNhdGlvbicpO1xyXG5cclxuLyoqXHJcbiAqIHJlZ2lzdGVyIG1vZHVsZXNcclxuICovXHJcbi8vdGVtcG9yYXJpbGl5IHVzZSB2aW5kcy5oZWFkZXIgbW9kdWxlXHJcbmFwcGxpY2F0aW9uLnJlZ2lzdGVyKCdtb2R1bGVIZWFkZXInLCByZXF1aXJlKCcuL21vZHVsZXMvdmluZHMuaGVhZGVyJykpO1xyXG5cclxuaWYgKCQoJy5wYWdlLWxpc3QucGFnZS1mcmVzaCcpLmxlbmd0aCkge1xyXG4gICAgYXBwbGljYXRpb24ucmVnaXN0ZXIoJ3BhZ2VIb21lJywgcmVxdWlyZSgnLi9wYWdlcy9wYWdlLWZyZXNoLmhvbWUnKSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogc3RhcnRcclxuICovXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgYXBwbGljYXRpb24uc3RhcnQoKTtcclxufSk7XHJcblxyXG4vL2V4cG9zZSBhcHBsaWNhdGlvbiB0byBnbG9iYWxcclxuaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2Ygd2luZG93WydQYWdlRnJlc2hBcHBsaWNhdGlvbiddKSB7XHJcbiAgICB3aW5kb3dbJ1BhZ2VGcmVzaEFwcGxpY2F0aW9uJ10gPSBhcHBsaWNhdGlvbjtcclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBwYWdlRnJlc2hIb21lID0gZnVuY3Rpb24gKHNhbmRib3gpIHtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgX3RoaXMuaGFuZGxlU2VnbWVudDEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRzZWdtZW50ID0gJCgnI21haW5fX3NlZ21lbnRfMScpO1xyXG4gICAgICAgICRzZWdtZW50LmZpbmQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJykubmljZVNjcm9sbCh7XHJcbiAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RoaXMuaGFuZGxlU2VnbWVudDMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRzZWdtZW50ID0gJCgnI21haW5fX3NlZ21lbnRfMycpO1xyXG4gICAgICAgICRzZWdtZW50LmZpbmQoJy5ib2R5ID4ubGlzdCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgLy9jZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAvL3ZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNixcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDUsXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJzxzcGFuIGNsYXNzPVwic2xpY2stcHJldlwiPjwvc3Bhbj4nLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICc8c3BhbiBjbGFzcz1cInNsaWNrLW5leHRcIj48L3NwYW4+JyxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RoaXMuaW5pdCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgX3RoaXMuaGFuZGxlU2VnbWVudDEoKTtcclxuICAgICAgICBfdGhpcy5oYW5kbGVTZWdtZW50MygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkgeyB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBfdGhpcy5pbml0LFxyXG4gICAgICAgIGRlc3Ryb3k6IF90aGlzLmRlc3Ryb3lcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwYWdlRnJlc2hIb21lOyJdfQ==
