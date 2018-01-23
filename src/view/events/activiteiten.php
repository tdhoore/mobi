<section class="activities">
  <header>
    <h2 class="titleAccent sectionHeader">Ontdek één van de vele activiteiten</h2>
  </header>
  <form class="activiteitenFilter" action="index.php?page=activiteiten" method="post">
    <input type="hidden" name="action" value="filter"/>
    <label for="search">
      <span>Ik zoek</span>
      <span class="textInput">
        <input type="text" name="search" id="search" placeholder="Naam, tag, …"/>
      </span>
    </label>
    <div class="locAndDate">
      <label for="location">
        <span>in</span>
        <span class="textInput">
        <input type="text" name="location" id="location" placeholder="Stad of postcode"/>
      </span>
      </label>
      <label for="date">
        <span>op</span>
        <select class="" name="date" id="date">
          <option value="1">16/09</option>
        </select>
      </label>
    </div>
    <input type="submit" name="submit" value="search" class="btn"/>
  </form>
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
  <a href="#" class="btn">Meer activiteiten</a>
</section>