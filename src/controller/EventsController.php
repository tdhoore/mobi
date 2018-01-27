<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'EventDAO.php';

class EventsController extends Controller {

  private $eventDAO;

  function __construct() {
    $this->eventDAO = new EventDAO();
  }

  public function index() {
    $conditions = array();

    //example: search on organiser, with certain end date + time
    $conditions[] = array(
      'field' => 'organiser',
      'comparator' => 'like',
      'value' => 'brussel'
    );
    $conditions[] = array(
      'field' => 'end',
      'comparator' => '=',
      'value' => '2018-09-16 18:00:00'
    );

    $events = $this->eventDAO->search($conditions);
    $this->set('events', $events);
  }

  public function activiteiten() {
    if($this->isAjax) {
      if($_POST['action'] === 'getFilter') {
        $this->getSuggestionsByFilter($_POST);
      } else if ($_POST['action'] === 'getActivities') {
        $this->getActivitiesByFilter($_POST);
      }

      exit();
    }
  }

  public function activiteitdetail() {

  }

  private function getSuggestionsByFilter($data){
    $inputName = $data['inputName'];

    $conditions = array();
    $result = array();

    $type = '';

    //go through the used filters and look what is already used
    $conditions = $this->getConditions(json_decode($data['usedFilters']));

    //search for things by name, city, postcode
    if(isset($data['search'])) {
      $type = 'title';

      $conditions[] = array(
        'field' => 'title',
        'comparator' => 'like',
        'value' => $data['search']
      );

    } else if(isset($data['location'])) {
      if(is_numeric($data['location'])) {
        $type = 'postal';
      } else {
        $type = 'city';
      }

      $conditions[] = array(
        'field' => $type,
        'comparator' => 'like',
        'value' => $data['location']
      );
    }

    $events = $this->eventDAO->search($conditions, true);

    $values = array();

    foreach ($events as $event) {
      $result[] = array(
        'type' => $type,
        'value' => $event[$type]
      );
    }

    $result = $this->multi_unique($result);

    echo json_encode(array(
      'inputName' => $inputName,
      'options' => $result));
  }

  private function multi_unique($src){
     $output = array_map("unserialize",
     array_unique(array_map("serialize", $src)));
     return $output;
  }

  private function getConditions($data) {
    $conditions = array();

    if(isset($data)){
        foreach ($data as $value) {
          $conditions[] = array(
            'field' => $value->type,
            'comparator' => '=',
            'value' => $value->value
          );
        }
      }

    return $conditions;
  }

  private function getActivitiesByFilter($data) {
    $filters = json_decode($data['filters']);

    $conditions = array();
    $result = array();

    foreach ($filters as $value) {
      $conditions[] = array(
        'field' => $value->type,
        'comparator' => '=',
        'value' => $value->value
      );
    }

    $events = $this->eventDAO->search($conditions);

    foreach ($events as $event) {
      $result[] = array(
        'id' => $event['id'],
        'title' => $event['title'],
        'date' => $event['start'],
        'tags' => $event['tags'],
        'imageSource' => $event['mainImageSource'],
        'imageAlt' => $event['mainImageAlt']
      );
    }

    echo json_encode(array_slice($result, $data['startId'], $data['endId']));
  }

}
