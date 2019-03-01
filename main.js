var forms = document.getElementsByTagName('form');

var labelShow = document.getElementById('labelShow');
labelShow.addEventListener('click', show)
function show(){
  var start = document.getElementById('start');
  start.classList.remove('hide');
  start.classList.add('show');
}

for(var i = 0; i < forms.length; i++){
 forms[i].addEventListener('submit', validator);
}
// Правила
var rules = {
 required: function(el){
  if(el.value != '' && el.value != ' ' || el.checked == true){
    el.classList.remove('error');
    el.nextElementSibling.innerHTML = ('');
   return true;
 }
   el.classList.add('error');
  el.nextElementSibling.innerHTML = ('This field is required');
  return false;
 },
 email: function(el){
  var reg = /^\w{1,}@\w{1,}\.\w{2,}$/;
  if(!reg.test(el.value)){
   if(el.hasAttribute('data-rule')){
     el.classList.add('error');
    el.nextElementSibling.innerHTML = ('Email address is not valid');
   }
  }else{
    el.classList.remove('error');
    el.nextElementSibling.innerHTML = ('');
    return reg.test(el.value);
  }
},
text: function(el){
 var reg2 = /^[а-яА-Яa-zA-Z0-9]+$/;
if(el.value != '' && el.value != ' '){
  if(!reg2.test(el.value)){
   if(el.hasAttribute('data-rule')){
     el.classList.add('error');
    el.nextElementSibling.innerHTML = ('Can use \" and \' ');
   }
  }else{
    el.classList.remove('error');
    el.nextElementSibling.innerHTML = ('');
    return reg2.test(el.value);
  }
}
},
max: function(el){
  if(el.value.length > 40){
    el.nextElementSibling.innerHTML = ('max 40');
    return false;
  }
  el.nextElementSibling.innerHTML = ('');
  return true;

},
checked: function(el){

    if(el.checked == true){
      return true;
    }else{
      var o = document.getElementsById('help_state');
      o.innerHTML = "Please select anyone";
      return false;
    }
},
}
// Ошыбки
function showErrors (arr) {
  console.log(arr)
 for(q = 0; q <arr.length; q++ ){
   console.log(arr[q])
 }
}
// Валидатор
function validator (e) {
 var errors =[];
 var inputs = this.elements;
 for(var i = 0; i < inputs.length; i++){
  if (inputs[i].tagName != 'BUTTON') {
  var rulesList = inputs[i].dataset.rule;
  rulesList = rulesList.split(' ');
  for(var j = 0; j < rulesList.length; j++){
   if (rulesList[j] in rules) {
   if(!rules[rulesList[j]](inputs[i])){
    errors.push({
     name: inputs[i].name,
     error: rulesList[j]
    });
   }
  }
  }
 }
 }
 if(errors.length > 0){
  e.preventDefault();
  showErrors(errors);
} else{
  alert('Validation passed');
}

}
