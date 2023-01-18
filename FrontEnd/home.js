// $(document).ready(function(){
//     $(window).scroll(function(){
//         // sticky navbar on scroll script
//         if(this.scrollY > 20){
//             $('.navbar').addClass("sticky");
//         }else{
//             $('.navbar').removeClass("sticky");
//         }
//     });
// })



$(document).ready(function(){
    $(".ans-1").hide();
    $(".ans-2").hide();
    $(".ans-3").hide();
    $(".ans-4").hide();
})

$(document).ready(function(){
    $(".ques-1").click(function(){
      $(".ans-1").fadeIn();
      $(".ans-2").hide();
      $(".ans-3").hide();
      $(".ans-4").hide();
    });
  });

  $(document).ready(function(){
    $(".ques-2").click(function(){
      $(".ans-2").fadeIn();
      $(".ans-1").hide();
      $(".ans-3").hide();
      $(".ans-4").hide();
    });
  });

  $(document).ready(function(){
    $(".ques-3").click(function(){
      $(".ans-3").fadeIn();
      $(".ans-1").hide();
      $(".ans-2").hide();
      $(".ans-4").hide();
    });
  });

  $(document).ready(function(){
    $(".ques-4").click(function(){
      $(".ans-4").fadeIn();
      $(".ans-1").hide();
      $(".ans-2").hide();
      $(".ans-3").hide();
    });
  });