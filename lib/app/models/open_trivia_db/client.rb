require 'net/http'
require 'uri'
require 'json'

module OpenTriviaDB
  class Client
    def self.fetch(options = {})
      new.fetch(options)
    end

    def fetch(amount: 1, type: "multiple", category: 9)
      options = { amount: amount, type: type, category: category }
      options.reject! { |_key, value| value.nil? }

      puts options
      response = JSON.parse(get(options))
      response["results"]
    end

    def base_uri
      "https://opentdb.com/api.php"
    end

    private

    def get(query = {})
      path = base_uri
      query_params = URI.encode_www_form(query)

      path += "?#{query_params}" unless query_params.empty?
      uri = URI.parse(path)

      Net::HTTP::get(uri)
    end
  end
end
