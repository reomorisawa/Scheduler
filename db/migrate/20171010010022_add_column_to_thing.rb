class AddColumnToThing < ActiveRecord::Migration
  def change
    add_column :things, :title, :string
    add_column :things, :icon, :string
    add_column :things, :time, :integer
    add_column :things, :place, :string
  end
end
