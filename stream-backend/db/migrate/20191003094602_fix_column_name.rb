class FixColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :entries, :is_professional?, :is_professional
  end
end
