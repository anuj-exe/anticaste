var carousel = $('#carousel'),
    threshold = 150,
    slideWidth = 550,
    dragStart, 
    dragEnd;

    if (window.matchMedia('(min-width: 600px)').matches) {
      slideWidth = 550;
    }
    else if (window.matchMedia('(min-width: 550px)').matches) {
      slideWidth = 540;
    }
    else if (window.matchMedia('(min-width: 500px)').matches) {
      slideWidth = 490;
    }
    else if (window.matchMedia('(min-width: 450px)').matches) {
      slideWidth = 440;
    }
    else if (window.matchMedia('(min-width: 400px)').matches) {
      slideWidth = 390;
    }
    else if (window.matchMedia('(min-width: 350px)').matches) {
      slideWidth = 340;
    }
    else if (window.matchMedia('(min-width: 300px)').matches) {
      slideWidth = 290;
    }
    else if (window.matchMedia('(min-width: 280px)').matches) {
      slideWidth = 275;
    }
    else{
      slideWidth=550;
    }

var tym = 0;

var count = 0;
window.onload=function(){
  a();
};
function a(){

  function doer(){
      document.getElementById("next").click();
      count++;
      setTimeout(doer2, 10);
  }

  function doer2(){
      document.getElementById("next").click();
      count++;
      if (count<20) {
        setTimeout(doer, 10);
      } else {
        setTimeout(khatam, 1);
      }
  }
  doer();
  function khatam(){
    console.log("k");
    document.getElementById('next').id = 'next2';
    document.getElementById('prev').id = 'prev2';
    tym = 700;
  }
}

$('#next').click(function(){ shiftSlide(-1,tym) })
$('#prev').click(function(){ shiftSlide(1,tym) })

carousel.on('mousedown', function(){
  if (carousel.hasClass('transition')) return;
  dragStart = event.pageX;
  $(this).on('mousemove', function(){
    dragEnd = event.pageX;
    $(this).css('transform','translateX('+ dragPos() +'px)')
  })
  $(document).on('mouseup', function(){
    if (dragPos() > threshold) { return shiftSlide(1,700) }
    if (dragPos() < -threshold) { return shiftSlide(-1,700) }
    shiftSlide(0,700);
  })
});

function dragPos() {
  return dragEnd - dragStart;
}

function shiftSlide(direction,tym) {
  if (carousel.hasClass('transition')) return;
  dragEnd = dragStart;
  $(document).off('mouseup')
  carousel.off('mousemove')
          .addClass('transition')
          .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
  setTimeout(function(){
    if (direction === 1) {
      $('.slide:first').before($('.slide:last'));
    } else if (direction === -1) {
      $('.slide:last').after($('.slide:first'));
    }
    carousel.removeClass('transition')
		carousel.css('transform','translateX(0px)'); 
  },tym)
}