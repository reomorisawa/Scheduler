class ChangeTimeToThing < ActiveRecord::Migration
  def up
    change_column :things, :time, :string
  end

  def down
    change_column :things, :time, :integer
  end
end
