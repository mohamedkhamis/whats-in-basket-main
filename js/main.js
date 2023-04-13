



$('.myContent, .resourseContainer, .helpContainer').css('height', (960 * 74 / 100) + 15 + 'px');
$('.backGround').css('height', (960 * 74 / 100) + 'px');
$('.header, .footer').css('height', (960 * 13 / 100) + 'px');

var pageWidth, pageHeight;

var basePage = {
  width: 1280,
  height: 960,
  scale: 1,
  scaleX: 1,
  scaleY: 1
};

$(function () {
  var $page = $('.myPage');

  getPageSize();
  scalePages($page, pageWidth, pageHeight);

  //using underscore to delay resize method till finished resizing window
  $(window).resize(_.debounce(function () {
    getPageSize();
    scalePages($page, pageWidth, pageHeight);
  }, 150));


  function getPageSize() {
    pageHeight = $('#container').height();
    pageWidth = $('#container').width();
  }

  function scalePages(page, maxWidth, maxHeight) {
    var scaleX = 1, scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

    // var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth)/2));
    // var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight)/2));
    var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
    var newTopPos = 0;
    page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
  }
});



const resoursePopup = document.querySelector(".resoursePopup");
const helpPopup = document.querySelector(".helpPopup");
const resourseBtn = document.querySelector(".resourseBtn");
const helpBtn = document.querySelector(".helpBtn");
const reloadBtn = document.querySelector(".reloadBtn");
const closeBtn = document.querySelectorAll(".closeBtn");
const questions = document.querySelectorAll(".question");
const options = document.querySelectorAll(".option");
let currAns = null;
let isCorrect = false;

resourseBtn.addEventListener("click", function () {
  resoursePopup.classList.add('show')
})
helpBtn.addEventListener("click", function () {
  helpPopup.classList.add('show')
})

closeBtn.forEach(function (currentValue) {
  currentValue.addEventListener("click", function () {
    helpPopup.classList.remove('show');
    resoursePopup.classList.remove('show');
  })
})
questions.forEach(function (currentQuestion) {
  currentQuestion.addEventListener("click", function () {
    questions.forEach(function (currentValue) {
      currentValue.classList.remove("selected")
    })
    currentQuestion.classList.add("selected")
    currAns = currentQuestion.innerHTML;
    let dataAns = currentQuestion.getAttribute('data-answer');
    if (dataAns == "correct") {
      isCorrect = true;
    } else {
      isCorrect = false;
    }
    console.log(dataAns);
  })
})

options.forEach(function (currentOption) {
  currentOption.addEventListener("click", function () {
    if (currAns == null || currentOption.classList.contains('done')) {
      return;
    } if (isCorrect) {
      let currSelectedQues = document.querySelector('.question.selected')
      currentOption.innerHTML = currAns + "<img src='assets/images/tikMark-small.png'/>";
      currentOption.classList.add('done');
      currSelectedQues.classList.add('hidden');
      currSelectedQues.classList.remove('selected');
      currAns = null;
      isCorrect = false;
    } else {
      currentOption.innerHTML = currAns + "<img class='animate' src='assets/images/crossMark-small.png'/>";
      setTimeout(function () {
        currentOption.innerHTML = "&nbsp;"
      }, 1100)
    }
  })
})

reloadBtn.addEventListener('click', function () {
  options.forEach(function (ele) {
    ele.innerHTML = "&nbsp;"
    ele.classList.remove('done')
  })
  questions.forEach(function (ele) {
    ele.classList.remove('hidden')
  })
})

// note when click on showAns you must add class hidden to all questions with dataAns correct and remove class select from all questions 
// don"t froget to remove this comment
// ماتفضحناش