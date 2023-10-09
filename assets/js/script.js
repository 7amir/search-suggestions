const autoCompleteWrapper = document.querySelector('.search-input');
const searchInpueElem = document.querySelector('.input__search');
const autoCompleteBox = document.querySelector('.autocom-box');

/**
 * اضافه یا حذف شدن کلاس اکتیو هنگام نوشتن درون اینپوت
*/
function filterwords() {
  searchInpueElem.addEventListener('keyup', function () {
    if (searchInpueElem.value) {
      autoCompleteWrapper.classList.add('active');

      // پیدا کردن کلمات از آرایه که شامل کلماتی که در اینپوت مینویسیم باشد
      let filterWords = suggestions.filter(function (item) {
        return item.includes(searchInpueElem.value);
      });

      createLiElem(filterWords);
    } else {
      autoCompleteWrapper.classList.remove('active');
    }
  });
}

/**
 * به کلمات فیلتر شده li اضافه کردن 
 * @param {ArrayList} wordsArray - کلمات فیلتر شده
 */
function createLiElem(wordsArray) {
  let listItems = wordsArray.map(function (word) {
    return '<li>' + word + '</li>';
  });

  let customArray;

  // در نبود کلمات فیلتر شده در اینپوت همان اینپوتی که کاربر نوشته رو نشان دهد
  if (!listItems.length) {
    customArray = '<li>' + searchInpueElem.value + '</li>';
  } else {
    customArray = listItems.join('');
  }

  autoCompleteBox.innerHTML = customArray;
  select();
}

/**
 * جایگذاری کلمات فیلتر شده به جای اینپوت با کلیک
 * حذف کلاس اکتیو
*/
function select() {
  const allLiElem = document.querySelectorAll('li');

  allLiElem.forEach(function (wordItems) {
    wordItems.addEventListener('click', function (item) {
      searchInpueElem.value = item.target.textContent;
      autoCompleteWrapper.classList.remove('active');
    })
  });
}

function init() {
  filterwords();
}

init();
