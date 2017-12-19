# TriviaBot

A simple conversation bot that can quiz users on a variety of topics.

https://watson-trivia-bot.herokuapp.com/

__Powered by__

- [IBM Watson Conversation API](https://www.ibm.com/watson/services/conversation)
- [Open Trivia Database](https://opentdb.com/)
- Built using [this React + Sinatra example](https://github.com/alanbsmith/react-sinatra-example)

## Local development
* Install Ruby dependencies: `$ bundle install`
* Install JS dependencies: `$ yarn`
* Fire up a dev server: `$ yarn dev`
* Visit `http://localhost:8080` in your browser

(Refer to the React + Sinatra example repo for more details on what is happening behind the scenes)

#### Watson config

You'll need to set environment variables in the `.env` file with your Watson Conversation credentials.

```
CONVERSATION_USERNAME
CONVERSATION_PASSWORD
CONVERSATION_WORKSPACE_ID
CONVERSATION_BASE_URI
```

## PRODUCTION BUILD

- run `$ yarn build`
- run `ruby lib/app.rb` (We're using Puma by default)
