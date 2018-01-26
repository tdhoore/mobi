<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Week van de mobiliteit 2018</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
       WebFontConfig = {
         custom: {
           families: ['aleo'],
           urls: ['css/fonts.css']
         }
       };

       (function(d) {
          var wf = d.createElement('script'), s = d.scripts[0];
          wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
          wf.async = true;
          s.parentNode.insertBefore(wf, s);
       })(document);
    </script>
    <?php echo $css;?>
  </head>
  <body>
  <header class="mainHeader">
    <div class="wrapper">
      <h1><span>Week van de mobiliteit</span></h1>
      <nav>
        <ul>
          <li><a href="index.php">Home</a></li>
          <li><a href="#">Over de week</a></li>
          <li><a href="#">Nieuws</a></li>
          <li><a href="#">Zelf iets organiseren?</a></li>
          <li><a href="index.php?page=activiteiten" class="btn">Ontdek de acties</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <?php echo $content; ?>
  </main>
  <footer>
    <div class="wrapper">
      <a href="index.php" class="logo"><span>Week van de mobiliteit</span><img src="" alt="" width="" height=""/></a>
      <form class="newsLetter" action="index.html" method="post">
        <input type="hidden" name="action" value="newsLetter"/>
        <label for="email">
          <span class="titleAccent">Nieuwsbrief</span>
          <div class="textInput">
            <input type="email" name="email" id="email" placeholder="name@mail.com" required/>
          </div>
          <span class="validator"></span>
        </label>
        <input type="submit" name="submit" value="schrijf in" class="btn"/>
      </form>
      <div class="socialLinks">
          <h4>Follow us</h4>
        <ul>
          <li><a href="#"><span class="hide">Facebook</span></a></li>
          <li><a href="#"><span class="hide">Twitter</span></a></li>
          <li><a href="#"><span class="hide">Instagram</span></a></li>
        </ul>
      </div>
      <p class="copyWrite">&copy; <?php echo date("Y"); ?> Week van de mobiliteit</p>
  </div>
  </footer>
    <?php echo $js;?>
  </body>
</html>
