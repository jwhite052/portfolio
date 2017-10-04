$(document).ready(function() {
  var $form = $('#contact-form');
  var $fieldSubject = $form.find('input[name="subject"]');
  var $fieldEmail = $form.find('input[name="email"]');
  var $fieldMessage = $form.find('textarea[name="message"]');
  var $formSubmit = $form.find('button');
  var $formInputFields = $form.find('input[name="email"], textarea[name="message"]');

  /* Validation */

  $formInputFields.on({
    'focusin': function() {
      $(this).addClass('focus');
    },
    'focusout': function() {
      $(this).removeClass('focus');
    }
  });

  $fieldEmail.on({
    'keyup': function() {
      var $self = $(this);
      if (validateEmail($self.val())) {
        setValid(this);
      } else {
        setInvalid(this);
      }
    }
  });

  $fieldMessage.on({
    'keyup': function() {
      var $self = $(this);
      if (validateMessage($self.val())) {
        setValid(this);
      } else {
        setInvalid(this);
      }
    }
  });

  function setValid(el) {
    $(el).addClass('valid').removeClass('invalid');
  }
  function setInvalid(el) {
    $(el).addClass('invalid').removeClass('valid');
  }

  /* Submit */

  $formSubmit.on({
    'click': function(e) {
      var emailValue = $fieldEmail.val();
      var subjectValue = $fieldSubject.val();
      var messageValue = $fieldMessage.val();
      var isFormValid = true;

      e.preventDefault();

      if (!validateEmail(emailValue)) {
        setInvalid($fieldEmail.get(0));
        isFormValid = false;
      }
      if (!validateMessage(messageValue)) {
        setInvalid($fieldMessage.get(0));
        isFormValid = false;
      }
      if (!isFormValid) {
        return;
      }

      $.ajax({
        url: "//formspree.io/eaglesfan316@gmail.com",
        method: "POST",
        data: {
          "subject": subject_value,
          "email": emailValue,
          "message": messageValue
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
  });

  function validateEmail(email) {
    var pattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    return pattern.test(email) ? true : false;
  }
  function validateMessage(message) {
    return message.length >= 10 ? true : false;
  }
});
