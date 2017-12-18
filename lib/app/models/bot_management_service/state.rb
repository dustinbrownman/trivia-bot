class BotManagementService
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
end
