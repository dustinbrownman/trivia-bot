require 'sinatra'
require 'sinatra/namespace'
require 'sinatra/json'
require 'sinatra/cross_origin'
require 'json'

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
    response = "You just said: #{json['text']}"

    json text: response, source: "received"
  end

  # For pre-flight check
  options "*" do
    response.headers["Allow"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
    response.headers["Access-Control-Allow-Origin"] = "*"
    200
  end
end
