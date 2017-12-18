module OpenTriviaDB
  class Question
    attr_reader :text
    attr_accessor :correct_answer, :incorrect_answers

    def self.build(props)
      question = new(text: props["question"])
      question.correct_answer    = Answer.new(text: props["correct_answer"], correct: true)
      question.incorrect_answers = Answer.build_list(props["incorrect_answers"], correct: false)
      question
    end

    def initialize(text:)
      @text = text
    end

    def answers
      @answers ||= (incorrect_answers + [correct_answer]).shuffle
    end

    def answers_with_letters
      letters = %w(A B C D E F G H I J)
      answers.each { |answer| answer.letter = letters.shift }
    end
  end
end
