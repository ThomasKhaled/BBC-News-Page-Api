var topicBlog = 'everything?q=today';
var url = `https://newsapi.org/v2/${topicBlog}&apiKey=18dd7a002083448496765212c858db73`;
async function getData(url) {
    const data = await fetch(url).then(data=>{return data});
    return await data.json();
}

class News {
    constructor({ id, author, content, description, publishedDate, title, imgURL }) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.description = description;
        this.publishedDate = publishedDate;
        this.title = title;
        this.imgURL = imgURL;
    }
}
let homeBlog = document.querySelector('.home');
let topHeadlinesBlog = document.querySelector('.top-headlines');
let bitcoinBlog = document.querySelector('.bitcoin');
let businessBlog = document.querySelector('.business');
let newsSection = document.querySelector('.news');

homeBlog.addEventListener('click', async () => {
    topicBlog = 'everything?q=today';
    url = `https://newsapi.org/v2/${topicBlog}&apiKey=18dd7a002083448496765212c858db73`;
    news = [];
    newsSection.innerHTML = '';
    fillNewsArr();
});
topHeadlinesBlog.addEventListener('click', () => {
    topicBlog = 'top-headlines?country=us';
    url = `https://newsapi.org/v2/${topicBlog}&apiKey=18dd7a002083448496765212c858db73`;
    news = [];
    newsSection.innerHTML = '';
    fillNewsArr();
});
bitcoinBlog.addEventListener('click', () => {
    topicBlog = 'everything?q=bitcoin';
    url = `https://newsapi.org/v2/${topicBlog}&apiKey=18dd7a002083448496765212c858db73`;
    news = [];
    newsSection.innerHTML = '';
    fillNewsArr();

});
businessBlog.addEventListener('click', () => {
    topicBlog = 'everything?q=business';
    url = `https://newsapi.org/v2/${topicBlog}&apiKey=18dd7a002083448496765212c858db73`;
    news = [];
    newsSection.innerHTML = '';
    fillNewsArr();
});


 function fillNewsArr() {
    data =  getData(url);
    data.then((res) => {
        for (let i = 0; i < res.articles.length; i++) {
            news.push(new News({
                id: i,
                author: res.articles[i].author,
                content: res.articles[i].content,
                description: res.articles[i].description,
                title: res.articles[i].title,
                publishedDate: res.articles[i].publishedAt,
                imgURL: res.articles[i].urlToImage
            }));
        }
    }).finally(()=>{
        getNews();
    });
    
}

let data = getData(url);
let news = [];
fillNewsArr();

let newsData;
function getNews() {
    newsSection.style.display = 'grid';
    newsSection.style.gridTemplateColumns = 'repeat(4,1fr)';
    newsSection.style.gap = '30px';
    newsSection.style.padding = '2rem';
    newsSection.style.marginTop = '1rem';
    newsSection.style.overflowX = 'auto';
    console.log(news.length);
    for (let i = 0; i < news.length; i++) {
        let article = document.createElement('article');
        let articleImage = document.createElement('img');
        let articleTitle = document.createElement('h2');
        let articleTitleText = document.createTextNode(`${news[i].title}`);
        let articleContent = document.createElement('p');
        let articleContentText;
        if (!news[i].content == '') {
            articleContentText = document.createTextNode(`${news[i].content.slice(0, news[i].content.lastIndexOf('['))}`);
        } else {
            articleContentText = document.createTextNode(``);
        }
        article.style.cursor = 'pointer';
        article.style.margin = '0px 1rem';
        if (`${news[i].imgURL}` !== 'null') {
            articleImage.src = `${news[i].imgURL}`;
        } else {
            articleImage.src = `Images/placeHolder.png`;
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth > '1030') {
                articleImage.style.width = '400px'
                articleTitle.style.width = '400px'
                articleContent.style.width = '400px'
            }
            if (window.innerWidth <= '1360') {
                articleImage.style.width = '300px'
                articleTitle.style.width = '300px'
                articleContent.style.width = '300px'
            }
            if (window.innerWidth <= '1030') {
                articleImage.style.width = '400px'
                articleTitle.style.width = '400px'
                articleContent.style.width = '400px'
            }
            if (window.innerWidth <= '1030') {
                articleImage.style.width = '400px'
                articleTitle.style.width = '400px'
                articleContent.style.width = '400px'
            }
            if (window.innerWidth <= '935') {
                articleImage.style.width = '300px'
                articleTitle.style.width = '300px'
                articleContent.style.width = '300px'
            }

            if (window.innerWidth <= '500') {
                articleImage.style.width = '300px'
                articleTitle.style.width = '300px'
                articleContent.style.width = '300px'
            }
            if (window.innerWidth <= '375') {
                articleImage.style.width = '200px'
                articleTitle.style.width = '200px'
                articleContent.style.width = '200px'
            }
        });
        if (window.innerWidth > '1030') {
            articleImage.style.width = '400px'
            articleTitle.style.width = '400px'
            articleContent.style.width = '400px'
        }
        //articleImage.style.width = '400px'
        articleImage.style.height = '200px'
        //articleTitle.style.width = '300px'
        articleTitle.style.height = 'auto'
        //articleContent.style.width = '300px'
        articleContent.style.height = 'fit-content'
        articleContent.style.marginBottom = '1rem'

        articleContent.appendChild(articleContentText);
        articleTitle.appendChild(articleTitleText);
        article.appendChild(articleImage);
        article.appendChild(articleTitle);
        article.appendChild(articleContent);

        newsSection.appendChild(article);
        article.addEventListener('click', () => {
            showFoot();
            newsData = new News({author: news[i].author, content: news[i].content, description: news[i].description,
                title: news[i].title, publishedDate: news[i].publishedDate, imgURL: news[i].imgURL});
                localStorage.setItem('news',JSON.stringify(newsData));
            setTimeout(window.open('./News.html'), 100);
            
        });

    }
}
let foot = document.querySelector('.foot');
setTimeout(getNews, 2000);

function showFoot() {
    foot.style.display = 'block';
}
function hideFoot() {
    foot.style.display = 'none';
}
setTimeout(showFoot, 2500);







let mobile_menu = document.getElementsByClassName('mobile-menu')[0];
let ulItems = document.getElementsByClassName('ul-items')[0];


window.addEventListener('resize', () => {
    if (window.innerWidth <= '600') {
        ulItems.classList.add('active');
    }
    else {
        ulItems.classList.remove('active');
        ulItems.style.display = 'flex';
    }
    if (window.innerWidth > '1030') {
        newsSection.style.gridTemplateColumns = 'repeat(4,1fr)';
    }

    if (window.innerWidth <= '1360') {
        newsSection.style.gridTemplateColumns = 'repeat(3,1fr)';
    }
    if (window.innerWidth <= '1030') {
        newsSection.style.gridTemplateColumns = 'repeat(2,1fr)';
    }
    if (window.innerWidth <= '700') {
        newsSection.style.gridTemplateColumns = 'repeat(1,1fr)';
    }
});
mobile_menu.addEventListener('click', () => {
    ulItems.classList.toggle('active');
    if (!ulItems.classList.contains('active')) {
        ulItems.style.display = 'block';
    }
    //ulItems.style.display = 'block';
});

