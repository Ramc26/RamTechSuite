$(window).scroll(function() {

    if ($(this).scrollTop()>0)
     {
        $('.fade').fadeOut();
     }
    else
     {
      $('.fade').fadeIn();
     }
 });