class ArticlesController < ApplicationController
  def index 
    @articles = Article.all
  end

  def new
    @article = current_user.articles.build
    @book_title = params[:book_title]
    @authors = params[:authors]
    @image_url = params[:image_url]
  end

  def create
    @article = current_user.articles.build(article_params)
    if @article.save
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    @article = Article.find(params[:id])
  end

  def edit
    @article = current_user.articles.find(params[:id])
  end

  def update
    @article = current_user.articles.find(params[:id])
    if @article.update(article_params)
      redirect_to article_path(@article), notice: '更新できました'
    else
      flash.now[:error] = '更新できませんでした'
      render :edit
    end
  end

  def destroy
    article = current_user.articles.find(params[:id])
    article.destroy!
    redirect_to root_path, notice: '削除しました'
  end

  private
  def article_params
    params.require(:article).permit(:title, :content)
  end
end