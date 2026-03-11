const categoriesData = () => {

  const preloader = document.querySelector('.preloder')

  const renderGanreList = (ganres) => {

      const dropdown = document.querySelector('.header__menu .dropdown');

      dropdown.innerHTML = '';
      
      ganres.forEach((ganre) => {
        dropdown.insertAdjacentHTML('beforeend', `
          <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
        `);
      });
  }
  



  const renderAnimeList = (array, ganres) => {

    const wrapper = document.querySelector('.product-page .col-lg-8');
    wrapper.innerHTML = '';
    
    ganres.forEach((ganre) => {
        const productBlock = document.createElement('div');
        productBlock.classList.add('mb-5');

        const listBlock = document.createElement('div');    // контенйер для картчоек опр категрии
        listBlock.classList.add('row')

        const list = array.filter((item) => item.tags.includes(ganre));

        productBlock.insertAdjacentHTML('beforeend', `
          <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-8">
              <div class="section-title">
                <h4> ${ganre} </h4>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4">
              <div class="btn__all">
                <a href="/categories.html?ganre=${ganre}" class="primary-btn"> View All <span class="arrow_right"></span></a>
              </div>
            </div>
          </div>
        `);


        list.forEach((item) => {
          const ul = document.createElement('ul');

          item.tags.forEach((tag) => {
            ul.insertAdjacentHTML('beforeend', `
                <li>${tag}</li>
            `)
          });

          listBlock.insertAdjacentHTML('beforeend', `
            <div class="col-lg-4 col-md-6 col-sm-6">
              <div class="product__item">
                <div class="product__item__pic set-bg" data-setbg="${item.image}">
                  <div class="ep"> ${item.rating} / 10 </div>
                  <div class="view"><i class="fa fa-eye"></i> ${item.views} </div>
                </div> 
                <div class="product__item__text">
                  ${ul.outerHTML}
                  <h5><a href="/anime-details.html?itemId=${item.id}"> ${item.title} </a></h5>
                </div>
              </div>
            </div>
          `);
        });

      
        
        
        productBlock.append(listBlock)
        wrapper.append(productBlock)

        wrapper.querySelectorAll('.set-bg').forEach((elem) => {
          elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
        });

        setTimeout(() => {
          preloader.classList.remove('active') // отключли лоадер
        }, 500)
        
    }); // конец цикла по жанрам
  };




  const renderTopnime = (array) => {

    const wrapper = document.querySelector('.filter__gallery')

    wrapper.innerHTML = ''

    array.forEach(item => {
      wrapper.insertAdjacentHTML('beforeend', `
        <div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}">
            <div class="ep">${item.rating} / 10</div>
            <div class="view"><i class="fa fa-eye"></i> ${item.views} </div>
            <h5><a href="/anime-details.html">${item.title}</a></h5>
        </div>
      `);
    });


    wrapper.querySelectorAll('.set-bg').forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
    });
  };



  fetch('./db.json') // НАЧАЛО
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const ganres = new Set();   // пустая коллекция {} (набор уникальных значений)
      const ganreParams = new URLSearchParams(window.location.search).get('ganre') // ganre это query параметр  из http://127.0.0.1:5501/categories.html?ganre=%D0%A4%D1%8D%D0%BD%D1%82%D0%B5%D0%B7%D0%B8


      data.anime.forEach((item) => {
        ganres.add(item.ganre)
      });

      renderTopnime(data.anime.sort((a, b) => b.views - a.views).slice(0, 5));

      if(ganreParams){
        renderAnimeList(data.anime, [ganreParams]);
      }else{
        renderAnimeList(data.anime, ganres);
      }

      
      renderGanreList(ganres);
    });


}



categoriesData()