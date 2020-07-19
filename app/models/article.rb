class Article < ApplicationRecord
  extend OrderAsSpecified
  validates :title, presence: true
  validates :content, presence: true
  belongs_to :user
  has_many :likes, dependent: :destroy
end
