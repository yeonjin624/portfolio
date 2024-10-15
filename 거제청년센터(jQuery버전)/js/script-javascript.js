const allMenu = document.querySelector(".all-menu"),
  allMenuWrapper = document.querySelector(".all-menu-wrapper"),
  allMenuMask = document.querySelector(".all-menu-mask"),
  allMenuClose = document.querySelector(".all-menu-close");
// console.log(allMenu)
// console.log(allMenuWrapper)
// console.log(allMenuMask);
// console.log(allMenuClose)

//all-menu버튼이 클릭되면
// ->전체메뉴 모달창과 mask-layer가 나타난다
allMenu.addEventListener(`click`, function () { 
  allMenuWrapper.classList.add(`active`)
  allMenuMask.classList.add(`active`)
})

//all-menu-close버튼이 클릭되면
// ->전체메뉴 모달창과 mask-layer가 사라진다
allMenuClose.addEventListener(`click`, function () {
  allMenuWrapper.classList.remove(`active`)
  allMenuMask.classList.remove(`active`)
});

//모바일 버튼이 클릭되면
//-1. 모바일 메뉴가 생기고
//-2. 모바일버튼이 x로 변환됨
const mbBtn = document.querySelector(".mb-bt"),
  mbNav = document.querySelector(".mb-nav"),
  mbMenuMask = document.querySelector(".mb-menu-mask");

// console.log(mbBtn)
// console.log(mbNav)
// console.log(mbMenuMask);

mbBtn.addEventListener("click", function (event) { 
  event.preventDefault() //a태그의 링크를 막아줌. 안 막으면 상단으로 이동해버림.
  mbNav.classList.toggle("active")
  mbMenuMask.classList.toggle("active")
  mbBtn.classList.toggle("active")  //한 번 누르면 액티브 add, 두 번 누르면 remove
                          //어떤 상태를 번갈 적용을 의미
  mbMenuList.forEach(function (list, index) {
    list.style.height = "55px";
    //모바일 메뉴 x버튼 누르면, 펼쳐놨던 submenu들이 모두 닫힘->햄버거 눌렀을 때 sub꺼져있기
    mbMainMenu[index].classList.remove("open")
  })
})



//모바일 서브메뉴 펼치기(아코디언) 기능
const mbMenuList = document.querySelectorAll(`.mb-menu > li`),
    mbSubMenu = document.querySelectorAll(`.mb-subMenu`),
  mbMainMenu = document.querySelectorAll(`.mb-mainMenu`);  //mainMenu a

//펼쳐질 서브메뉴의 높이값 저장
let mbSubMenuHeight = [];  //배열선언

//서브메뉴의 높이값을 계산하여 배열값으로 저장
mbSubMenu.forEach(function (List, index) {   //ul안 li 번호당 li
  //할일: submenu들의 높이를 재서 저장할 것임
  console.log(List.querySelectorAll("li"))
  let count = List.querySelectorAll("li").length;
  console.log(count)
  mbSubMenuHeight[index]=51*count+22
});
console.log(mbSubMenuHeight);


//모바일 메뉴(li > a(.mb-mainMenu))클릭했을 때
                         //a 태그   각 방
mbMainMenu.forEach(function (mainList, index) {
  mainList.addEventListener(`click`, function (event) { //event는 매개변수! e줘도 됨!
    event.preventDefault(); //a 클릭이 됐으면? preventDefault가 실행되어 인식 안 됨. 클릭 안 됐다면? 2번 객실로 넘어감
    mainList.classList.toggle("open")
    let isOpen = mainList.classList.contains("open")//contain: open을 포함하고 있어? 묻는 거임. 있으면 true가 나오고, 없으면 false가 나옴.
    //mainList는 매개변수. mMainMenu(=a) 각각을 가리킴.
    if (isOpen) {
      let subMenuHeight = mbSubMenuHeight[index]  //index번째에 오는 li의 높이
      console.log(subMenuHeight);
      mbMenuList[index].style.height=`${subMenuHeight+55}px` //55는 메인 메뉴 높이
    } else {
      mbMenuList[index].style.height = `55px`
      mainList.classList.remove("open")
    }
  })
})
// mainList=mainMenu의 li태그


//화면 사이즈 체크
window.addEventListener(`resize`, function () {
  let temp = window.innerWidth;
  console.log(temp)
  if (temp > 1220) {
    mbNav.classList.remove("active");
    mbMenuMask.classList.remove("active");
    mbBtn.classList.remove("active");
    mbMenuList.forEach(function (list, index) {
      list.style.height = "55px"
      //mb-menu의 li들임!!! 위에 올려보면 나옴. 근데 각각한테 다 줘야 함.
      list.classList.remove("open")
    })
  } else { 
    allMenuWrapper.classList.remove("active")
    allMenuMask.classList.remove("active")
  }
})
 

//화면을 위로 이동
const goTop = document.querySelector(".gotop")
goTop.addEventListener("click", function () {
  window.scrollTo({
    //세부 내용 설정. 스크롤 하면,
    top: 0, //top:0 지점으로 가겠다
    //a 태그 href="javascript:void(0)"하면 작동 안 함. # 준 것과 같은 효과.
    behavior:"smooth"   //스무스하게 올라감
  })
 })


let swVisual=new Swiper(".sw-visual", {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  effect: "fade",
  speed: 2500,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
const swiperStart = document.querySelector(".swiper-start");
swiperStart.addEventListener(`click`, function (e) {
  e.preventDefault();
  //a태그라서 클릭하면 위로 올라가는 효과 없애려고 넣음
  this.classList.toggle("play"); //this는 함수임
  let isPlay = this.classList.contains("play");
  //있없을 확인하고, 있으면 true, 없으면 false 띄워줌
  if (isPlay) {
    //isPlay가 true => .swiper-start요소에 play클래스가 존재한다
    //슬라이드 멈춤
    swVisual.autoplay.stop();
  } else {
    //슬라이드 재생
    swVisual.autoplay.start();
  }
});


let swBanner=new Swiper(".sw-banner", {
  // slidesPerView: 6,
  // spaceBetween: 13,
  slidesPerView: "auto",
  navigation: {
    prevEl: ".banner-back",
    nextEl: ".banner-forward",
  },
  autoplay: true,
  rewind: true,
});
//배너 슬라이드 일시멈춤 버튼
const bannerPlay = document.querySelector(".banner-play")
bannerPlay.addEventListener("click", function () {
  let spanEl = this.querySelector("span")
  let txtContent = spanEl.textContent;
  //textContent; : 키의 값을 가져옴. 클래스명은 뭐며 자식은 뭐뭐 있고 이런 거 다 키로 있음.
  console.log(txtContent);//이거하면 콘솔에 pause 뜸
  //this=실행되는 대상을 가리킴. 여기선 bannerPlay 말함.
  if (txtContent == "play_arrow") {
    spanEl.textContent = "pause"
    swBanner.autoplay.start();

  } else {
    spanEl.textContent = "play_arrow";
    //key로 play_arrow 이걸 넣어준다
    swBanner.autoplay.stop(); //변수를 넣어야 되는 함수 같은 애라서 () 준거
  }
 })



