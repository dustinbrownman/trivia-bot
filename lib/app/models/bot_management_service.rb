require_relative "bot_management_service/state"
require_relative "bot_management_service/ask_me"

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
end
