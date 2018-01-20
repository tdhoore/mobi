<form action="index.php" method="post">
  <fieldset>
    <legend>test</legend>
    <label for="test">
      <span>naam</span>
      <input type="text" name="test" placeholder="test" id="test" required/>
      <span class="validator"></span>
    </label>
    <label for="select">
      <span>dropDown</span>
        <select name="test" id="select">
          <option value="1">option1</option>
          <option value="2">option2</option>
          <option value="3">option3</option>
          <option value="4">option4</option>
          <option value="5">option5</option>
        </select>
        <div class="customDropDown">
      </div>
    </label>
    <p class="validationComplete"></p>
    <input type="submit" name="submit" value="send"/>
  </fieldset>
</form>
