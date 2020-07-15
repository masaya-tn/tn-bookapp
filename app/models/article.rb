class Article < ApplicationRecord
  extend OrderAsSpecified
  belongs_to :user
  has_many :likes, dependent: :destroy
end
