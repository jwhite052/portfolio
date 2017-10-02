$(document).ready(function() {
  $('#contact-form').submit(function(e) {
      var name = $('#inputName')
      var email = $('#inputEmail')
      var message = $('#inputMessage')

      if(name.val() == "" || email.val() == "" || message.val() == "") {
        $('.submit-fail').fadeToggle(400);
        return false;
      }
      else {
        $.ajax({
          method: 'POST',
          url: '//formspree.io/jashuawhite@gmail.com',
          data: $('#contact-form').serialize(),
          datatype: 'json',
          success: function() {
            console.log("Message success!");
          }
        });
        e.preventDefault();
        $(this).get(0).reset();
        $('.submit-success').fadeToggle(400);
      }
    });

  $('.submit-fail, .submit-success').click(function() {
    $(this).hide();
  })
});
  
