const detailData = () => {

  const preloader = document.querySelector('.preloder')
  

  const renderGanreList = (ganres) => {

      const dropdown = document.querySelector('.header__menu .dropdown');

      dropdown.innerHTML = '';
      
      ganres.forEach((ganre) => {
        dropdown.insertAdjacentHTML('beforeend', `
          <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
        `);
      });
  };
  
  



  const renderAnimeDetails = (array, itemId) => {

    const animeObj = array.find((item) => item.id == itemId)
    const imageBlock = document.querySelector('.anime__details__pic')
    const viewsBlock = document.querySelector('.view')
    const titleBlock = document.querySelector('.anime__details__title h3'); 
    const subTitleBlock = document.querySelector('.anime__details__title span'); 
    const descriptionBlock = document.querySelector('.anime__details__text p'); 
    const widgetList = document.querySelectorAll('.anime__details__widget ul li'); 
    const breadcrumb = document.querySelector('.breadcrumb__links span'); 
    

    if(animeObj){
      console.log(animeObj)
      imageBlock.dataset.setbg = animeObj.image;
      viewsBlock.innerHTML = '';
      
      viewsBlock.insertAdjacentHTML('beforeend', `
        <i class="fa fa-eye"></i> ${animeObj.views}
      `)

      titleBlock.textContent = animeObj.title;
      subTitleBlock.textContent = animeObj['original-title']; // тк совтанове свойство то берем в квалрат скобки
      descriptionBlock.textContent = animeObj.description;
      widgetList[0].insertAdjacentHTML('beforeend', `
        <span>Date aired:</span> ${animeObj.date}
      `) 

      widgetList[1].insertAdjacentHTML('beforeend', `
        <span>Rating:</span> ${animeObj.rating}
      `) 

      widgetList[2].insertAdjacentHTML('beforeend', `
        <span>Genre:</span> ${animeObj.tags.join(', ')}
      `) 

      document.querySelectorAll('.set-bg').forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`
      })

      breadcrumb.textContent = animeObj.ganre

      setTimeout(() => {
        preloader.classList.remove('active') // отключли лоадер
      }, 500)
    }else{
      console.log('Аниме отсутсвует')
    }
  };




  

  

  fetch('./db.json') // НАЧАЛО
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const ganres = new Set();   // пустая коллекция {} (набор уникальных значений)
      const ganreParams = new URLSearchParams(window.location.search).get('itemId') // itemId это query параметр  из http://127.0.0.1:5501/anime-details.html?itemId=0


      data.anime.forEach((item) => {
        ganres.add(item.ganre)
      });

     
      if(ganreParams){
        renderAnimeDetails(data.anime, ganreParams);
      }else{
        console.log('Аниме отсутсвует')
      }

      renderGanreList(ganres);
    });


}








detailData()