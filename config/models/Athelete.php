<?php
class Athelete extends ActiveRecord\Model
{
    static $table_name ='atheletes';
    static $primary_key = 'id';

    static $belongs_to = array(
        array('race_category','class_name' => 'Race_Category','foreign_key' => 'race_category_id'),
        array('race','class_name' => 'Race_Date', 'foreign_key' => 'race_date_id')
    );
}
