
$('.open-popup').click(function(e) {
    e.preventDefault();
    $('.popup-bg').fadeIn(800);
    $('html').addClass('no-scroll');
    $('.menu__list').removeClass('open');
    $('.burger').removeClass('active');
    $('.burger').css('opacity', 0);

});

$('.close-popup').click(function() {
    $('.popup-bg').fadeOut(800);
    $('html').removeClass('no-scroll');
    $('.burger').css('opacity', 1);
});


//  const form=document.getElementById('form');
//   form.addEventListener('submit',formSend);

//   async function formSend(e){
//     e.preventDefault();
//     let formData=new FormData(form);
//     form.classList.add('_sending');
    
//     let response = await fetch('sendmail.php',{
//        method:'POST',
//        body: formData
//     });

//     if(response.ok){
//        let result=await response.json();
//        alert(result.message);
//        form.reset();
//        form.classList.remove('_sending');
//     }else{
//        alert("errrror");
//        form.classList.remove('_sending');
//     }
// }
const burger=document.querySelector('.burger');
const menu=document.querySelector('.menu__list');
const menu__item=document.querySelectorAll('.menu__item');
const html=document.querySelector('html')

menu__item.forEach(function (menuItem) {
  menuItem.addEventListener('click', ()=>{
  burger.classList.toggle('active');
	menu.classList.toggle('open');
	html.classList.add('no-scroll');
  });
});
burger.addEventListener('click', ()=>{
	burger.classList.toggle('active');
	menu.classList.toggle('open');
	html.classList.add('no-scroll');
});





