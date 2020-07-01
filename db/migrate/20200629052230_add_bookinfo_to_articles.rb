class AddBookinfoToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :book_title, :string
    add_column :articles, :author, :string
    add_column :articles, :image_url, :string
  end
end
