(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function () {
    var provinceId = -1;
    var districtId = -1;
    ADRApplication.on("user/setLocation", function (data) {
        provinceId = (typeof (data.provinceId) != "undefined" && data.provinceId != null) ? data.provinceId : -1;
        districtId = (typeof (data.districtId) != "undefined" && data.districtId != null) ? data.districtId : -1;
    });
    $(document).ready(function () {
        $(document).on('change', '[name="card_item"]', function () {
            $('.mobile-charge__quantity .dropdown-menu').empty();
            var quantity = $(this).closest('.btn').attr('data-quantity');
            $('[name="card_quantity"]').attr('type', 'hidden').val(1);
            $('.mobile-charge__quantity .btn-group').show().find('button span').html('1 <i class="caret"></i>');
            if (quantity <= 10) {
                for (var i = 1; i <= quantity; i++) {
                    $('<li><a>' + i + '</a></li>').appendTo('.mobile-charge__quantity .dropdown-menu');
                }
            }
            else {
                for (var i = 1; i <= 10; i++) {
                    $('<li><a>' +i + '</a></li>').appendTo('.mobile-charge__quantity .dropdown-menu');
                }
                //$('<li class="divider"></li>').appendTo('.mobile-charge__quantity .dropdown-menu');
                //$('<li><a class="more">10+</a></li>').appendTo('.mobile-charge__quantity .dropdown-menu')
                //    .find('a')
                //    .on('click', function (e) {
                //        e.preventDefault();
                //        $('[name="card_quantity"]').attr('type', 'text').val(1).focus();
                //        $('.mobile-charge__quantity .btn-group').hide();
                //        return false;
                //    });
            }
            caculateCardPrice();
        });

        $(document).on('click', '.mobile-charge__quantity .dropdown-menu a', function (e) {
            e.preventDefault();
            var quantity = parseInt($(this).text());
            $('[name="card_quantity"]').val(quantity);
            $('.mobile-charge__quantity button span').html(quantity + ' <i class="caret"></i>');
            caculateCardPrice();
        });

        $(document).on('change', '[name="card_quantity"]', function () {
            caculateCardPrice();
        });

        $(document).on('change', '[name="topup_item"]', function () {
            caculateTopupPrice();
        });

        $(document).on('change', '[name="card_product"]', function () {
            var strPoductId = $(this).closest('.btn').attr('data-product');
            $('#mobile-card-items').empty();
            $('#card-total').text('0đ');
            loading('show');

            var options = {
                url: '/TopUp/GetItemsPriceCard',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                isStringify: true,
                callback: function (data) {
                    loading('hide');
                    var response = data.response;
                    if (response && response.status == 1 && response.data && response.data.Success == true) {
                        if (response.data.ProductCardItems.length > 0) {
                            $('#card-items-error').empty();
                            $('.mobile-charge__quantity').show();
                            $('#card-submit').prop('disabled', false);
                            $.each(response.data.ProductCardItems, function (k, item) {
                                $('<div class="btn-group">\
                                    <label class="btn" data-product-type="' + item.ProductType + '" data-price="' + item.PriceSell + '" data-quantity="' + item.Quantity + '">\
                                        <input type="radio" autocomplete="off" name="card_item">\
                                        <div class="border"><span>' + (new Number(item.OriginalPrice)).format() + 'đ</span></div>\
                                    </label>\
                                </div>').appendTo('#mobile-card-items')
                                .data('product', item);
                            });
                            $('#mobile-card-items').find('.btn-group:first-child .btn').trigger('click');
                        } else {
                            $('#card-items-error').text('Sản phẩm đang tạm hết, vui lòng quay lại sau.');
                            $('.mobile-charge__quantity').hide();
                            $('#card-total').text('0đ');
                            $('#card-submit').prop('disabled', true);
                        }
                    }
                    else {
                        $('#card-items-error').text('Kết nối bị quá tải, vui lòng tải lại trang.');
                        $('.mobile-charge__quantity').hide();
                        $('#card-total').text('0đ');
                        $('#card-submit').prop('disabled', true);
                    }
                }
            };

            var data = {
                strPoductId: strPoductId
            };

            ADRApplication.emit("ajax/request", {
                options: options,
                data: JSON.stringify(data)
            });
        });

        $(document).on('keyup', '[name="topup_phone"]', function () {
            $('#topup-total').text('0đ');
            var strPhoneNumber = $.trim($(this).val());
            if (!strPhoneNumber) {
                $('#mobile-topup-items').addClass('items-disabled').find('.active').removeClass('active');
                $('#topup-phone-error').text('Vui lòng nhập số điện thoại cần nạp tiền').show();
                $('#topup-submit').prop('disabled', true);
                return;
            }
            if (!/^(096|097|098|0162|0163|0164|0165|0166|0167|0168|0169|086|092|0186|0188|099|0199|091|094|0123|0124|0125|0127|0129|088|090|093|0120|0121|0122|0126|0128|089)([0-9]{7})$/.test(strPhoneNumber)) {
                $('#mobile-topup-items').addClass('items-disabled').find('.active').removeClass('active');
                $('#topup-phone-error').text('Số điện thoại không đúng định dạng').show();
                $('#topup-submit').prop('disabled', true);
                return;
            }
            $('#topup-phone-error').hide();
            $('#topup-submit').prop('disabled', false);
            loading('show');

            var options = {
                url: '/TopUp/GetItemsPriceTopup',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                isStringify: true,
                callback: function (data) {
                    loading('hide');
                    var response = data.response;
                    if (response && response.status == 1 && response.data && response.data.Success == true) {
                        if (response.data.ProductCardItems.length > 0) {
                            $('#topup-items-error').empty();
                            $('#mobile-topup-items').removeClass('items-disabled').empty();
                            $('#topup-submit').prop('disabled', false);
                            $.each(response.data.ProductCardItems, function (k, item) {
                                $('<div class="btn-group">\
                                    <label class="btn" data-product-type="' + item.ProductType + '" data-price="' + item.PriceSell + '">\
                                        <input type="radio" autocomplete="off" name="topup_item">\
                                        <div class="border"><span>' + (new Number(item.OriginalPrice)).format() + 'đ</span></div>\
                                    </label>\
                                </div>').appendTo('#mobile-topup-items')
                                .data('product', item);
                            });
                            $('#mobile-topup-items').find('.btn-group:first-child .btn').trigger('click');
                        }
                        else {
                            $('#topup-items-error').text('Sản phẩm đang tạm hết, vui lòng quay lại sau.');
                            $('#topup-total').text('0đ');
                            $('#topup-submit').prop('disabled', true);
                        }
                    }
                    else {
                        $('#topup-items-error').text('Kết nối bị quá tải, vui lòng tải lại trang.');
                        $('#topup-total').text('0đ');
                        $('#topup-submit').prop('disabled', true);
                    }
                }
            };

            var data = {
                strPhoneNumber: strPhoneNumber
            };

            ADRApplication.emit("ajax/request", {
                options: options,
                data: JSON.stringify(data)
            });
        });

        $(document).on('click', '#card-submit', function () {
            var product = $('[name="card_item"]:checked').closest('.btn-group').data('product');            
            product.CartSubType = 5;
            product.ReturnUrl = location.hash ? location.href.replace(location.hash, '#mobile-charge__card') : location.href + '#mobile-charge__card';
            var quantity = $('[name="card_quantity"]').val();
            checkout(product, quantity);
        });

        $(document).on('click', '#topup-submit', function () {
            var product = $('[name="topup_item"]:checked').closest('.btn-group').data('product');
            product.TopupNumber = $('[name="topup_phone"]').val();
            product.CartSubType = 6;
            product.ReturnUrl = location.hash ? location.href.replace(location.hash, '#mobile-charge__topup') : location.href + '#mobile-charge__topup';
            var quantity = 1;
            checkout(product, quantity);
        });

        $('[name="card_product"]').first().closest('.btn').trigger('click');
        $('#mobile-card-items').find('.btn-group:first-child .btn').trigger('click');
        $('a[href="#mobile-charge__topup"]').on('shown.bs.tab', function (e) {
            $('[name="topup_phone"]').focus();
        });
        if (window.location.hash == '#mobile-charge__topup') {
            $('[href="#mobile-charge__topup"]').tab('show');
        }
    });

    function caculateCardPrice() {
        var price = $('[name="card_item"]:checked').closest('.btn').attr('data-price');
        var quantity = $('[name="card_quantity"]').val();
        var total = parseInt(price) * parseInt(quantity);
        $('#card-total').text((new Number(total)).format() + 'đ');
    }

    function caculateTopupPrice() {
        var price = $('[name="topup_item"]:checked').closest('.btn').attr('data-price');
        $('#topup-total').text((new Number(price)).format() + 'đ');
    }

    function checkout(product, quantity) {
        loading('show');
        checkSSO(function (userId) {
            var options = {
                url: '/Cart/CheckOutTopUp',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                isStringify: true,
                callback: function (data) {
                    loading('hide');
                    var response = data.response;
                    if (response.Status === 1) {
                        location.href = response.Data;
                    }
                    else {
                        if (response.Message) {
                            common.pushNotify(response.Message);
                        }
                        else {
                            common.pushNotify("Sản phẩm hiện đã hết hàng, vui lòng chọn sản phẩm khác");
                        };
                    };
                }
            };

            var data = {
                objRequest: {
                    ProductItemId: product.ProductItemId,
                    MerchantId: product.MerchantId,
                    WarehouseId: product.WarehouseId,
                    UserId: userId,                    
                    QuantityBuy: quantity,                                        
                    PriceSell: product.PriceSell,
                    ProvinceId: provinceId,
                    DistrictId: districtId,
                    StrProduct: product.StrProduct,
                    StrProductItem: product.StrProductItem,
                    StrWarehouse: product.StrWarehouse,                    
                    ProductType: product.ProductType,                  
                    CartSubType: product.CartSubType,
                    ReturnUrl: product.ReturnUrl,
                    TopupNumber: product.TopupNumber
                },
                time: Date.now()
            };

            ADRApplication.emit("ajax/request", {
                options: options,
                data: JSON.stringify(data)
            });
        });
    }

    function checkSSO(callback) {
        ADRApplication.emit('user/checkSSO', {
            successCallback: function (checkSSOResponse) {
                var userId = checkSSOResponse.userId;
                callback(userId);
            },
            failCallback: function () {
                callback(0);
            }
        });
    }

    function loading(toggle) {
        if (toggle == 'hide') {
            $('.mobile-charge__loading').hide();
        }
        else {
            $('.mobile-charge__loading').show();
        }
    }
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9tb2JpbGUtY2hhcmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcHJvdmluY2VJZCA9IC0xO1xyXG4gICAgdmFyIGRpc3RyaWN0SWQgPSAtMTtcclxuICAgIEFEUkFwcGxpY2F0aW9uLm9uKFwidXNlci9zZXRMb2NhdGlvblwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHByb3ZpbmNlSWQgPSAodHlwZW9mIChkYXRhLnByb3ZpbmNlSWQpICE9IFwidW5kZWZpbmVkXCIgJiYgZGF0YS5wcm92aW5jZUlkICE9IG51bGwpID8gZGF0YS5wcm92aW5jZUlkIDogLTE7XHJcbiAgICAgICAgZGlzdHJpY3RJZCA9ICh0eXBlb2YgKGRhdGEuZGlzdHJpY3RJZCkgIT0gXCJ1bmRlZmluZWRcIiAmJiBkYXRhLmRpc3RyaWN0SWQgIT0gbnVsbCkgPyBkYXRhLmRpc3RyaWN0SWQgOiAtMTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnW25hbWU9XCJjYXJkX2l0ZW1cIl0nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5tb2JpbGUtY2hhcmdlX19xdWFudGl0eSAuZHJvcGRvd24tbWVudScpLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIHZhciBxdWFudGl0eSA9ICQodGhpcykuY2xvc2VzdCgnLmJ0bicpLmF0dHIoJ2RhdGEtcXVhbnRpdHknKTtcclxuICAgICAgICAgICAgJCgnW25hbWU9XCJjYXJkX3F1YW50aXR5XCJdJykuYXR0cigndHlwZScsICdoaWRkZW4nKS52YWwoMSk7XHJcbiAgICAgICAgICAgICQoJy5tb2JpbGUtY2hhcmdlX19xdWFudGl0eSAuYnRuLWdyb3VwJykuc2hvdygpLmZpbmQoJ2J1dHRvbiBzcGFuJykuaHRtbCgnMSA8aSBjbGFzcz1cImNhcmV0XCI+PC9pPicpO1xyXG4gICAgICAgICAgICBpZiAocXVhbnRpdHkgPD0gMTApIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHF1YW50aXR5OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCc8bGk+PGE+JyArIGkgKyAnPC9hPjwvbGk+JykuYXBwZW5kVG8oJy5tb2JpbGUtY2hhcmdlX19xdWFudGl0eSAuZHJvcGRvd24tbWVudScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJzxsaT48YT4nICtpICsgJzwvYT48L2xpPicpLmFwcGVuZFRvKCcubW9iaWxlLWNoYXJnZV9fcXVhbnRpdHkgLmRyb3Bkb3duLW1lbnUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vJCgnPGxpIGNsYXNzPVwiZGl2aWRlclwiPjwvbGk+JykuYXBwZW5kVG8oJy5tb2JpbGUtY2hhcmdlX19xdWFudGl0eSAuZHJvcGRvd24tbWVudScpO1xyXG4gICAgICAgICAgICAgICAgLy8kKCc8bGk+PGEgY2xhc3M9XCJtb3JlXCI+MTArPC9hPjwvbGk+JykuYXBwZW5kVG8oJy5tb2JpbGUtY2hhcmdlX19xdWFudGl0eSAuZHJvcGRvd24tbWVudScpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAuZmluZCgnYScpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgJCgnW25hbWU9XCJjYXJkX3F1YW50aXR5XCJdJykuYXR0cigndHlwZScsICd0ZXh0JykudmFsKDEpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgJCgnLm1vYmlsZS1jaGFyZ2VfX3F1YW50aXR5IC5idG4tZ3JvdXAnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FjdWxhdGVDYXJkUHJpY2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5tb2JpbGUtY2hhcmdlX19xdWFudGl0eSAuZHJvcGRvd24tbWVudSBhJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgcXVhbnRpdHkgPSBwYXJzZUludCgkKHRoaXMpLnRleHQoKSk7XHJcbiAgICAgICAgICAgICQoJ1tuYW1lPVwiY2FyZF9xdWFudGl0eVwiXScpLnZhbChxdWFudGl0eSk7XHJcbiAgICAgICAgICAgICQoJy5tb2JpbGUtY2hhcmdlX19xdWFudGl0eSBidXR0b24gc3BhbicpLmh0bWwocXVhbnRpdHkgKyAnIDxpIGNsYXNzPVwiY2FyZXRcIj48L2k+Jyk7XHJcbiAgICAgICAgICAgIGNhY3VsYXRlQ2FyZFByaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnW25hbWU9XCJjYXJkX3F1YW50aXR5XCJdJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYWN1bGF0ZUNhcmRQcmljZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJ1tuYW1lPVwidG9wdXBfaXRlbVwiXScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2FjdWxhdGVUb3B1cFByaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnW25hbWU9XCJjYXJkX3Byb2R1Y3RcIl0nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJQb2R1Y3RJZCA9ICQodGhpcykuY2xvc2VzdCgnLmJ0bicpLmF0dHIoJ2RhdGEtcHJvZHVjdCcpO1xyXG4gICAgICAgICAgICAkKCcjbW9iaWxlLWNhcmQtaXRlbXMnKS5lbXB0eSgpO1xyXG4gICAgICAgICAgICAkKCcjY2FyZC10b3RhbCcpLnRleHQoJzDEkScpO1xyXG4gICAgICAgICAgICBsb2FkaW5nKCdzaG93Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9Ub3BVcC9HZXRJdGVtc1ByaWNlQ2FyZCcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIGlzU3RyaW5naWZ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZygnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IGRhdGEucmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PSAxICYmIHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5TdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuUHJvZHVjdENhcmRJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FyZC1pdGVtcy1lcnJvcicpLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcubW9iaWxlLWNoYXJnZV9fcXVhbnRpdHknKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FyZC1zdWJtaXQnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5kYXRhLlByb2R1Y3RDYXJkSXRlbXMsIGZ1bmN0aW9uIChrLCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImJ0blwiIGRhdGEtcHJvZHVjdC10eXBlPVwiJyArIGl0ZW0uUHJvZHVjdFR5cGUgKyAnXCIgZGF0YS1wcmljZT1cIicgKyBpdGVtLlByaWNlU2VsbCArICdcIiBkYXRhLXF1YW50aXR5PVwiJyArIGl0ZW0uUXVhbnRpdHkgKyAnXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBhdXRvY29tcGxldGU9XCJvZmZcIiBuYW1lPVwiY2FyZF9pdGVtXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3JkZXJcIj48c3Bhbj4nICsgKG5ldyBOdW1iZXIoaXRlbS5PcmlnaW5hbFByaWNlKSkuZm9ybWF0KCkgKyAnxJE8L3NwYW4+PC9kaXY+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PicpLmFwcGVuZFRvKCcjbW9iaWxlLWNhcmQtaXRlbXMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdwcm9kdWN0JywgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtb2JpbGUtY2FyZC1pdGVtcycpLmZpbmQoJy5idG4tZ3JvdXA6Zmlyc3QtY2hpbGQgLmJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FyZC1pdGVtcy1lcnJvcicpLnRleHQoJ1PhuqNuIHBo4bqpbSDEkWFuZyB04bqhbSBo4bq/dCwgdnVpIGzDsm5nIHF1YXkgbOG6oWkgc2F1LicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLm1vYmlsZS1jaGFyZ2VfX3F1YW50aXR5JykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhcmQtdG90YWwnKS50ZXh0KCcwxJEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYXJkLXN1Ym1pdCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYXJkLWl0ZW1zLWVycm9yJykudGV4dCgnS+G6v3QgbuG7kWkgYuG7iyBxdcOhIHThuqNpLCB2dWkgbMOybmcgdOG6o2kgbOG6oWkgdHJhbmcuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2JpbGUtY2hhcmdlX19xdWFudGl0eScpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhcmQtdG90YWwnKS50ZXh0KCcwxJEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhcmQtc3VibWl0JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHN0clBvZHVjdElkOiBzdHJQb2R1Y3RJZFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgQURSQXBwbGljYXRpb24uZW1pdChcImFqYXgvcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsICdbbmFtZT1cInRvcHVwX3Bob25lXCJdJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcjdG9wdXAtdG90YWwnKS50ZXh0KCcwxJEnKTtcclxuICAgICAgICAgICAgdmFyIHN0clBob25lTnVtYmVyID0gJC50cmltKCQodGhpcykudmFsKCkpO1xyXG4gICAgICAgICAgICBpZiAoIXN0clBob25lTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjbW9iaWxlLXRvcHVwLWl0ZW1zJykuYWRkQ2xhc3MoJ2l0ZW1zLWRpc2FibGVkJykuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJyN0b3B1cC1waG9uZS1lcnJvcicpLnRleHQoJ1Z1aSBsw7JuZyBuaOG6rXAgc+G7kSDEkWnhu4duIHRob+G6oWkgY+G6p24gbuG6oXAgdGnhu4FuJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3RvcHVwLXN1Ym1pdCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEvXigwOTZ8MDk3fDA5OHwwMTYyfDAxNjN8MDE2NHwwMTY1fDAxNjZ8MDE2N3wwMTY4fDAxNjl8MDg2fDA5MnwwMTg2fDAxODh8MDk5fDAxOTl8MDkxfDA5NHwwMTIzfDAxMjR8MDEyNXwwMTI3fDAxMjl8MDg4fDA5MHwwOTN8MDEyMHwwMTIxfDAxMjJ8MDEyNnwwMTI4fDA4OSkoWzAtOV17N30pJC8udGVzdChzdHJQaG9uZU51bWJlcikpIHtcclxuICAgICAgICAgICAgICAgICQoJyNtb2JpbGUtdG9wdXAtaXRlbXMnKS5hZGRDbGFzcygnaXRlbXMtZGlzYWJsZWQnKS5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3RvcHVwLXBob25lLWVycm9yJykudGV4dCgnU+G7kSDEkWnhu4duIHRob+G6oWkga2jDtG5nIMSRw7puZyDEkeG7i25oIGThuqFuZycpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoJyN0b3B1cC1zdWJtaXQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyN0b3B1cC1waG9uZS1lcnJvcicpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCgnI3RvcHVwLXN1Ym1pdCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBsb2FkaW5nKCdzaG93Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9Ub3BVcC9HZXRJdGVtc1ByaWNlVG9wdXAnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBpc1N0cmluZ2lmeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmcoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBkYXRhLnJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT0gMSAmJiByZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEuU3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLlByb2R1Y3RDYXJkSXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RvcHVwLWl0ZW1zLWVycm9yJykuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtb2JpbGUtdG9wdXAtaXRlbXMnKS5yZW1vdmVDbGFzcygnaXRlbXMtZGlzYWJsZWQnKS5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RvcHVwLXN1Ym1pdCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmRhdGEuUHJvZHVjdENhcmRJdGVtcywgZnVuY3Rpb24gKGssIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYnRuXCIgZGF0YS1wcm9kdWN0LXR5cGU9XCInICsgaXRlbS5Qcm9kdWN0VHlwZSArICdcIiBkYXRhLXByaWNlPVwiJyArIGl0ZW0uUHJpY2VTZWxsICsgJ1wiPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgbmFtZT1cInRvcHVwX2l0ZW1cIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvcmRlclwiPjxzcGFuPicgKyAobmV3IE51bWJlcihpdGVtLk9yaWdpbmFsUHJpY2UpKS5mb3JtYXQoKSArICfEkTwvc3Bhbj48L2Rpdj5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+JykuYXBwZW5kVG8oJyNtb2JpbGUtdG9wdXAtaXRlbXMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdwcm9kdWN0JywgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtb2JpbGUtdG9wdXAtaXRlbXMnKS5maW5kKCcuYnRuLWdyb3VwOmZpcnN0LWNoaWxkIC5idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RvcHVwLWl0ZW1zLWVycm9yJykudGV4dCgnU+G6o24gcGjhuqltIMSRYW5nIHThuqFtIGjhur90LCB2dWkgbMOybmcgcXVheSBs4bqhaSBzYXUuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjdG9wdXAtdG90YWwnKS50ZXh0KCcwxJEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0b3B1cC1zdWJtaXQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdG9wdXAtaXRlbXMtZXJyb3InKS50ZXh0KCdL4bq/dCBu4buRaSBi4buLIHF1w6EgdOG6o2ksIHZ1aSBsw7JuZyB04bqjaSBs4bqhaSB0cmFuZy4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RvcHVwLXRvdGFsJykudGV4dCgnMMSRJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN0b3B1cC1zdWJtaXQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgc3RyUGhvbmVOdW1iZXI6IHN0clBob25lTnVtYmVyXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBBRFJBcHBsaWNhdGlvbi5lbWl0KFwiYWpheC9yZXF1ZXN0XCIsIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNjYXJkLXN1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHByb2R1Y3QgPSAkKCdbbmFtZT1cImNhcmRfaXRlbVwiXTpjaGVja2VkJykuY2xvc2VzdCgnLmJ0bi1ncm91cCcpLmRhdGEoJ3Byb2R1Y3QnKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcHJvZHVjdC5DYXJ0U3ViVHlwZSA9IDU7XHJcbiAgICAgICAgICAgIHByb2R1Y3QuUmV0dXJuVXJsID0gbG9jYXRpb24uaGFzaCA/IGxvY2F0aW9uLmhyZWYucmVwbGFjZShsb2NhdGlvbi5oYXNoLCAnI21vYmlsZS1jaGFyZ2VfX2NhcmQnKSA6IGxvY2F0aW9uLmhyZWYgKyAnI21vYmlsZS1jaGFyZ2VfX2NhcmQnO1xyXG4gICAgICAgICAgICB2YXIgcXVhbnRpdHkgPSAkKCdbbmFtZT1cImNhcmRfcXVhbnRpdHlcIl0nKS52YWwoKTtcclxuICAgICAgICAgICAgY2hlY2tvdXQocHJvZHVjdCwgcXVhbnRpdHkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RvcHVwLXN1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHByb2R1Y3QgPSAkKCdbbmFtZT1cInRvcHVwX2l0ZW1cIl06Y2hlY2tlZCcpLmNsb3Nlc3QoJy5idG4tZ3JvdXAnKS5kYXRhKCdwcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgIHByb2R1Y3QuVG9wdXBOdW1iZXIgPSAkKCdbbmFtZT1cInRvcHVwX3Bob25lXCJdJykudmFsKCk7XHJcbiAgICAgICAgICAgIHByb2R1Y3QuQ2FydFN1YlR5cGUgPSA2O1xyXG4gICAgICAgICAgICBwcm9kdWN0LlJldHVyblVybCA9IGxvY2F0aW9uLmhhc2ggPyBsb2NhdGlvbi5ocmVmLnJlcGxhY2UobG9jYXRpb24uaGFzaCwgJyNtb2JpbGUtY2hhcmdlX190b3B1cCcpIDogbG9jYXRpb24uaHJlZiArICcjbW9iaWxlLWNoYXJnZV9fdG9wdXAnO1xyXG4gICAgICAgICAgICB2YXIgcXVhbnRpdHkgPSAxO1xyXG4gICAgICAgICAgICBjaGVja291dChwcm9kdWN0LCBxdWFudGl0eSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJ1tuYW1lPVwiY2FyZF9wcm9kdWN0XCJdJykuZmlyc3QoKS5jbG9zZXN0KCcuYnRuJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAkKCcjbW9iaWxlLWNhcmQtaXRlbXMnKS5maW5kKCcuYnRuLWdyb3VwOmZpcnN0LWNoaWxkIC5idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICQoJ2FbaHJlZj1cIiNtb2JpbGUtY2hhcmdlX190b3B1cFwiXScpLm9uKCdzaG93bi5icy50YWInLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKCdbbmFtZT1cInRvcHVwX3Bob25lXCJdJykuZm9jdXMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggPT0gJyNtb2JpbGUtY2hhcmdlX190b3B1cCcpIHtcclxuICAgICAgICAgICAgJCgnW2hyZWY9XCIjbW9iaWxlLWNoYXJnZV9fdG9wdXBcIl0nKS50YWIoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYWN1bGF0ZUNhcmRQcmljZSgpIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSAkKCdbbmFtZT1cImNhcmRfaXRlbVwiXTpjaGVja2VkJykuY2xvc2VzdCgnLmJ0bicpLmF0dHIoJ2RhdGEtcHJpY2UnKTtcclxuICAgICAgICB2YXIgcXVhbnRpdHkgPSAkKCdbbmFtZT1cImNhcmRfcXVhbnRpdHlcIl0nKS52YWwoKTtcclxuICAgICAgICB2YXIgdG90YWwgPSBwYXJzZUludChwcmljZSkgKiBwYXJzZUludChxdWFudGl0eSk7XHJcbiAgICAgICAgJCgnI2NhcmQtdG90YWwnKS50ZXh0KChuZXcgTnVtYmVyKHRvdGFsKSkuZm9ybWF0KCkgKyAnxJEnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYWN1bGF0ZVRvcHVwUHJpY2UoKSB7XHJcbiAgICAgICAgdmFyIHByaWNlID0gJCgnW25hbWU9XCJ0b3B1cF9pdGVtXCJdOmNoZWNrZWQnKS5jbG9zZXN0KCcuYnRuJykuYXR0cignZGF0YS1wcmljZScpO1xyXG4gICAgICAgICQoJyN0b3B1cC10b3RhbCcpLnRleHQoKG5ldyBOdW1iZXIocHJpY2UpKS5mb3JtYXQoKSArICfEkScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrb3V0KHByb2R1Y3QsIHF1YW50aXR5KSB7XHJcbiAgICAgICAgbG9hZGluZygnc2hvdycpO1xyXG4gICAgICAgIGNoZWNrU1NPKGZ1bmN0aW9uICh1c2VySWQpIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvQ2FydC9DaGVja091dFRvcFVwJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgaXNTdHJpbmdpZnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gZGF0YS5yZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuU3RhdHVzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLk1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbi5wdXNoTm90aWZ5KHJlc3BvbnNlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbW9uLnB1c2hOb3RpZnkoXCJT4bqjbiBwaOG6qW0gaGnhu4duIMSRw6MgaOG6v3QgaMOgbmcsIHZ1aSBsw7JuZyBjaOG7jW4gc+G6o24gcGjhuqltIGtow6FjXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIG9ialJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBQcm9kdWN0SXRlbUlkOiBwcm9kdWN0LlByb2R1Y3RJdGVtSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgTWVyY2hhbnRJZDogcHJvZHVjdC5NZXJjaGFudElkLFxyXG4gICAgICAgICAgICAgICAgICAgIFdhcmVob3VzZUlkOiBwcm9kdWN0LldhcmVob3VzZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIFVzZXJJZDogdXNlcklkLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgUXVhbnRpdHlCdXk6IHF1YW50aXR5LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBQcmljZVNlbGw6IHByb2R1Y3QuUHJpY2VTZWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFByb3ZpbmNlSWQ6IHByb3ZpbmNlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgRGlzdHJpY3RJZDogZGlzdHJpY3RJZCxcclxuICAgICAgICAgICAgICAgICAgICBTdHJQcm9kdWN0OiBwcm9kdWN0LlN0clByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICAgICAgU3RyUHJvZHVjdEl0ZW06IHByb2R1Y3QuU3RyUHJvZHVjdEl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgU3RyV2FyZWhvdXNlOiBwcm9kdWN0LlN0cldhcmVob3VzZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFByb2R1Y3RUeXBlOiBwcm9kdWN0LlByb2R1Y3RUeXBlLCAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIENhcnRTdWJUeXBlOiBwcm9kdWN0LkNhcnRTdWJUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIFJldHVyblVybDogcHJvZHVjdC5SZXR1cm5VcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgVG9wdXBOdW1iZXI6IHByb2R1Y3QuVG9wdXBOdW1iZXJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBBRFJBcHBsaWNhdGlvbi5lbWl0KFwiYWpheC9yZXF1ZXN0XCIsIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1NTTyhjYWxsYmFjaykge1xyXG4gICAgICAgIEFEUkFwcGxpY2F0aW9uLmVtaXQoJ3VzZXIvY2hlY2tTU08nLCB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjazogZnVuY3Rpb24gKGNoZWNrU1NPUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZhciB1c2VySWQgPSBjaGVja1NTT1Jlc3BvbnNlLnVzZXJJZDtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVzZXJJZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWxDYWxsYmFjazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkaW5nKHRvZ2dsZSkge1xyXG4gICAgICAgIGlmICh0b2dnbGUgPT0gJ2hpZGUnKSB7XHJcbiAgICAgICAgICAgICQoJy5tb2JpbGUtY2hhcmdlX19sb2FkaW5nJykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLm1vYmlsZS1jaGFyZ2VfX2xvYWRpbmcnKS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiXX0=
