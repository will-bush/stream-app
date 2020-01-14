class StreamsController < ApplicationController

    def index
        streams = Stream.all
        render json: streams
    end

    def new
        stream = Stream.new
    end

    def create(user_id)
        Stream.create(user_id: user_id)
    end
end
