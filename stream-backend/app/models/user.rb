class User < ApplicationRecord
    has_many :entries, :through => :streams
end
