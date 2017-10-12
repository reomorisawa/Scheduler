class AddDayToThing < ActiveRecord::Migration
  def change
    add_column :things, :day, :string
    add_column :things, :user_id, :integer
  end
end
