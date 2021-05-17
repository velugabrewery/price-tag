// 컬러 변경
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function colorChange(){
  var img = document.getElementById('mainImage');
  img.setAttribute('crossOrigin', 'anonymous');
  var vibrant = new window.Vibrant(img);
  var swatches = vibrant.swatches();
  var arrCycle = ['cycleY', 'cycleS', 'cycleL'];
  arrCycle.forEach(item => {
    if (document.getElementById(item)){
      var item = document.getElementById(item);
      item.style.borderColor = swatches.Vibrant.getHex();
      item.style.color = swatches.Vibrant.getHex();
    };
  });
  if (document.getElementsByClassName('beer-header')){
    var beerTemHeader = document.getElementsByClassName('beer-header')[0];
    if (vibrant.LightMutedSwatch !== true) {
      beerTemHeader.style.backgroundColor = vibrant.LightMutedSwatch.getHex();
    }
    else {
      beerTemHeader.style.backgroundColor = swatches.Muted.getHex();
    }
  };
};

// 페이지 로드
// ––––––––––––––––––––––––––––––––––––––––––––––––––
window.onload = function() {
  let params = window.location.search.substr(1).split('&');
  for(let i in params) {
    let keyValue = params[i].split('=')
    let key = keyValue[0]
    let val = keyValue[1]
    if (val == "None" && privateValue == "") {
      val = "비공개"
    }
    else if (val == "None") {
      val = "-"
    }
    console.log(key)
    console.log(val)
    console.log(decodeURIComponent(val))
    var text = decodeURIComponent(val)
    var getml = text.substring(text.length-2, text.length)
    console.log(getml)
    if (key == 'sake_meter_value' && Number(val) > 0) {
      text = '+' + val
    }
    if (getml == "mL") {
      document.getElementsByName(key)[0].value = text.toLowerCase()
    }
    else {
      document.getElementsByName(key)[0].value = text
    }
  }
  addPackage(2)
  addPackage(3)

  // 가공형태 갯수에 따라서 없앰
  if (inputProductPackage2.value == "") {
    delPackage(2)
    delPackage(3)
  }
  else if (inputProductPackage3.value == "") {
    delPackage(3)
  }

  // 연중생산, 시즈널, 한정판 체크
  if (document.getElementsByName('production_cycle_type')[0].value == 'year_round') {
    changeCycle('yearround')
  }
  else if(document.getElementsByName('production_cycle_type')[0].value == 'seasonal') {
    changeCycle('seasonal')
  }
  else {
    changeCycle('limited')
  }
  formSubmit()
  colorChange()
  autoTooLongOrigin()
}


// 이미지 생성
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function makeTem1(){
  domtoimage.toJpeg(document.getElementById('template1'), { width: 1000 })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      if (inputEnglishName == "") {
        link.download = 'Tem1 ' + inputProducerName.value + ' ' + inputName.value + '.jpeg';
      }
      else {
        link.download = 'Tem1 ' + inputProducerEnglishName.value + ' ' + inputEnglishName.value + '.jpeg';
      }
      link.href = dataUrl;
      link.click();
    }); 
} 
function makeOG(){
  domtoimage.toJpeg(document.getElementById('opengraph'))
    .then(function (dataUrl) {
      var link = document.createElement('a');
      if (inputEnglishName == "") {
        link.download = 'OG ' + inputProducerName.value + ' ' + inputName.value + '.jpeg';
      }
      else {
        link.download = 'OG ' + inputProducerEnglishName.value + ' ' + inputEnglishName.value + '.jpeg';
      }
      link.href = dataUrl;
      link.click();
    });
}
function makeImage(){
  makeTem1();
  makeOG();
}

function makeBlogThumb(){
  domtoimage.toJpeg(document.getElementById('blogThumbnail'))
    .then(function (dataUrl) {
      var link = document.createElement('a');
      if (inputEnglishName == "") {
        link.download = 'Thumbnail ' + inputProducerName.value + ' ' + inputName.value + '.jpeg';
      }
      else {
        link.download = 'Thumbnail ' + inputProducerEnglishName.value + ' ' + inputEnglishName.value + '.jpeg';
      }
      link.href = dataUrl;
      link.click();
    });
}
function makeBlogImage(){
  makeBlogThumb();
}

function makeTem1Short(){
  domtoimage.toJpeg(document.getElementById('template1'), { width: 1000 })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'Tem1.jpeg';
      link.href = dataUrl;
      link.click();
    }); 
} 
function makeOGShort(){
  domtoimage.toJpeg(document.getElementById('opengraph'))
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'OG.jpeg';
      link.href = dataUrl;
      link.click();
    });
}
function makeImageShort(){
  makeTem1Short();
  makeOGShort();
}

