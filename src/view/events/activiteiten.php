<section class="activities">
  <header class="sectionHeader">
    <h2 class="titleAccent">Ontdek één van de vele activiteiten</h2>
  </header>
  <form class="activiteitenFilter" action="index.php?page=activiteiten" method="post" autocomplete="off">
    <input type="hidden" name="action" value="filter"/>
    <label for="search">
      <span>Ik zoek</span>
      <span class="textInput">
        <input type="text" name="search" id="search" placeholder="Naam, tag, ..." class="suggestion" value=""/>
      </span>
    </label>
    <div class="locAndDate">
      <label for="location">
        <span>in</span>
        <span class="textInput">
        <input type="text" name="location" id="location" placeholder="Stad of postcode" class="suggestion" value=""/>
      </span>
      </label>
      <label for="date">
        <span>op</span>
        <select class="" name="date" id="date">
          <option value="0">Alles</option>
          <option value="1">16/09</option>
          <option value="2">17/09</option>
          <option value="3">18/09</option>
        </select>
      </label>
    </div>
    <input type="submit" name="submit" value="search" class="btn"/>
  </form>
  <ul class="filterTags tags"></ul>
  <div class="activiteitenHolder">
    <a href="#">
      <article class="imageArticle">
        <header>
          <div>
          <h3 class="titleAccent">Title</h3>
          <p class="titleAccent">16 september 2018</p>
          </div>
          <ul class="tags">
            <li>Tag1</li>
            <li>Tag2</li>
            <li>Tag3</li>
          </ul>
        </header>
        <picture>
          <source media="(min-width: 675px)" srcset="http://via.placeholder.com/240x160 480w,
          http://via.placeholder.com/380x280 760w
          " sizes="(max-width: 839px)380px, (min-width: 840px)240px">
          <source media="(min-width: 0px)" srcset="http://via.placeholder.com/210x210 420w,
          http://via.placeholder.com/110x110 220w"
          sizes="(min-width: 0px)30vw">
          <img src="http://via.placeholder.com/380x280" alt=""/>
        </picture>
      </article>
    </a>
    <a href="#">
      <article class="imageArticle">
        <header>
          <div>
          <h3 class="titleAccent">Title</h3>
          <p class="titleAccent">16 september 2018</p>
          </div>
          <ul class="tags">
            <li>Tag1</li>
            <li>Tag2</li>
            <li>Tag3</li>
          </ul>
        </header>
        <img src="http://via.placeholder.com/100x100" alt=""/>
      </article>
    </a>
    <article class="imageArticle">
      <header>
        <div>
        <h3 class="titleAccent">Title</h3>
        <p class="titleAccent">16 september 2018</p>
        </div>
        <ul class="tags">
          <li>Tag1</li>
          <li>Tag2</li>
          <li>Tag3</li>
        </ul>
      </header>
      <img src="http://via.placeholder.com/100x100" alt=""/>
    </article>
    <article class="imageArticle">
      <header>
        <div>
        <h3 class="titleAccent">Title</h3>
        <p class="titleAccent">16 september 2018</p>
        </div>
        <ul class="tags">
          <li>Tag1</li>
          <li>Tag2</li>
          <li>Tag3</li>
        </ul>
      </header>
      <img src="http://via.placeholder.com/100x100" alt=""/>
    </article>
  </div>
  <a href="#" class="btn">Meer activiteiten</a>
</section>
