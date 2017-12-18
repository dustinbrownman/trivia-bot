module OpenTriviaDB
  class Answer
    attr_reader :text, :correct
    attr_accessor :letter

    def initialize(text:, correct:)
      @text = text
      @correct = correct
    end

    def self.build_list(answers, correct:)
      Array(answers).map do |answer|
        new(text: answer, correct: correct)
      end
    end

    def correct?
      correct
    end

    def to_h
      { text: text, correct: correct, letter: letter }
    end
  end
end
