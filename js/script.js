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
function textUpdate(obj) {
  var val = obj.value;
  var result = obj.id.substring(5);
  result = result.charAt(0).toLowerCase() + result.substring(1);
  document.getElementById(result).innerHTML = val;
}

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
}