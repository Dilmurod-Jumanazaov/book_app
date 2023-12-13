const elForm = document.querySelector(".js-form");
const elFormInput = document.querySelector(".js-form-input");
const elLanguageSelect = document.querySelector(".js-language-select");
const elList = document.querySelector(".js-hero-list");
const elSortSelect = document.querySelector(".js-sort-select");
const bookArr = books;
const languageArr = [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  const inputValue = elFormInput.value.trim();
  elFormInput.value = "";
});

function renderBooks(array,node) {
  node.innerHTML = "";
  
  array.forEach(element => {
    const newItem = document.createElement("li");
    const bookImg = document.createElement("img");
    const bookTitle = document.createElement("h3");
    const authorBox = document.createElement("div");
    const authorText = document.createElement("span");
    const bookAuthor = document.createElement("p");
    const bookLanguage = document.createElement("p");
    const pageBox = document.createElement("div");
    const bookPage = document.createElement("span")
    const bookYear = document.createElement("span");
    const bookLink = document.createElement("a");
    
    newItem.classList.add("hero__list-item");
    bookImg.classList.add("list-item-img");
    bookTitle.classList.add("list__item-title");
    authorBox.classList.add("list__item-author-box");
    authorText.classList.add("list__item-author-text");
    bookAuthor.classList.add("list__item-author");
    bookLanguage.classList.add("list__item-language");
    pageBox.classList.add("list__item-page-box");
    bookPage.classList.add("list__item-page");
    bookYear.classList.add("list__item-year");
    bookLink.classList.add("list__item-link");
    
    bookImg.src = element.imageLink;
    bookImg.alt = element.title;
    bookTitle.textContent = element.title;
    authorBox.classList.add()
    authorText.textContent = "Author:";
    bookAuthor.textContent = element.author;
    bookLanguage.textContent = `Language: ${element.language}`;
    bookPage.textContent = `Page: ${element.pages}`;
    bookYear.textContent = `Year: ${element.year}`;
    bookLink.textContent = "Wikipedia";
    bookLink.href = element.link;
    bookLink.target = "blank";
    
    authorBox.append(authorText,bookAuthor);
    pageBox.append(bookPage,bookYear);
    newItem.append(bookImg,bookTitle,authorBox,bookLanguage,pageBox,bookLink);
    elList.appendChild(newItem);
  });
};
renderBooks(bookArr,elList);

function language(array1,array2) {
  for (const iterator of array1) {
    if(!languageArr.includes(iterator.language)) {
      languageArr.push(iterator.language);
    }
  }
  languageArr.sort();
  for(const iterator of array2) {
    const newOption = document.createElement("option");
    newOption.textContent = iterator;
    newOption.value = iterator;
    
    elLanguageSelect.appendChild(newOption);
  }
}
language(bookArr,languageArr);

elFormInput.addEventListener("keyup", () => {
  const inputValue = elFormInput.value.trim().toLowerCase();
  const searchedBook = bookArr.filter((item) => item.title.toLocaleLowerCase().includes(inputValue));
  renderBooks(searchedBook,elList);
});

elSortSelect.addEventListener("change", () => {
  const sortedArr = bookArr;
  if(elSortSelect.value == "A-Z") {
    sortedArr.sort((a,b) => {
      return a.title.toLowerCase().charCodeAt(0) - b.title.toLowerCase().charCodeAt(0)
    });
    renderBooks(sortedArr,elList);
  } else {
    sortedArr.sort((a,b) => {
      return b.title.toLowerCase().charCodeAt(0) - a.title.toLowerCase().charCodeAt(0);
    });
    renderBooks(sortedArr,elList);
  }
});

elLanguageSelect.addEventListener("change", () => {
  const fiteredLanguageArr = bookArr.reduce((acc,item) => {
    if(item.language == elLanguageSelect.value) {
      acc.push(item);
    }
    renderBooks(acc,elList);
    return acc;
  },[])
});



