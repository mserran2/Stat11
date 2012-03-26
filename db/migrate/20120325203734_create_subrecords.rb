class CreateSubrecords < ActiveRecord::Migration
  def change
    create_table :subrecords do |t|
      t.integer :survey_id
      t.string :division
      t.integer :total_read
      t.integer :complete_read
      t.integer :satisfaction

      t.timestamps
    end
    add_index :subrecords, :survey_id
  end
end
