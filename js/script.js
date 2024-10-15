$(document).ready(function () { 
   const mbBtn = $('.mb-bt'),
      mbNav = $('.mb-nav'),
      mbMenuMask = $(".mb-menu-mask");

   //모바일 버튼이 클릭되면
   // - 1. 모바일 메뉴가 생기고
   // - 2. 모바일 버튼이 x로 변환됨

mbBtn.click(function (e) {
      e.preventDefault()
      mbBtn.toggleClass("active")
      mbNav.toggleClass("active")
      mbMenuMask.toggleClass("active")
   mbMenuList.each(function (index, list) {
     $(this).find(".mb-mainMenu").removeClass("open");
     //this: mbMenuList 하나하나 $(list) 쓴 것과 동일. find: 클래스명이 ~인 거 찾겠다
     //mbMenuList.eq(index).removeClass("open") //요래 쓸 수도 있음

     $(list).find(".mb-subMenu").slideUp();
     //mbSubMenu.eq(index).slideUp() //요래 쓸 수도 있음
   })
   })
   //모바일 서브메뉴 펼치기(아코디언 기능)
   const mbMenuList = $(".mb-menu > li"),
         mbMainMenu = $(".mb-mainMenu"),
         mbSubMenu = $(".mb-subMenu");
   
   //모바일 메뉴(li>a(.mb-mainMenu))클릭했을 때
   mbMainMenu.each(function (index, menu) { 
      //순수 자바스크립트의 Foreach와 동일=each. 변수 순서는 index부터
      
      $(menu).click(function (e) { //변수도 $()이거 해주기! ""까지는 필요x
                                   //$(this)라고 써도 됨. mbMainMenu의 하나하나
         e.preventDefault();
         $(menu).toggleClass("open");
         
        let isOpen = $(menu).hasClass("open");
        // hasClass=그냥 자바스크립트에서 classList와 동일

         if (isOpen) {
          mbSubMenu.eq(index).slideDown();    //얘는 대괄이[] 안 씀!! .eq()로!
         } else {
            mbSubMenu.eq(index).slideUp();
        }
      })
   })


   let allMenuWrapper = $(".all-menu-wrapper");
   let allMenuMask = $(".all-menu-mask");
   $(".all-menu").click(function () {
      allMenuWrapper.css("display", "block");
      allMenuMask.css("display", "block");
   });
   $(".all-menu-close").click(function () {
         allMenuWrapper.css("display", "none");
         allMenuMask.css("display", "none");
    });

   //화면 사이즈 체크
   $(window).resize(function () { 
      // let temp = $(window).width();//.width();선택된 요소의 너비(콘텐츠 영역만 가져옴)
      // let temp = $(window).innerWidth(); //.width();선택된 요소의 너비(콘텐츠 영역+패딩까지)
      let temp = $(window).outerWidth();//.width();선택된 요소의 너비(콘텐츠 영역+패딩+테두리까지)
      // let temp = $(window).outerWidth(true);//.width();선택된 요소의 너비(콘텐츠 영역+패딩+테두리+마진영역까지)
      console.log(temp) //결과값: 사이즈 바꿀 때마다 화면 width 뜸
      if (temp > 1220) {
         mbBtn.removeClass("active")
         mbNav.removeClass("active")
         mbMenuMask.removeClass("active")

         mbMenuList.each(function (index, list) {
         $(this).find(".mb-mainMenu").removeClass("open");
         //this: mbMenuList 하나하나 $(list) 쓴 것과 동일. find: 클래스명이 ~인 거 찾겠다
         //mbMenuList.eq(index).removeClass("open") //요래 쓸 수도 있음            
         $(list).find(".mb-subMenu").slideUp();
         //mbSubMenu.eq(index).slideUp() //요래 쓸 수도 있음
         });



      } else { 
         allMenuWrapper.removeClass("active")
         allMenuMask.removeClass("active")

      }
   })
   //화면을 위로 이동
   $(".gotop").click(function () { 
      $('html,body').animate({
         scrollTop:0, //window.scrollTo(top:0)과 같음
      },1000)
   })
})