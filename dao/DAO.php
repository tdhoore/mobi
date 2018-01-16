<?php
class DAO {
  private static $dbHost = "localhost";
  private static $dbName = "ma3_18_auto";
  private static $dbUser = "root";
  private static $dbPass = "root";
  private static $sharedPDO;

  protected $pdo;

  function __construct() {
    if(empty(self::$sharedPDO)) {
      //check for localhost
      if(!self::isLocalHost()) {
        //if not local use online details
        self::$dbHost = "";
        self::$dbName = "ma3_18_auto";
        self::$dbUser = "";
        self::$dbPass = "";
      }
  
      self::$sharedPDO = new PDO("mysql:host=" . self::$dbHost . ";dbname=" . self::$dbName, self::$dbUser, self::$dbPass);
      self::$sharedPDO->exec("SET CHARACTER SET utf8");
      self::$sharedPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      self::$sharedPDO->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }
    $this->pdo = &self::$sharedPDO;
  }
  
  private static function isLocalHost() {
    return in_array($_SERVER['REMOTE_ADDR'], array("127.0.0.1", "::1", "localhost"));
  }

  private static function getSanitized($input, $validInputs, $errorMessage) {
    $input = strtolower($input);
    if(!in_array($input, $validInputs)) {
      throw new Exception($errorMessage);
    }
    return $input;
  }

  static function getSanitizedColumnName($input) {
    $sanitized = preg_replace('/[^\w-]/', '', $input);
    if(strlen($sanitized) == 0) {
      throw new Exception('invalid column name: ' . $input);
    }
    return $sanitized;
  }

  static function getSanitizedComparator($input = '=') {
    $validInputs = array('=', '>', '<', '>=', '<=', '!=', 'like');
    return DAO::getSanitized($input, $validInputs, 'invalid comparator: ' . $input . ', valid options are: ' . implode(', ', $validInputs));
  }

  static function getSanitizedFunction($input) {
    $validInputs = array('time', 'date');
    return DAO::getSanitized($input, $validInputs, 'invalid function: ' . $input . ', valid options are: ' . implode(', ', $validInputs));
  }
}
