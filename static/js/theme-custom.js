$(document).ready(function() {
  var $form = $('#contact-form');
  var $field_subject = $form.find('input[name="subject"]');
  var $field_email = $form.find('input[name="email"]');
  var $field_message = $form.find('textarea[name="message"]');
  var $form_submit = $form.find('button');
  var $form_input_fields = $form.find('input[name="email"], textarea[name="message"]');

  /* Validation */

  $form.on("keypress", ":input:not(textarea)", function(event) {
    return event.keyCode != 13;
  });

  $form_input_fields.on({
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
      var email = $field_email.val();
      var subject = $field_subject.val();
      var message = $field_message.val();
      e.preventDefault();
      if (validateEmail(email) && validateMessage(message)) {
        $.ajax({
          url: "//formspree.io/eaglesfan316@gmail.com",
          method: "POST",
          data: {
            "_subject": subject,
            "email": email,
            "message": message
          },
          dataType: "json",
          beforeSend: function() {
            $('.submit-overlay-sending').fadeIn();
            console.log("Message submitted.");
          },
          success: function() {
            $('.submit-overlay-sending').delay(3000).fadeOut(function() {
              $form[0].reset();
              $('.submit-overlay-success').fadeIn().delay(4000).fadeOut();
            });
            $form.find('.valid').removeClass('valid');
            $form.find('.invalid').removeClass('invalid');
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
