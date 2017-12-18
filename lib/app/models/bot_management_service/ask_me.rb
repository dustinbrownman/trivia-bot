require_relative "../open_trivia_db"

class BotManagementService
  class AskMe
    attr_reader :state

    def initialize(state)
      @state = state
      puts category_id_map.keys
    end

    def self.call(state)
      new(state).call
    end

    def call
      question_props = fetch_questions(category: current_category).first

      question = OpenTriviaDB::Question.build(question_props)

      correct_answer = question.correct_answer

      state.text << question.text
      state.text << question.answers_with_letters.map { |answer| "#{answer.letter}) #{answer.text}" }.join("\n")

      state.context.merge!({
        pending_answer: true,
        need_new_question: false,
        question: question,
        correct_answer: question.correct_answer.to_h
      })

      state
    end

    def current_category
      category_entity = state.entities.detect { |entity| entity["entity"] == "categories" }

      if category_entity
        state.context["current_category"] = category_id_map.fetch(category_entity["value"], 9)
      end

      state.context["current_category"]
    end

    def options
      question_options = {}

      category_entity = state.entities.detect { |entity| entity["entity"] == "categories" }

      if category_entity
        category_id = category_id_map.fetch(category_entity["value"], 9)

        question_options.merge!({ category: category_id })
      end

      question_options
    end

    def fetch_questions(options = {})
      OpenTriviaDB::Client.fetch(options)
    end

    def category_id_map
      {
        "computers" => 18,
        "films"     => 11,
        "general"   =>  9,
        "geography" => 22,
        "history"   => 23,
        "math"      => 19,
        "music"     => 12,
        "science"   => 17,
        "sports"    => 21
      }
    end
  end
end