// 리모컨
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function changeCycle(cycle) {
  var arrCycle = ['cycleY', 'cycleS', 'cycleL'];
  arrCycle.forEach(item => {
    // 도장이 있으면
    if (document.getElementById(item)){
      var circle = document.getElementById(item);
      circle.style.display = 'none';
    }
    // 도장이 없으면
    else {}
    btnCycle = 'btn' + item.charAt(0).toUpperCase() + item.substring(1);
    document.getElementById(btnCycle).classList.remove('on');
  });

  // 도장이 있으면
  cycleStamp = 'cycle' + cycle.charAt(0).toUpperCase();
  if (document.getElementById(cycleStamp)){
    document.getElementById(cycleStamp).style.display = 'block';
  }
  // 도장이 없으면
  else {
    var cycleTag = document.getElementById('cycle');
    if (cycle == 'yearround') {
      cycleTag.innerText = '연중생산';
    }
    else if (cycle == 'seasonal') {
      cycleTag.innerText = '시즈널';
    }
    else if (cycle == 'limited') {
      cycleTag.innerText = '한정판';
    }
  }
  btnCycle = 'btnCycle' + cycle.charAt(0).toUpperCase();
  document.getElementById(btnCycle).classList.add('on');
}

function addPackage(num){
  // 템플릿 1
  var p = document.getElementById('package' + num);
  p.classList.add('d-flex');
  p.classList.remove('d-none');

  // 버튼 클래스 추가 및 제거
  var btnAddPackage = document.getElementById('btnAddPackage' + num);
  var btnDelPackage = document.getElementById('btnDelPackage' + num);
  btnAddPackage.classList.add('on');
  btnDelPackage.classList.remove('on');
}
function delPackage(num){
  // 템플릿 1
  var p = document.getElementById('package' + num);
  p.classList.add('d-none');
  p.classList.remove('d-flex');

  // 버튼 클래스 추가 및 제거
  var btnAddPackage = document.getElementById('btnAddPackage' + num);
  var btnDelPackage = document.getElementById('btnDelPackage' + num);
  btnDelPackage.classList.add('on');
  btnAddPackage.classList.remove('on');
}

// 폰트 사이즈 
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function resetFontSize(name, fontSize){
  document.getElementById(name).style.fontSize = fontSize + 'px';
}

function fontSize(name, num){
  var el = document.getElementById(name)
  var fontSize = window.getComputedStyle(el, null).getPropertyValue('font-size');
  fontSizeSubstring = fontSize.slice(0,-2);
  fontSizeSubstring = fontSizeSubstring * 1 + num;
  document.getElementById(name).style.fontSize = fontSizeSubstring + 'px';
}

// 스탬프 이동
// ––––––––––––––––––––––––––––––––––––––––––––––––––
if (document.getElementsByClassName('stamp').length > 0) {
  var stampTop = document.getElementsByClassName('stamp')[0].style.top;
  stampTop = stampTop.slice(0,-2) * 1;
  var stampRight = document.getElementsByClassName('stamp')[0].style.right;
  stampRight = stampRight.slice(0,-2) * 1;
}
else {
  var stampTop = 0;
  var stampRight = 0;
}

function moveStamp(direction, num){
  var direction = direction;
  var arr = document.getElementsByClassName('stamp');
  var arrLength = arr.length;
  var resultArr = new Array();
  for(var i=0; i<arrLength; i++){
    resultArr[i] = arr[i];
  }

  var rArrLength = resultArr.length;

  if(direction == 'top') {
    stampTop += num;
  }
  else if(direction == 'right') {
    stampRight += num;
  }
  
  for(var i=0; i<rArrLength; i++){
    if(direction == 'top') {
      resultArr[i].style.top = stampTop + 'px';
    }
    else if(direction == 'right') {
      resultArr[i].style.right = stampRight + 'px';
    }
  }
}

// 폰트 종류 선택 
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function chanageFontStyle(target, kind){
  var target = document.getElementById(target);
  btnFont = document.getElementsByClassName('btn-font');
  for(var i=0; i < btnFont.length; i++){
    btnFont[i].classList.remove('on');
  }
  if (kind == 'default') {
    btnName = 'btnFont' + kind.charAt(0).toUpperCase() + kind.substring(1);
    document.getElementById(btnName).classList.add('on');

    target.classList.remove('condensed');
  }
  else if (kind == 'condensed') {
    btnName = 'btnFont' + kind.charAt(0).toUpperCase() + kind.substring(1);
    document.getElementById(btnName).classList.add('on');

    target.classList.add('condensed');
  }
}

// 마진 변경
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function resetMarginTop(target, num){
  document.getElementById(target).style.marginTop = num + 'px';
}

function marginTop(target, num){
  var el = document.getElementById(target)
  var marginTop = window.getComputedStyle(el, null).getPropertyValue('margin-top');
  marginTopSubstring = marginTop.slice(0,-2);
  marginTopSubstring = marginTopSubstring * 1 + num;
  document.getElementById(target).style.marginTop = marginTopSubstring + 'px';
}

// 오픈 그래프에 들어가는 지역명이 너무 길어요
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function tooLongOrigin(){
  document.getElementById('originOG1').classList.remove('d-flex');
  document.getElementById('originOG2').classList.remove('d-none');
}

// 상세 지역 자동 줄바꿈
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function autoTooLongOrigin(){
  var originLength = document.getElementById('inputOrigin').value.length;
  var originDetailLength = document.getElementById('inputOriginDetail').value.length;
  
  if (originLength > 8) {
    tooLongOrigin();
  }
  else if (originLength + originDetailLength > 8) {
    tooLongOrigin();
  } 
}

// 이미지 변경
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function resetImageSize(target, num){
  document.getElementById(target).height = num;
  document.getElementById(target).style.minWidth = num + "px";
}

function imageSize(target, num){
  var el = document.getElementById(target);
  el.height += num;
  el.style.minWidth = el.height + "px";
}