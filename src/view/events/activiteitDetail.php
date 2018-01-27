<article class="activityInfo">
  <header class="activityInfoHeader">
    <h2 class="titleAccent"><?php echo $extraInfo['title']; ?></h2>
    <div class="dateAndTags">
      <p><?php echo $date; ?></p>
      <ul class="tags">
        <?php foreach ($extraInfo['tags'] as $value) {
          echo '<li>'. $value['tag'] .'</li>';
        } ?>
      </ul>
    </div>
    <div class="shareLink">
      <p>Deel deze activiteit</p>
      <ul>
        <li><a href="#"><span class="hide">Facebook</span></a></li>
        <li><a href="#"><span class="hide">Twitter</span></a></li>
      </ul>
    </div>
  </header>
  <img src="http://via.placeholder.com/340x140" alt=""/>
  <p><?php echo $extraInfo['mainText']; ?></p>
  <article class="address">
    <header class="titleAccent">
      <h3>Waar is dit?</h3>
    </header>
    <address>
      <span class="locName"><?php echo $extraInfo['location']; ?></span>
      <span><?php echo $extraInfo['address']; ?></span>
      <span><?php echo $extraInfo['city']; ?> <?php echo $extraInfo['postal']; ?></span>
    </address>
    <a href="#" class="btn ghostBtn">Toon op google maps</a>
  </article>
</article>
<?php echo $extraInfo['content']; ?>
<!--
<section class="extraInfo">
  <header class="hide">
    <h3>Extra information</h3>
  </header>
  <article class="textArticle">
    <header class="titleAccent">
      <h4>Initiatie sport</h4>
    </header>
    <p>Maak kennis met een initiatie baseball. Of bent u eerder fan van een skateinitiatie? Misschien is curling wel iets voor u? Of houdt u eerder van een gevechts- en/of verdedigingssport? De dienst sport informeert u graag over het sportaanbod.</p>
  </article>
  <div class="doubleArticle">
    <article class="textArticle">
      <header class="titleAccent">
        <h4>Optredens</h4>
      </header>
      <p>Geniet even een rustpauze van de vele optredens terwijl u geniet van een drankje en een versnapering.</p>
      <img src="http://via.placeholder.com/340x140" alt=""/>
    </article>
    <article class="textArticle">
      <header class="titleAccent">
        <h4>Spel</h4>
      </header>
      <p>Daag uw vrienden uit op een rondje op de sweeper. Of ga terug in de tijd met een potje volksspelen.</p>
    </article>
  </div>
  <article class="textArticle defaultArticle">
    <header class="titleAccent">
      <h4>Kinderen</h4>
    </header>
    <p>Voor de allerkleinsten worden er ponyritjes voorzien of wat dacht u van een fietsdraaimolen? Met het treinspringkasteel gaat het vooruit. De leerlingen van de OLV-Presentatie toveren een mooie grime op uw gezicht en knutselen graag iets leuks met u.</p>
    <img src="http://via.placeholder.com/270x200" alt=""/>
  </article>
  <div class="halfScreen">
    <article class="textArticle">
      <header class="titleAccent">
        <h4>Opening bibliotheek</h4>
      </header>
      <p>In het kader van de feestelijke heropening na de renovatiewerken, is de Bib op Autovrije zondag uitzonderlijk open tot 17 uur. Een weekend vol activiteiten voor jong en oud met onder ander Begijn Le Bleu, workshops papier scheppen, buttons maken, t-shirts printen, rondleidingen, voorleesmomenten en nog veel meer.</p>
    </article>
    <article class="textArticle">
      <header class="titleAccent">
        <h4>Zeepkistenrace</h4>
      </header>
      <p>Van die typische bommakasten, waar de kringloopcentra van uitpuilen omdat niemand ze nog wil, kent u die? Wel deze werden omgeturnd tot een zeepkist. Benieuwd? Neem dan zeker deel aan de race of aanschouw dit spektakel als toeschouwer.</p>
    </article>
  </div>
</section>-->
<?php if(!empty($extraInfo['practical'])){ ?>
<article class="textArticle praktischeInfo">
  <header class="titleAccent">
    <h3>Praktische informatie</h3>
  </header>
  <p><?php echo $extraInfo['practical']; ?></p>
  <article class="websiteLink">
    <header class="titleAccent">
      <h4>Bekijk ook zeker onze website</h4>
    </header>
    <a href="<?php echo $extraInfo['link']; ?>" class="btn ghostBtn"><?php echo str_replace('http://', '', str_replace('https://', '', $extraInfo['link'])); ?></a>
  </article>
</article>
<?php } else { ?>
  <article class="textArticle praktischeInfo">
      <header class="titleAccent">
        <h3>Bekijk ook zeker onze website</h3>
      </header>
      <a href="<?php echo $extraInfo['link']; ?>" class="btn ghostBtn"><?php echo str_replace('http://', '', str_replace('https://', '', $extraInfo['link'])); ?></a>
    </article>
  </article>
<?php } ?>
