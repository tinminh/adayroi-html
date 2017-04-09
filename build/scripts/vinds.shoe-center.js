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

var pageVinDSShoeCenterHome = function(sandbox){
    var _this = this;

    _this.handleZone1 = function(){
        _this.objects.$zone1List.owlCarousel({
            singleItem: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            navigation: true,
            autoPlay: true,
            stopOnHover: true,
//            transitionStyle : "fade",
            navigationText: false,
            autoHeight: true
        });
    }

    _this.handleZone3 = function(){
        _this.objects.$zone3List.owlCarousel({
            autoPlay: false,
            items: 4,
            scrollPerPage: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            navigation: true,
            pagination: false,
            stopOnHover: true,
            navigationText: false
        });
    }

    _this.handleZone4 = function(){
        _this.objects.$zone4List.owlCarousel({
            autoPlay: false,
            items: 2,
            scrollPerPage: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            navigation: false,
            pagination: true,
            stopOnHover: true,
            navigationText: false
        });
    }

    _this.handleZone6 = function(){
        _this.objects.$zone6List.owlCarousel({
            autoPlay: false,
            singleItem: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            navigation: false,
            pagination: true,
            stopOnHover: true,
            navigationText: false
        });
    }

    _this.handleZone7 = function(){
        _this.objects.$zone7List.owlCarousel({
            autoPlay: false,
            items: 6,
            scrollPerPage: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            navigation: true,
            pagination: false,
            stopOnHover: true,
            navigationText: false
        });
    }


    _this.init = function (options) {
        _this.objects = {};

        _this.objects.$zone1 = $('#page_home__segment_zone_1');
        _this.objects.$zone1List = _this.objects.$zone1.find('.body>.list');

        _this.objects.$zone3 = $('#page_home__segment_zone_3');
        _this.objects.$zone3List = _this.objects.$zone3.find('.body>.list');

        _this.objects.$zone4 = $('#page_home__segment_zone_4');
        _this.objects.$zone4List = _this.objects.$zone4.find('.body>.list');

        _this.objects.$zone6 = $('#page_home__segment_zone_6');
        _this.objects.$zone6List = _this.objects.$zone6.find('.body>.list');

        _this.objects.$zone7 = $('#page_home__segment_zone_7');
        _this.objects.$zone7List = _this.objects.$zone7.find('.body>.list');

        _this.handleZone1();
        _this.handleZone3();
        _this.handleZone4();
        _this.handleZone6();
        _this.handleZone7();
    };

    _this.destroy = function(){}

    return ({
        init: _this.init,
        destroy: _this.destroy
    })
};

module.exports = pageVinDSShoeCenterHome;
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

if ($('.page-vinds.page-shoe-center.page-vinds-home').length) {
    VinDSApplication.register('pageHome', require('./pages/vinds.shoe-center.home'));
}

/**
 * start
 */
