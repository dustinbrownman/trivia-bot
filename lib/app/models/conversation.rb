require 'net/http'
require 'uri'
require 'json'
require "dotenv/load"

class Conversation
  attr_reader :username, :password, :version

  def initialize(username:, password:, version: "2017-05-26")
    @username = username
    @password = password
    @version = version
  end

  def message(workspace_id, text:, context: {})
    path = "#{base_uri}/workspaces/#{workspace_id}/message?version=#{version}"
    body = {
      "input" => { "text" => text },
      "context" => context
    }

    uri = URI.parse(path)
    request = Net::HTTP::Post.new(uri)

    request.basic_auth(username, password)
    request.content_type = "application/json"
    request.body = JSON.dump(body)

    req_options = {
      use_ssl: uri.scheme == "https",
    }

    Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
  end

  def base_uri
    "https://gateway.watsonplatform.net/conversation/api/v1"
  end
end
