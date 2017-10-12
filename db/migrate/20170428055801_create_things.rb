class CreateThings < ActiveRecord::Migration
  def change
    create_table :things do |t|
      t.text :body

      t.timestamps null: false
    end
  end
end
