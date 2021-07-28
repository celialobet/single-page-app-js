const pageList = (argument = "") => {
  const welcome = `<div id="welcome_section" class="mx-0 my-3 p-0"><h1 id="welcome_title" class="white_title">Welcome,</h1><p class="welcome_text">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
  the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
  brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
  groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
  with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p></div>`;

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = `${url}&search=${argument}&page_size=27`;
      } else {
        finalURL = `${url}&dates=2022-01-01,2022-12-31&page_size=27`;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
            ${welcome}
              <div class="container">
                <div class="row">
                  <div class="col-4">
                    <div class="cardGame card>
                      <div class="card-img-top">
                        <img src="${article.background_image}" alt="">
                      </div>
                      <div class="card-body">
                        <h1>${article.name}</h1>
                        <h2>${article.released}</h2>
                        <a href = "#pagedetail/${article.id}">${article.id}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}`,
      cleanedArgument
    );
  };

  const render = () => {
    let pageContent = document.getElementById("pageContent");
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default pageList;
