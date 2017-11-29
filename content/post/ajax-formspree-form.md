---
title: "Setting up an AJAX-based Formspree form"
thumbnailImagePosition: left
# thumbnailImage: //d1u9biwaxjngwg.cloudfront.net/cover-image-showcase/city-750.jpg
# coverImage: //d1u9biwaxjngwg.cloudfront.net/cover-image-showcase/city.jpg
metaAlignment: center
coverMeta: out
date: 2017-09-26T12:22:44-04:00
categories:
- tutorial
tags:
- formspree
- ajax
- form
- contact
- static
keywords:
- formspree
- hugo
- ajax
clearReading: true
---

Back when I converted my site from WordPress to Hugo, one of the issues I had to take care of was setting up a processor for my contact form. I decided to go with Formspree as their free tier easily handled the amount of form submissions I got per month.

<!--more-->
While most folks will use Formspree with a "regular" old form post, you can also use a fancy-pants Ajax submission as well. The Formspree folks document this, but their example is rather short, and when I was asked by someone on the Surge Slack about a full example, I decided to whip something up.

To be clear, and more on this at the end, this was a quick bit of code just to give that user a "real" example they could take and modify. There's many different ways of doing this and what I've built here was done in about five minutes.

My example consists of two files - an HTML file and a JavaScript file. There's no styling involved but I assume folks can handle that on their own.

# HTML
{{< codeblock "formspree.html" >}}
<form id="formspree-form" method="POST" novalidate>
  <input type="email" name="email" placeholder="Your email" />
  <textarea name="message" placeholder="Your message"></textarea>
  <input type="hidden" name="subject" value="Subject line goes here" />
  <button type="submit">Submit</button>
</form>
{{< /codeblock >}}

# JavaScript
{{< codeblock "formspree.js" >}}
$(document).ready(function() {
  var $form = $('#formspree-form');
  var $field_subject = $form.find('input[name="subject"]');
  var $field_email = $form.find('input[name="email"]');
  var $field_message = $form.find('textarea[name="message"]');
  var $form_submit = $form.find('button[type="submit"]');

  $form_submit.on({
    'click': function(e) {
      var email_val = $field_email.val();
      var subject_val = $field_subject.val();
      var message_val = $field_message.val();

      e.preventDefault(); // stop default form submit

      /* validation logic goes here */

      $.ajax({
        url: "//formspree.io/your@email.com",
        method: "POST",
        data: {
          "email": email_val,
          "subject": subject_val,
          "message": message_val
        },
        dataType: "json",
        beforeSend: function() {
          console.log("Sending message.");
        },
        success: function() {
          $form[0].reset(); // reset form fields
          console.log("Message submitted.");
        },
        fail: function() {
          console.log("Message failed.");
        }
      });

    }
  });
});
{{< /codeblock >}}
