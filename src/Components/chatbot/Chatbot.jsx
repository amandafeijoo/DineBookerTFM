// Components/Chatbot.jsx
import React from 'react'
import { RequestContext, Text } from '@botonic/react'

export default class extends React.Component {
  static contextType = RequestContext

  render() {
    return (
      <Text>¡Hola, humano!</Text>
    )
  }
}