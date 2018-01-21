<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Week van de mobiliteit 2018</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php echo $css;?>
  </head>
  <body>
  <header>
    <h1><span>Week van de mobiliteit</span></h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Over de week</a></li>
        <li><a href="#">Nieuws</a></li>
        <li><a href="#">Zelf iets organiseren?</a></li>
        <li><a href="#" class="btn">Ontdek de acties</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <?php echo $content; ?>
  </main>
  <footer>
    <form class="newsLetter" action="index.html" method="post">
      <input type="hidden" name="action" value="newsLetter"/>
      <label for="email">
        <span>Nieuwsbrief</span>
        <input type="email" name="email" id="email" placeholder="name@mail.com"/>
      </label>
    </form>
    <p class="copyWrite">&copy; <?php echo date("Y"); ?> Week van de mobiliteit</p>
    <div class="socialLinks">
        <h3>Follow us</h3>
      <ul>
        <li><a href="#"><span>Facebook</span></a></li>
        <li><a href="#"><span>Twitter</span></a></li>
        <li><a href="#"><span>Instagram</span></a></li>
      </ul>
    </div>
  </footer>
    <?php echo $js;?>
  </body>
</html>
