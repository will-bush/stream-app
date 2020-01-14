class EntriesController < ApplicationController
    
    def index
        entries = Entry.all 
        render json: entries
    end

    def new
        entry = Entry.new
    end

    def create
        entry = Entry.create(entry_params)
        render json: entry
    end

    def destroy
        entry = Entry.delete(params[:id])
    end

    private
def entry_params
    params.require(:entry).permit(:title, :content, :date, :stream_id, :user_id, :feels, :image_url, :is_professional)
end

end