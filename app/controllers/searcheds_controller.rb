class SearchedsController < ApplicationController
  def index
    search = params[:search]
    @searched = Article.where(book_title: "#{search}")
  end
end