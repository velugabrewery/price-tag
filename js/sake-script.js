// 데이터 입력
// ––––––––––––––––––––––––––––––––––––––––––––––––––
function formSubmit(){
  // 템플릿 1
  // 메인 이미지 URL을 받아서 삽입
  var mainImage = document.getElementById('mainImage');
  var inputMainImageUrl = document.getElementById('inputMainImageUrl').value;
  mainImage.src = inputMainImageUrl;
  // 와인 설명
  var inputDescription = document.getElementById('inputDescription').value;
  inputDescription = inputDescription.replace(/\n\n/g, '<hr><hr>').replace(/\n/g, '<br>');
  document.getElementById('description').innerHTML = inputDescription;

  var arrTem1 = ['inputName', 'inputProducerName', 'inputOrigin', 'inputOriginDetail', 'inputSubtype', 'inputAbv','inputSakeMeterValue', 'inputAcidity','inputProductPackage1', 'inputProductVolume1', 'inputProductPackage2', 'inputProductVolume2', 'inputProductPackage3', 'inputProductVolume3'];
  arrTem1.forEach(item => {
    var itemValue = document.getElementById(item).value;
    var subStringItem = item.substring(5);
    subStringItem = subStringItem.charAt(0).toLowerCase() + subStringItem.substring(1);
    document.getElementById(subStringItem).innerHTML = itemValue;
  });
  
  // 오픈그래프
  // 메인 이미지 URL을 받아서 삽입
  var mainImageOG = document.getElementById('mainImageOG');
  mainImageOG.src = inputMainImageUrl;

  var arrOG = ['inputName', 'inputProducerName', 'inputOrigin', 'inputOriginDetail', 'inputSubtype', 'inputAbv'];
  arrOG.forEach(item => {
    var itemValue = document.getElementById(item).value;
    var subStringItem = item.substring(5);
    // 오픈그래프는 뒤에 OG가 붙음 
    subStringItem = subStringItem.charAt(0).toLowerCase() + subStringItem.substring(1) + "OG";
    document.getElementById(subStringItem).innerHTML = itemValue;
  });

  // 상세 지역 명이 너무 길 때, 사용하려고 만든 거
  document.getElementById('origin2OG').innerHTML = document.getElementById('inputOrigin').value;
  document.getElementById('originDetail2OG').innerHTML = document.getElementById('inputOriginDetail').value;

  // 블로그용 썸네일
  var mainImageBlogThumb = document.getElementById('mainImageBlogThumb');
  mainImageBlogThumb.src = inputMainImageUrl;

  // 사케 그래프 display 여부
  if (inputSakeMeterValue.value == "비공개" && inputAcidity.value == "비공개") {
    aciditySpace.style.display = "none";
    acidity.style.display = "none";
    sakeGraph.style.display = "none";
  }
  else if (inputSakeMeterValue.value == "비공개") {
    sakeGraphSMV.style.display = "none";
    sakeGraphSpace.style.display = "none";
  }
  else if (inputAcidity.value == "비공개") {
    sakeGraphAcidity.style.display = "none";
    sakeGraphSpace.style.display = "none";
  }
  else {}

  // SMV 그래프 값 삽입
  var SMV = document.getElementById('inputSakeMeterValue').value;
  var SMVCursor = document.getElementById('SMVCursor');
  var SMVSign = SMV.charAt(0);
  var SMVNum = SMV.substring(1) * 1;

  SMVCursor.innerHTML = SMV;
  if (SMVNum > 10) {
    SMVNum = 445;
  }
  else {
    SMVNum = SMVNum * 44;
  }
  SMVResult = SMVSign + SMVNum + "px";
  SMVCursor.style.marginLeft = SMVResult;

  // Acidity 그래프 값 삽입
  var acidityValue = document.getElementById('inputAcidity').value;
  var acidityCursor = document.getElementById('acidityCursor');

  acidityCursor.innerHTML = acidityValue;
  if (acidityValue <= 0.7) {
    acidityValue = 0;
  }
  else if (acidityValue >= 2) {
    acidityValue = 445;
  }
  else {
    acidityValue = (acidityValue - 0.7) * 10 * 34;
  }
  acidityResult = acidityValue + "px";
  acidityCursor.style.marginLeft = acidityResult;

  autoTooLongOrigin()
};

// 값이 없는지 체크
var inputEnglishName = "";

// 값 비공개 여부 체크
var privateValue = "";