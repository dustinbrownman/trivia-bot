require 'net/http'
require 'uri'
require 'json'

class BotManagementService
  attr_reader :state

  def initialize(state)
    @state = State.new(state)
  end

  def process
    if state.context["need_new_question"]
      AskMe.call(state)
    end
    state
  end

  class State
    attr_reader :state_hash

    def initialize(state_hash)
      @state_hash = state_hash
    end

    def intents
      state_hash["intents"]
    end

    def entities
      state_hash["entities"]
    end

    def input
      state_hash["input"]
    end

    def output
      state_hash["output"]
    end

    def text
      output["text"]
    end

    def context
      state_hash["context"]
    end
  end

  class AskMe
    attr_reader :state

    def initialize(state)
      @state = state
    end

    def self.call(state)
      new(state).call
    end

    def call
      question_props = JSON.parse(fetch_question)["results"].first

      puts question_props

      # some service that fetches questions
      question = question_props["question"]
      correct_answer = { answer: question_props["correct_answer"], correct: true }
      incorrect_answers = question_props["incorrect_answers"].map { |answer| { answer: answer, correct: false } }

      answers = incorrect_answers.push(correct_answer).shuffle

      state.text << question

      letters = %w(A B C D E F G H I J K L)
      answers.each_with_index do |answer, index|
        answer[:letter] = letters[index]
      end

      state.text << answers.map { |answer| "#{answer[:letter]}) #{answer[:answer]}" }.join("\n")

      state.context.merge!({
        ready_for_answer: true,
        need_new_question: false,
        question: question,
        correct_answer: { letter: correct_answer[:letter] }
      })

      state
    end

    def fetch_question(options: { amount: 1, difficulty: "medium", type: "multiple", category: 9 })
      path = "https://opentdb.com/api.php"
      query_params = URI.encode_www_form(options)

      path += "?#{query_params}" unless query_params.empty?
      uri = URI.parse(path)

      Net::HTTP::get(uri)
    end
  end
end
