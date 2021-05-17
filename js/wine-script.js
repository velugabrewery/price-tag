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

  var arrTem1 = ['inputEnglishName', 'inputProducerEnglishName', 'inputOrigin', 'inputOriginDetail', 'inputBase', 'inputSubtype', 'inputAbv', 'inputProductPackage1', 'inputProductVolume1', 'inputProductPackage2', 'inputProductVolume2', 'inputProductPackage3', 'inputProductVolume3'];
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

  autoTooLongOrigin()
};

// 값 비공개 여부 체크
var privateValue = "ㄴㄴ";