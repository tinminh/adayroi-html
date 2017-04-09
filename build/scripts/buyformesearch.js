

window.Buyformesearch = (function () {

        var _this = {};
        var fullName = "";
        _this.resetForm = function () {
            var $form = $('#buyformeFormsearch');
            var form = $form.get(0);
            if (form) {
                form.reset();                
            }
            _this.reloadCaptcha();
        };

        _this.initSuccessPopup = function () {
            var messageTemplate = multiline(function () {/*!@preserve
                <a class="close" href="/"></a>
                <img src="../build/assets/images/vingroup-byforme/popup.png"/>
             */console.log
            });

            bootbox.dialog({
                className: 'buyforme success-modal',
                // title: 'Title',
                message: swig.render(messageTemplate, {
                    locals: {
                        time: Date.now()
                    }
                }),
                closeButton: false,
                backdrop: false,
                onEscape: true
            });
        };

        _this.initErrorPopup = function (msg) {
            bootbox.dialog({
                className: 'shinhan-modal error-modal',
                // title: 'Title',
                message: '<div class="shinhan-modal-content"><h1 class="text-danger">' + msg + '</h1></div>',
                backdrop: true,
                onEscape: true
            });
        };

        _this.reloadCaptcha = function () {
            $('.captcha-image').trigger('click');
            $('#adr-trung-thu-captcha').val('');
        };        

        _this.initValidator = function () {
            $.validator.addMethod('phoneVN', function (value, element) {
                var phone = value.replace(/\s+/g, '');
                return /^(84|0)((1(2([0-9])|6([2-9])|86|88|99))|(9([0-9]))|((86|88|89)))([0-9]{7})$/.test(phone);
            }, 'Please specify a valid phone number');

            $.validator.addMethod('specialChars', function (value, element) {
                value = $.trim(value);
                var pattern = '\x5E\x5B\x61\x2D\x7A\x41\x2D\x5A\x20\xE1\xE0\u1EA3\xE3\u1EA1\u0103\xE2\u1EAF\u1EB1\u1EA5\u1EA7\u1EB7\u1EB5\u1EAB\u1EAD\xE9\xE8\u1EBB\u1EBD\u1EB9\xEA\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\xF3\xF2\u1ECF\xF5\u1ECD\xF4\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u01A1\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\xED\xEC\u1EC9\u0129\u1ECB\u0111\xF9\xFA\u1EE7\u0169\u1EE5\u01B0\u1EE9\u1EED\u1EEF\u1EF1\xC0\xC1\xC2\xC3\xC8\xC9\xCA\xCC\xCD\xD2\xD3\xD4\xD5\xD9\xDA\u0102\u0110\u0128\u0168\u01A0\u01AF\u0102\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\xCA\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\xDD\u1EF6\u1EF8\u1EED\u1EEF\u1EF1\u1EF5\u1EF7\u1EF9\x5D\x2A\x24';
                var regex = new RegExp(pattern, 'i');
                return regex.test(value);
            }, 'The name contains a blacklist keyword(s)');

            $.validator.methods.required = function (value, element, params) {
                return !!$.trim(value);
            };

            $.validator.methods.email = function (value, element, params) {
                return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test($.trim(value));
            }

            $.validator.messages['required'] = 'Bạn chưa điền thông tin trường này';

            $('.captcha-image').on('click', function (event) {
                event.preventDefault();
                $(this).attr('src', '/captcha-buy-for-me?v=' + Date.now());
            });

            _this.form = $('#buyformeFormsearch').validate({
                errorPlacement: function (error, element) {
                    var $error = element.siblings('.buyforme-error');
                    
                    $error.html(error);
                },

                submitHandler: function (form, event) {
                    event.preventDefault();
                    var $form = $(form);
                    
                    var product = $.trim($form.find('[name="product"]').val());
                    var email = $.trim($form.find('[name="email"]').val());
                    var mobile = $.trim($form.find('[name="mobile"]').val());
                    var captcha = $.trim($form.find('[name="captcha"]').val());
                    var fullname = $.trim($form.find('[name="fullname"]').val());
                    $('#vingroup_buyformesearch .buyforme-loading').hide();

                    var BuyForMeSearch = {
                        ProductName: product,
                        Email: email,
                        Phone: mobile,
                        Landing: "Search",
                        AdrUrl: window.location.href,
                        FullName: fullName
                    };

                    var data = {
                        BuyForMe: BuyForMeSearch,
                        Captcha: captcha
                    };

                    var options = {
                        url: '/buy-for-me',
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        isStringify: true,
                        callback: function (data) {
                            var status = data.status,
                                response = data.response;

                            $('#vingroup_buyformesearch .buyforme-loading').hide();

                            if ('success' === status && response && response.Status === 1) {
                                _this.resetForm();
                                _this.initSuccessPopup();
                            } else {
                                _this.initErrorPopup(response.Message || 'Có lỗi xảy ra, vui lòng thử lại!');
                                _this.reloadCaptcha();
                                return false;
                            }                            
                        }
                    };                   
                    //send ajax request
                    ADRApplication.emit("ajax/request", {
                        options: options,
                        data: JSON.stringify(data)
                    });                  
                    
                    return false;
                },

                rules: {                    
                    'mobile': {
                        phoneVN: true                        
                    },
                    'product': {
                        maxlength: 100
                    },
                    'email': {
                        maxlength:100
                    }
                },
                messages: {
                    'mobile': {
                        required: 'Vui lòng nhập số di động.',
                        phoneVN: 'Số điện thoại không đúng định dạng.'
                    },
                    'email': {
                        required: 'Vui lòng nhập email.',
                        email: 'Định dạng email không hợp lệ.',
                        maxlength: 'Email quá dài.'
                    },
                    'product': {
                        required: 'Vui lòng nhập tên sản phẩm.',
                        maxlength: 'Tên sản phẩm quá dài.'
                    },
                    'captcha': {
                        required: 'Vui lòng nhập mã xác nhận.'
                    }
                }
            });
        }

        _this.initForm = function (userInfo) {
            fullName = userInfo.fullName;
            $('#buyformeFormsearch').find('[name="email"]').val(userInfo.email);
            $('#buyformeFormsearch').find('[name="mobile"]').val(userInfo.mobileNumber);
            $('#buyformeFormsearch').find('[name="fullname"]').val(userInfo.fullName);
        };       
        ADRApplication.on('user/updateInfo', function (userInfo) {
            _this.initForm(userInfo);
        });
        _this.init = function () {
            _this.initValidator();            
        };

        return _this;

    })();

$(document).ready(function () {
    window.Buyformesearch.init();
});
