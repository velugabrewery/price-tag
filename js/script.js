// 데이터 입력
// ––––––––––––––––––––––––––––––––––––––––––––––––––
// function formSubmit(){
//   var inputId = []; // id 값을 넣을 배열
//   var input = document.getele("input[type=text]"); // 모든 텍스트 인풋 접근
//   $.each(input, function (key, value) {
//     inputId.push($(value).attr('id')); // id 값만을 추출
//   });
//   inputId = $.unique(inputId.sort()).sort(); //중복요소제거

//   inputId.forEach(item => {
//     var itemValue = document.getElementById(item).value;
//     var subStringItem = item.substring(5);
//     subStringItem = subStringItem.charAt(0).toLowerCase() + subStringItem.substring(1);
//     document.getElementById(subStringItem).innerHTML = itemValue;
//   });
// };

// onChange
// ––––––––––––––––––––––––––––––––––––––––––––––––––
// 일반적인 input
function textUpdate(obj) {
  var val = obj.value;
  var result = obj.id.substring(5);
  var viewInput = 'view' + result;

  result = result.charAt(0).toLowerCase() + result.substring(1);
  document.getElementById(result).innerHTML = val;
  
  if (document.getElementById(result + '2') != null) {
    document.getElementById(result + '2').innerHTML = val;
  }

  // 베이스 byte 체크
  if (result = 'base') {
    var byte = 0;
    for (var i = 0; i < val.length; i++) {
      (val.charCodeAt(i) > 127) ? byte += 2 : byte++ ;
    }
    if (byte > 40) {
      document.getElementById('lineBreak').style.display = 'block';
      document.getElementById('lineCombine').style.display = 'none';
    }
    else {
      document.getElementById('lineBreak').style.display = 'none';
      document.getElementById('lineCombine').style.display = 'block';
    }
  }

  // 값이 없으면 숨김처리 input
  if (val != '') {
    document.getElementById(viewInput).style.display = 'flex';
    document.getElementById(result).innerHTML = val;
  }
  else {
    document.getElementById(viewInput).style.display = 'none';
  }

  // 기본 패딩값으로 레이아웃 어그러지는거 해결
  var arr = ['viewColor', 'viewAroma'];
  var flexNumber = 0;
  for (i = 0; i < arr.length; i++) {
    if (document.getElementById(arr[i]).style.display != 'flex') {
      flexNumber += 1;
    }
  }
  
  if (flexNumber == 2) {
    document.getElementById('commonPalette').classList.add('pt-0');
  }
  else {
    document.getElementById('commonPalette').classList.remove('pt-0');
  }
}

// 가격과 관련된 input. 가격, 할인율
function discountUpdate(obj) {
  var val = obj.value;
  var result = obj.id.substring(5);
  result = result.charAt(0).toLowerCase() + result.substring(1);
  document.getElementById(result).innerHTML = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  var discountPrice = document.getElementById('inputDiscountPrice').value;
  var discountPercent = document.getElementById('inputDiscountPercent').value;
  var price = discountPrice / (1-discountPercent/100);
  price = Math.floor(price/100) * 100;
  document.getElementById('price').innerHTML = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (discountPercent > 0) {
    document.getElementById('discountPercent').style.display = 'inline-block';
    document.getElementById('price').style.display = 'inline-block';
  }
  else {
    document.getElementById('discountPercent').style.display = 'none';
    document.getElementById('price').style.display = 'none';
  }
}

// 그래프
function graphUpdate(obj) {
  var val = obj.value;
  console.log(val);
  var result = obj.id.substring(5);
  var viewGraph = 'view' + result;
  result = result.charAt(0).toLowerCase() + result.substring(1);
  if (val > 0) {
    document.getElementById(viewGraph).style.display = 'flex';
    document.getElementById(result).style.marginLeft = (val - 1) * 20 + '%';
  }
  else {
    document.getElementById(viewGraph).style.display = 'none';
  }

  // 기본 패딩값으로 레이아웃 어그러지는거 해결
  var arr = ['viewBody', 'viewTannin', 'viewSugarContent', 'viewAcidity'];
  var flexNumber = 0;
  for (i = 0; i < arr.length; i++) {
    if (document.getElementById(arr[i]).style.display != 'flex') {
      flexNumber += 1;
    }
  }
  
  if (flexNumber == 4) {
    document.getElementById('winePalette').classList.add('pt-0');
  }
  else {
    document.getElementById('winePalette').classList.remove('pt-0');
  }
}

// 밸런스
function balanceUpdate(obj) {
  var val = obj.value;
  var result = obj.id.substring(5);
  result = result.charAt(0).toLowerCase() + result.substring(1);
  document.getElementById(result).style.marginLeft = (val - 1) * 20 + 10 + '%';

  if (val != '') {
    document.getElementById('viewBalance').style.display = 'flex';
  }
  else {
    document.getElementById('viewBalance').style.display = 'none';
  }
}
// function balanceUpdate(obj) {
//   var val = obj.value;
//   var result = obj.id.substring(5);
//   result = result.charAt(0).toLowerCase() + result.substring(1);
//   document.getElementById(result).style.transform = 'rotate(' + ((val - 1) * 36 - 72) + 'deg)';

//   if (val != '') {
//     document.getElementById('viewBalance').style.display = 'block';
//     // document.getElementById('priceContainer').style.paddingBottom = '25px';
//     // document.getElementById('paletteContainer').style.paddingBottom = '25px';
//   }
//   else {
//     document.getElementById('viewBalance').style.display = 'none';
//     // document.getElementById('priceContainer').style.paddingBottom = '40px';
//     // document.getElementById('paletteContainer').style.paddingBottom = '40px';
//   }
// }

// makeImage
function makeImage(){
  domtoimage.toJpeg(document.getElementById('priceTag'), { width: 826 })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = document.getElementById('inputProductName').value + '.jpeg';
      link.href = dataUrl;
      link.click();
    }); 
} 