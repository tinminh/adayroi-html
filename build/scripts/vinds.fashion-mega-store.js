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



    _this.init = function(options){
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

var pageVinDSIndexLivingMallHome = function(sandbox){
    var _this = this;

    _this.handleZone1 = function(){
        _this.objects.$zone1List.owlCarousel({
            singleItem: true,
            slideSpeed: 300,
            pagination: false,
            navigation: true,
            autoPlay: true,
            stopOnHover: true,
            navigationText: false,
            autoHeight: false
        });
    }
    
    _this.handleZone6 = function () {
        _this.objects.$zone6List.owlCarousel({
            items: 4,
            scrollPerPage: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            navigation: true,
            pagination: false,
            stopOnHover: true,
            navigationText: false
        });

        _this.objects.$zone6List.on('click', '.owl-item .item', function (event) {
            event.preventDefault();

            var $this = $(this),
                $thumbnailImage = $this.find('.thumbnail img'),
                thumbnailImageSrc = $thumbnailImage.attr('src')
            ;

            bootbox.dialog({
                className: 'modal-image-viewer',
                message: '<img src="' + thumbnailImageSrc + '"/>',
                onEscape: true,
                backdrop: true
            });
        });
    }


    _this.init = function (options) {
         _this.objects = {};

        _this.objects.$zone1 = $('#page_home__segment_zone_1');
        _this.objects.$zone1List = _this.objects.$zone1.find('.body>.list');

        _this.objects.$zone6 = $('#page_home__segment_zone_6');
        _this.objects.$zone6List = _this.objects.$zone6.find('.body>.list');


        _this.handleZone1();
        _this.handleZone6();
    };

    _this.destroy = function(){}

    return ({
        init: _this.init,
        destroy: _this.destroy
    })
};

module.exports = pageVinDSIndexLivingMallHome;
},{}],5:[function(require,module,exports){
/**
 * VinDS Components
 */

//temporarily expose VinDSApplication to global for debugging purpose
window.VinDSApplication = require('./core/application');

/**
 * register module
 */
VinDSApplication.register('moduleHeader', require('./modules/vinds.header'));

if ($('.page-vinds.page-fashion-mega-store.page-vinds-home').length) {
    VinDSApplication.register('pageHome', require('./pages/vinds.fashion-mega-store.home'));
}

/**
 * start
 */
$(function() {
    VinDSApplication.start();
});
},{"./core/application":1,"./modules/vinds.header":3,"./pages/vinds.fashion-mega-store.home":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9jb3JlL2FwcGxpY2F0aW9uLmpzIiwic291cmNlL3NjcmlwdHMvY29yZS9zYW5kYm94LmpzIiwic291cmNlL3NjcmlwdHMvbW9kdWxlcy92aW5kcy5oZWFkZXIuanMiLCJzb3VyY2Uvc2NyaXB0cy9wYWdlcy92aW5kcy5mYXNoaW9uLW1lZ2Etc3RvcmUuaG9tZS5qcyIsInNvdXJjZS9zY3JpcHRzL3ZpbmRzLmZhc2hpb24tbWVnYS1zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQURSU2FuZGJveCA9IHJlcXVpcmUoJy4vLi4vY29yZS9zYW5kYm94JyksXHJcbiAgICBBRFJBcHBsaWNhdGlvbiA9IG5ldyBzY2FsZUFwcC5Db3JlKEFEUlNhbmRib3gpXHJcbiAgICA7XHJcblxyXG5BRFJBcHBsaWNhdGlvbi51c2Uoc2NhbGVBcHAucGx1Z2lucy5scyk7XHJcbkFEUkFwcGxpY2F0aW9uLnVzZShzY2FsZUFwcC5wbHVnaW5zLnV0aWwpO1xyXG5BRFJBcHBsaWNhdGlvbi51c2Uoc2NhbGVBcHAucGx1Z2lucy5zdWJtb2R1bGUsIHtcclxuICAgIGluaGVyaXQ6IHRydWUsICAgICAgICAgICAgIC8vIHVzZSBhbGwgcGx1Z2lucyBmcm9tIHRoZSBwYXJlbnQncyBDb3JlXHJcbiAgICB1c2U6IFsnbHMnLCdzdWJtb2R1bGUnLCAndXRpbCddLCAgICAgICAgLy8gdXNlIHNvbWUgYWRkaXRpb25hbCBwbHVnaW5zXHJcbiAgICB1c2VHbG9iYWxNZWRpYXRvcjogdHJ1ZSAgIC8vIGVtaXQgYW5kIHJlY2VpdmUgYWxsIGV2ZW50cyBmcm9tIHRoZSBwYXJlbnQncyBDb3JlXHJcbn0pO1xyXG5cclxuQURSQXBwbGljYXRpb24udXNlckFnZW50ID0gbmV3IFVBUGFyc2VyKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFEUkFwcGxpY2F0aW9uOyIsInZhciBBRFJTYW5kYm94ID0gZnVuY3Rpb24oY29yZSwgaW5zdGFuY2VJZCwgb3B0aW9ucywgbW9kdWxlSWQpIHtcclxuXHJcbiAgICAvLyBkZWZpbmUgeW91ciBBUElcclxuICAgIHRoaXMubmFtZXNwYWNlID0gXCJhZHJcIjtcclxuXHJcbiAgICAvLyBlLmcuIHByb3ZpZGUgdGhlIE1lZGlhdG9yIG1ldGhvZHMgJ29uJywgJ2VtaXQnLCBldGMuXHJcbiAgICBjb3JlLl9tZWRpYXRvci5pbnN0YWxsVG8odGhpcyk7XHJcblxyXG4gICAgLy8gLi4uIG9yIGRlZmluZSB5b3VyIGN1c3RvbSBjb21tdW5pY2F0aW9uIG1ldGhvZHNcclxuICAgIHRoaXMubXlFbWl0ID0gZnVuY3Rpb24oY2hhbm5lbCwgZGF0YSl7XHJcbiAgICAgICAgY29yZS5lbWl0KGNoYW5uZWwgKyAnLycgKyBpbnN0YW5jZUlkLCBkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gbWF5YmUgeW91J2QgbGlrZSB0byBleHBvc2UgdGhlIGluc3RhbmNlIElEXHJcbiAgICB0aGlzLmlkID0gaW5zdGFuY2VJZDtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgIC8vdGVtcG9yYXJpbHkgcHV0IG9uIHNhbmRib3ggZm9yIGVhc2UgYWNjZXNzXHJcbiAgICB0aGlzLnVzZXJBZ2VudCA9IG5ldyBVQVBhcnNlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBRFJTYW5kYm94OyIsInZhciBtb2R1bGVWaW5EU0hlYWRlciA9IGZ1bmN0aW9uKHNhbmRib3gpe1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICBfdGhpcy5oYW5kbGVNZWdhTWVudSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVJdGVtcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJCgkdGhpcy5kYXRhKCd0YXJnZXQnKSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgJHRoaXNcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLmFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51Q29udGVudHMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51Lm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVJdGVtcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51Q29udGVudHMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX3RoaXMuaW5pdCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMgPSB7fTtcclxuICAgICAgICBfdGhpcy5vYmplY3RzLiRtZWdhTWVudSA9ICQoJyNzZWdtZW50X25hdmlnYXRpb25fX21lZ2FfbWVudScpO1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51SXRlbXMgPSBfdGhpcy5vYmplY3RzLiRtZWdhTWVudS5maW5kKCc+Lmxpc3QgPiAuaXRlbScpO1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51Q29udGVudHMgPSBfdGhpcy5vYmplY3RzLiRtZWdhTWVudS5maW5kKCc+IC5jb250ZW50cyA+IC5jb250ZW50Jyk7XHJcblxyXG4gICAgICAgIF90aGlzLmhhbmRsZU1lZ2FNZW51KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogX3RoaXMuaW5pdCxcclxuICAgICAgICBkZXN0cm95OiBfdGhpcy5kZXN0cm95XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlVmluRFNIZWFkZXI7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHBhZ2VWaW5EU0luZGV4TGl2aW5nTWFsbEhvbWUgPSBmdW5jdGlvbihzYW5kYm94KXtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgX3RoaXMuaGFuZGxlWm9uZTEgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmUxTGlzdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIHNpbmdsZUl0ZW06IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlU3BlZWQ6IDMwMCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9QbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBzdG9wT25Ib3ZlcjogdHJ1ZSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvblRleHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfdGhpcy5oYW5kbGVab25lNiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfdGhpcy5vYmplY3RzLiR6b25lNkxpc3Qub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICBpdGVtczogNCxcclxuICAgICAgICAgICAgc2Nyb2xsUGVyUGFnZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2xpZGVTcGVlZDogMzAwLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uU3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0b3BPbkhvdmVyOiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uVGV4dDogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kem9uZTZMaXN0Lm9uKCdjbGljaycsICcub3dsLWl0ZW0gLml0ZW0nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAkdGh1bWJuYWlsSW1hZ2UgPSAkdGhpcy5maW5kKCcudGh1bWJuYWlsIGltZycpLFxyXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1hZ2VTcmMgPSAkdGh1bWJuYWlsSW1hZ2UuYXR0cignc3JjJylcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgYm9vdGJveC5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnbW9kYWwtaW1hZ2Utdmlld2VyJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICc8aW1nIHNyYz1cIicgKyB0aHVtYm5haWxJbWFnZVNyYyArICdcIi8+JyxcclxuICAgICAgICAgICAgICAgIG9uRXNjYXBlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYmFja2Ryb3A6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF90aGlzLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICBfdGhpcy5vYmplY3RzID0ge307XHJcblxyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmUxID0gJCgnI3BhZ2VfaG9tZV9fc2VnbWVudF96b25lXzEnKTtcclxuICAgICAgICBfdGhpcy5vYmplY3RzLiR6b25lMUxpc3QgPSBfdGhpcy5vYmplY3RzLiR6b25lMS5maW5kKCcuYm9keT4ubGlzdCcpO1xyXG5cclxuICAgICAgICBfdGhpcy5vYmplY3RzLiR6b25lNiA9ICQoJyNwYWdlX2hvbWVfX3NlZ21lbnRfem9uZV82Jyk7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kem9uZTZMaXN0ID0gX3RoaXMub2JqZWN0cy4kem9uZTYuZmluZCgnLmJvZHk+Lmxpc3QnKTtcclxuXHJcblxyXG4gICAgICAgIF90aGlzLmhhbmRsZVpvbmUxKCk7XHJcbiAgICAgICAgX3RoaXMuaGFuZGxlWm9uZTYoKTtcclxuICAgIH07XHJcblxyXG4gICAgX3RoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7fVxyXG5cclxuICAgIHJldHVybiAoe1xyXG4gICAgICAgIGluaXQ6IF90aGlzLmluaXQsXHJcbiAgICAgICAgZGVzdHJveTogX3RoaXMuZGVzdHJveVxyXG4gICAgfSlcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGFnZVZpbkRTSW5kZXhMaXZpbmdNYWxsSG9tZTsiLCIvKipcclxuICogVmluRFMgQ29tcG9uZW50c1xyXG4gKi9cclxuXHJcbi8vdGVtcG9yYXJpbHkgZXhwb3NlIFZpbkRTQXBwbGljYXRpb24gdG8gZ2xvYmFsIGZvciBkZWJ1Z2dpbmcgcHVycG9zZVxyXG53aW5kb3cuVmluRFNBcHBsaWNhdGlvbiA9IHJlcXVpcmUoJy4vY29yZS9hcHBsaWNhdGlvbicpO1xyXG5cclxuLyoqXHJcbiAqIHJlZ2lzdGVyIG1vZHVsZVxyXG4gKi9cclxuVmluRFNBcHBsaWNhdGlvbi5yZWdpc3RlcignbW9kdWxlSGVhZGVyJywgcmVxdWlyZSgnLi9tb2R1bGVzL3ZpbmRzLmhlYWRlcicpKTtcclxuXHJcbmlmICgkKCcucGFnZS12aW5kcy5wYWdlLWZhc2hpb24tbWVnYS1zdG9yZS5wYWdlLXZpbmRzLWhvbWUnKS5sZW5ndGgpIHtcclxuICAgIFZpbkRTQXBwbGljYXRpb24ucmVnaXN0ZXIoJ3BhZ2VIb21lJywgcmVxdWlyZSgnLi9wYWdlcy92aW5kcy5mYXNoaW9uLW1lZ2Etc3RvcmUuaG9tZScpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHN0YXJ0XHJcbiAqL1xyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgVmluRFNBcHBsaWNhdGlvbi5zdGFydCgpO1xyXG59KTsiXX0=
