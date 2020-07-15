class BooksController < ApplicationController
    def index
      search = params[:search]
      data = URI.encode"https://www.googleapis.com/books/v1/volumes?q=#{search}"
      uri = URI.parse(data)
      response = Net::HTTP.get(uri)
      res = JSON.parse(response)
      @r = res['items']
      
    end

    

    private
  end