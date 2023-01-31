let news_title = document.querySelector('.news-title');
let published_date = document.querySelector('.published-date');
let blog_img = document.querySelector('.blog-img');
let author_name = document.querySelector('.author-name');
let description_content = document.querySelector('.description-content');
let newsData = JSON.parse(localStorage.getItem('news'));

news_title.textContent = newsData.title;
published_date.textContent = ` ${new Date(newsData.publishedDate).toDateString()}`;
blog_img.src = newsData.imgURL;
author_name.textContent = `By ${newsData.author}`;
description_content.textContent = newsData.description;

