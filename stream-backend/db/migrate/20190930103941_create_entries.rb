class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.string :title
      t.string :content
      t.string :image_url
      t.string :feels
      t.integer :date
      t.boolean :is_professional?
      t.references :stream, null: false, foreign_key: true

      t.timestamps
    end
  end
end
