$(document).ready(function() {
  var $form = $('#contact-form');
  var $field_email = $form.find('input[name="_replyto"]');
  var $field_message = $form.find('textarea[name="message"]');
  var $form_submit = $form.find('button');
  var $form_inputs = $form.find('input[name="_replyto"], textarea[name="message"]');

  /* Validation */

  $form.on("keypress", ":input:not(textarea)", function(event) {
    return event.keyCode != 13;
  });

  $form_inputs.on({
    'focusin': function() {
      $(this).addClass('focus');
    },
    'focusout': function() {
      $(this).removeClass('focus');
    }
  });

  $field_email.on({
    'keyup': function() {
      console.log("Focus E-mail");
      if (validateEmail($(this).val())) {
        console.log("Valid E-mail");
        $(this).addClass('valid').removeClass('invalid');
      } else {
        console.log("Invalid E-mail");
        $(this).addClass('invalid').removeClass('valid');
      }
    }
  });

  $field_message.on({
    'keyup': function() {
      console.log("Focus Message");
      if (validateMessage($(this).val())) {
        console.log("Valid Message - Length = " + $(this).val().length);
        $(this).addClass('valid').removeClass('invalid');
      } else {
        console.log("Invalid Message - Length = " + $(this).val().length);
        $(this).addClass('invalid').removeClass('valid');
      }
    }
  });

  /* Submit */

  $form_submit.on({
    'click': function(e) {
      if (validateEmail($field_email.val()) && validateMessage($field_message.val())) {
        $('.submit-overlay').fadeIn();
        console.log("Message submitted.");
        $.ajax({
          url: "//formspree.io/eaglesfan316@gmail.com",
          method: "POST",
          data: {
            message: $field_message
          },
          dataType: "json",
          success: function() {
            setTimeout(function(){ console.log("Message successfully sent."); }, 3000);
            $('.submit-overlay').fadeOut();
          }
        });
      }
    }
  });

  function validateEmail(email) {
    var pattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    return pattern.test(email) ? true : false;
  }
  function validateMessage(message) {
    return message.length >= 10 ? true : false;
  }
});
