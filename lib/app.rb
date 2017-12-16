require 'sinatra'
require 'sinatra/namespace'
require 'sinatra/json'
require 'sinatra/cross_origin'
require 'json'
require 'dotenv/load'
require 'pry'

require_relative "app/models/conversation"
require_relative "app/models/bot_management_service"

configure do
  set :server, :puma
  enable :cross_origin
end

set :root, 'lib/app'

get '/' do
  render :html, :index
end

namespace "/api" do
  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  post '/messages' do
    json = JSON.parse(request.body.read)

    workspace_id = ENV["CONVERSATION_WORKSPACE_ID"]

    conversation = Conversation.new(
      username: ENV["CONVERSATION_USERNAME"],
      password: ENV["CONVERSATION_PASSWORD"]
    )

    response = conversation.message(workspace_id, {
      text: json["text"],
      context: json.fetch("context", {})
    })
    response = JSON.parse(response.body)

    state = BotManagementService.new(response).process

    json text: state.output["text"], source: "received", context: state.context
  end

  # For pre-flight check
  options "*" do
    response.headers["Allow"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
    response.headers["Access-Control-Allow-Origin"] = "*"
    200
  end
end
