"use strict";

/*! gulp-start v0.0.2 | (c) 2020 Bulat | MIT License | https://github.com/BulatSa/gulp-start */

/***********************
 Отправка формы в php BEGIN
 ***********************/
$(function () {
  $(".ajax-form").on("submit", function (event) {
    var form = $(this);
    var submitBtn = form.find('.btn');
    var send = true;
    event.preventDefault();
    $(this).find("[data-req='true']").each(function () {
      if ($(this).val() === "") {
        $(this).addClass('error');
        send = false;
      }

      if ($(this).is('select')) {
        if ($(this).val() === null) {
          $(this).addClass('error');
          send = false;
        }
      }

      if ($(this).is('input[type="checkbox"]')) {
        if ($(this).prop('checked') !== true) {
          $(this).addClass('error');
          send = false;
        }
      }

      if ($(this).is('input[type="tel"]')) {
        if ($(this).cleanVal().length < 11) {
          $(this).addClass('error');
          send = false;
        }
      }
    });
    $(this).find("[data-req='true']").on('focus', function () {
      $(this).removeClass('error');
    }); // empty file inputs fix for mac

    var fileInputs = $('input[type="file"]:not([disabled])', form);
    fileInputs.each(function (_, input) {
      if (input.files.length > 0) return;
      $(input).prop('disabled', true);
    });
    var form_data = new FormData(this);
    fileInputs.prop('disabled', false);
    $("[data-label]").each(function () {
      var input_name = $(this).attr('name');
      var input_label__name = input_name + '_label';
      var input_label__value = $(this).data('label').toString();
      form_data.append(input_label__name, input_label__value);
    });

    if (send === true) {
      submitBtn.prop('disabled', true);
      $.ajax({
        type: "POST",
        async: true,
        url: "/send.php",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function success(result) {
          console.log(result);
          $.fancybox.close();

          if (result.indexOf("Mail FAIL") !== -1) {
            $.fancybox.open({
              src: '#modal-error'
            });
          } else {
            setTimeout(function () {
              $.fancybox.open({
                src: '#modal-thanks'
              });
            }, 600);
            setTimeout(function () {
              $.fancybox.close();
            }, 4500);
            form[0].reset();
          }

          submitBtn.prop('disabled', false);
        }
      });
      setTimeout(function () {
        submitBtn.prop('disabled', false);
      }, 4500);
    }
  });
});
/***********************
 Отправка формы в php END
 ***********************/

/***********************
 Input mask BEGIN
 ***********************/

$(function () {
  var telInputs = $("input[type='tel']");

  String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  };

  var options = {
    onKeyPress: function onKeyPress(cep, event, currentField, options) {
      if (cep.charAt(1) === "8") {
        var currentValue = currentField.get(0).value;
        currentField.get(0).value = currentValue.replaceAt(1, "7");
      }
    }
  };
  telInputs.mask("+0 (000) 000-00-00", options);
  telInputs.on('focus', function () {
    if ($(this).get(0).value.length < 2) {
      $(this).get(0).value = "+";
    }
  });
  telInputs.on('blur', function () {
    if ($(this).get(0).value === "+") {
      $(this).get(0).value = "";
    }
  });
});
/***********************
 Input mask END
 ***********************/

/***********************
MacOS Detection BEGIN
***********************/

$(function () {
  var is_macos = /^((?!chrome|android).)*Macintosh/i.test(navigator.userAgent);
  var is_iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  if (is_macos || is_iOS) {
    if ($('.class').length) {
      $('.class').addClass('is-macos');
    }
  }
});
/***********************
MacOS Detection END
***********************/

/***********************
 fancybox BEGIN
 ***********************/

$.fancybox.defaults.backFocus = false;
$.fancybox.defaults.autoFocus = false;
$.fancybox.defaults.lang = 'ru';
$.fancybox.defaults.i18n = {
  'ru': {
    CLOSE: 'Закрыть',
    NEXT: 'Дальше',
    PREV: 'Назад',
    ERROR: 'Не удается загрузить. <br/> Попробуйте позднее.',
    PLAY_START: 'Начать слайдшоу',
    PLAY_STOP: 'Остановить слайдшоу',
    FULL_SCREEN: 'На весь экран',
    THUMBS: 'Превью'
  }
};

function initFancy() {
  $('.fancy').fancybox({
    buttons: ['close']
  });
  $('.fancy-modal').fancybox({
    selector: '',
    touch: false
  });
  $('.fancy-map').fancybox({
    toolbar: false,
    smallBtn: true,
    defaultType: "iframe"
  });
  $('.fancy-video').fancybox({
    toolbar: false,
    smallBtn: true,
    youtube: {
      controls: 1,
      showinfo: 0,
      autoplay: 1
    }
  });
}

$(function () {
  initFancy();
});
/***********************
 fancybox END
 ***********************/

/***********************
 Прокрутка к секциям BEGIN
 ***********************/

$(function () {
  $('.scrollto').on('click', function () {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    $('html,body').stop().animate({
      scrollTop: destination
    }, 1000);
    return false;
  });
});
/***********************
 Прокрутка к секциям END
 ***********************/

/***********************
 Waypoints BEGIN
 ***********************/

$(function () {
  $('.anim').waypoint(function () {
    $(this.element).toggleClass('animated');
  }, {
    offset: '85%'
  });
});
/***********************
 Waypoints END
 ***********************/