$(function() {
    VinDSApplication.start();
});
},{"./core/application":1,"./modules/vinds.header":3,"./pages/vinds.shoe-center.home":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9jb3JlL2FwcGxpY2F0aW9uLmpzIiwic291cmNlL3NjcmlwdHMvY29yZS9zYW5kYm94LmpzIiwic291cmNlL3NjcmlwdHMvbW9kdWxlcy92aW5kcy5oZWFkZXIuanMiLCJzb3VyY2Uvc2NyaXB0cy9wYWdlcy92aW5kcy5zaG9lLWNlbnRlci5ob21lLmpzIiwic291cmNlL3NjcmlwdHMvdmluZHMuc2hvZS1jZW50ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBRFJTYW5kYm94ID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NhbmRib3gnKSxcclxuICAgIEFEUkFwcGxpY2F0aW9uID0gbmV3IHNjYWxlQXBwLkNvcmUoQURSU2FuZGJveClcclxuICAgIDtcclxuXHJcbkFEUkFwcGxpY2F0aW9uLnVzZShzY2FsZUFwcC5wbHVnaW5zLmxzKTtcclxuQURSQXBwbGljYXRpb24udXNlKHNjYWxlQXBwLnBsdWdpbnMudXRpbCk7XHJcbkFEUkFwcGxpY2F0aW9uLnVzZShzY2FsZUFwcC5wbHVnaW5zLnN1Ym1vZHVsZSwge1xyXG4gICAgaW5oZXJpdDogdHJ1ZSwgICAgICAgICAgICAgLy8gdXNlIGFsbCBwbHVnaW5zIGZyb20gdGhlIHBhcmVudCdzIENvcmVcclxuICAgIHVzZTogWydscycsJ3N1Ym1vZHVsZScsICd1dGlsJ10sICAgICAgICAvLyB1c2Ugc29tZSBhZGRpdGlvbmFsIHBsdWdpbnNcclxuICAgIHVzZUdsb2JhbE1lZGlhdG9yOiB0cnVlICAgLy8gZW1pdCBhbmQgcmVjZWl2ZSBhbGwgZXZlbnRzIGZyb20gdGhlIHBhcmVudCdzIENvcmVcclxufSk7XHJcblxyXG5BRFJBcHBsaWNhdGlvbi51c2VyQWdlbnQgPSBuZXcgVUFQYXJzZXIoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQURSQXBwbGljYXRpb247IiwidmFyIEFEUlNhbmRib3ggPSBmdW5jdGlvbihjb3JlLCBpbnN0YW5jZUlkLCBvcHRpb25zLCBtb2R1bGVJZCkge1xyXG5cclxuICAgIC8vIGRlZmluZSB5b3VyIEFQSVxyXG4gICAgdGhpcy5uYW1lc3BhY2UgPSBcImFkclwiO1xyXG5cclxuICAgIC8vIGUuZy4gcHJvdmlkZSB0aGUgTWVkaWF0b3IgbWV0aG9kcyAnb24nLCAnZW1pdCcsIGV0Yy5cclxuICAgIGNvcmUuX21lZGlhdG9yLmluc3RhbGxUbyh0aGlzKTtcclxuXHJcbiAgICAvLyAuLi4gb3IgZGVmaW5lIHlvdXIgY3VzdG9tIGNvbW11bmljYXRpb24gbWV0aG9kc1xyXG4gICAgdGhpcy5teUVtaXQgPSBmdW5jdGlvbihjaGFubmVsLCBkYXRhKXtcclxuICAgICAgICBjb3JlLmVtaXQoY2hhbm5lbCArICcvJyArIGluc3RhbmNlSWQsIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBtYXliZSB5b3UnZCBsaWtlIHRvIGV4cG9zZSB0aGUgaW5zdGFuY2UgSURcclxuICAgIHRoaXMuaWQgPSBpbnN0YW5jZUlkO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblxyXG4gICAgLy90ZW1wb3JhcmlseSBwdXQgb24gc2FuZGJveCBmb3IgZWFzZSBhY2Nlc3NcclxuICAgIHRoaXMudXNlckFnZW50ID0gbmV3IFVBUGFyc2VyKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFEUlNhbmRib3g7IiwidmFyIG1vZHVsZVZpbkRTSGVhZGVyID0gZnVuY3Rpb24oc2FuZGJveCl7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIF90aGlzLmhhbmRsZU1lZ2FNZW51ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBfdGhpcy5vYmplY3RzLiRtZWdhTWVudUl0ZW1zLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkKCR0aGlzLmRhdGEoJ3RhcmdldCcpKVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAkdGhpc1xyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVDb250ZW50cy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnUub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBfdGhpcy5vYmplY3RzLiRtZWdhTWVudUl0ZW1zLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVDb250ZW50cy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBfdGhpcy5pbml0ID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cyA9IHt9O1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJG1lZ2FNZW51ID0gJCgnI3NlZ21lbnRfbmF2aWdhdGlvbl9fbWVnYV9tZW51Jyk7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVJdGVtcyA9IF90aGlzLm9iamVjdHMuJG1lZ2FNZW51LmZpbmQoJz4ubGlzdCA+IC5pdGVtJyk7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kbWVnYU1lbnVDb250ZW50cyA9IF90aGlzLm9iamVjdHMuJG1lZ2FNZW51LmZpbmQoJz4gLmNvbnRlbnRzID4gLmNvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgX3RoaXMuaGFuZGxlTWVnYU1lbnUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBfdGhpcy5pbml0LFxyXG4gICAgICAgIGRlc3Ryb3k6IF90aGlzLmRlc3Ryb3lcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVWaW5EU0hlYWRlcjsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgcGFnZVZpbkRTU2hvZUNlbnRlckhvbWUgPSBmdW5jdGlvbihzYW5kYm94KXtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgX3RoaXMuaGFuZGxlWm9uZTEgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmUxTGlzdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIHNpbmdsZUl0ZW06IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlU3BlZWQ6IDMwMCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvblNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9QbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBzdG9wT25Ib3ZlcjogdHJ1ZSxcclxuLy8gICAgICAgICAgICB0cmFuc2l0aW9uU3R5bGUgOiBcImZhZGVcIixcclxuICAgICAgICAgICAgbmF2aWdhdGlvblRleHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RoaXMuaGFuZGxlWm9uZTMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmUzTGlzdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGF1dG9QbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgaXRlbXM6IDQsXHJcbiAgICAgICAgICAgIHNjcm9sbFBlclBhZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlU3BlZWQ6IDMwMCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvblNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICBzdG9wT25Ib3ZlcjogdHJ1ZSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvblRleHQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RoaXMuaGFuZGxlWm9uZTQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmU0TGlzdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGF1dG9QbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgaXRlbXM6IDIsXHJcbiAgICAgICAgICAgIHNjcm9sbFBlclBhZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlU3BlZWQ6IDMwMCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvblNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBzdG9wT25Ib3ZlcjogdHJ1ZSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvblRleHQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3RoaXMuaGFuZGxlWm9uZTYgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmU2TGlzdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGF1dG9QbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgc2luZ2xlSXRlbTogdHJ1ZSxcclxuICAgICAgICAgICAgc2xpZGVTcGVlZDogMzAwLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uU3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIHN0b3BPbkhvdmVyOiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uVGV4dDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfdGhpcy5oYW5kbGVab25lNyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kem9uZTdMaXN0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgYXV0b1BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBpdGVtczogNixcclxuICAgICAgICAgICAgc2Nyb2xsUGVyUGFnZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2xpZGVTcGVlZDogMzAwLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uU3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0b3BPbkhvdmVyOiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uVGV4dDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX3RoaXMuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cyA9IHt9O1xyXG5cclxuICAgICAgICBfdGhpcy5vYmplY3RzLiR6b25lMSA9ICQoJyNwYWdlX2hvbWVfX3NlZ21lbnRfem9uZV8xJyk7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kem9uZTFMaXN0ID0gX3RoaXMub2JqZWN0cy4kem9uZTEuZmluZCgnLmJvZHk+Lmxpc3QnKTtcclxuXHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kem9uZTMgPSAkKCcjcGFnZV9ob21lX19zZWdtZW50X3pvbmVfMycpO1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmUzTGlzdCA9IF90aGlzLm9iamVjdHMuJHpvbmUzLmZpbmQoJy5ib2R5Pi5saXN0Jyk7XHJcblxyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmU0ID0gJCgnI3BhZ2VfaG9tZV9fc2VnbWVudF96b25lXzQnKTtcclxuICAgICAgICBfdGhpcy5vYmplY3RzLiR6b25lNExpc3QgPSBfdGhpcy5vYmplY3RzLiR6b25lNC5maW5kKCcuYm9keT4ubGlzdCcpO1xyXG5cclxuICAgICAgICBfdGhpcy5vYmplY3RzLiR6b25lNiA9ICQoJyNwYWdlX2hvbWVfX3NlZ21lbnRfem9uZV82Jyk7XHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kem9uZTZMaXN0ID0gX3RoaXMub2JqZWN0cy4kem9uZTYuZmluZCgnLmJvZHk+Lmxpc3QnKTtcclxuXHJcbiAgICAgICAgX3RoaXMub2JqZWN0cy4kem9uZTcgPSAkKCcjcGFnZV9ob21lX19zZWdtZW50X3pvbmVfNycpO1xyXG4gICAgICAgIF90aGlzLm9iamVjdHMuJHpvbmU3TGlzdCA9IF90aGlzLm9iamVjdHMuJHpvbmU3LmZpbmQoJy5ib2R5Pi5saXN0Jyk7XHJcblxyXG4gICAgICAgIF90aGlzLmhhbmRsZVpvbmUxKCk7XHJcbiAgICAgICAgX3RoaXMuaGFuZGxlWm9uZTMoKTtcclxuICAgICAgICBfdGhpcy5oYW5kbGVab25lNCgpO1xyXG4gICAgICAgIF90aGlzLmhhbmRsZVpvbmU2KCk7XHJcbiAgICAgICAgX3RoaXMuaGFuZGxlWm9uZTcoKTtcclxuICAgIH07XHJcblxyXG4gICAgX3RoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7fVxyXG5cclxuICAgIHJldHVybiAoe1xyXG4gICAgICAgIGluaXQ6IF90aGlzLmluaXQsXHJcbiAgICAgICAgZGVzdHJveTogX3RoaXMuZGVzdHJveVxyXG4gICAgfSlcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGFnZVZpbkRTU2hvZUNlbnRlckhvbWU7IiwiLyoqXHJcbiAqIFZpbkRTIENvbXBvbmVudHNcclxuICovXHJcblxyXG4vL3RlbXBvcmFyaWx5IGV4cG9zZSBWaW5EU0FwcGxpY2F0aW9uIHRvIGdsb2JhbCBmb3IgZGVidWdnaW5nIHB1cnBvc2Vcclxud2luZG93LlZpbkRTQXBwbGljYXRpb24gPSByZXF1aXJlKCcuL2NvcmUvYXBwbGljYXRpb24nKTtcclxuXHJcbi8qKlxyXG4gKiByZWdpc3RlciBtb2R1bGVcclxuICovXHJcblZpbkRTQXBwbGljYXRpb24ucmVnaXN0ZXIoJ21vZHVsZUhlYWRlcicsIHJlcXVpcmUoJy4vbW9kdWxlcy92aW5kcy5oZWFkZXInKSk7XHJcblxyXG5pZiAoJCgnLnBhZ2UtdmluZHMucGFnZS1zaG9lLWNlbnRlci5wYWdlLXZpbmRzLWhvbWUnKS5sZW5ndGgpIHtcclxuICAgIFZpbkRTQXBwbGljYXRpb24ucmVnaXN0ZXIoJ3BhZ2VIb21lJywgcmVxdWlyZSgnLi9wYWdlcy92aW5kcy5zaG9lLWNlbnRlci5ob21lJykpO1xyXG59XHJcblxyXG4vKipcclxuICogc3RhcnRcclxuICovXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICBWaW5EU0FwcGxpY2F0aW9uLnN0YXJ0KCk7XHJcbn0pOyJdfQ==
