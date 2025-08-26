import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/components/providers/AuthProvider'
import { ChatService } from '@/lib/ai/ChatService'
import { formatDateTime } from '@/lib/utils'
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  MicrophoneIcon,
  StopIcon
} from '@heroicons/react/24/outline'

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  persona?: string
  intent?: string
  confidence?: number
  didYouKnow?: string
}

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
  initialMessage?: string
}

export default function ChatBot({ isOpen, onClose, initialMessage }: ChatBotProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [chatService] = useState(() => new ChatService())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Initialize chat with welcome message
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'bot',
        content: `🙏 Namaste ${user?.full_name?.split(' ')[0] || 'friend'}! I'm your eYogi AI assistant. I'm here to help you with questions about our courses, Gurukuls, enrollment, and anything related to your learning journey. How can I assist you today?`,
        timestamp: new Date(),
        persona: 'student',
        intent: 'greeting'
      }
      setMessages([welcomeMessage])
      
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, user])

  useEffect(() => {
    if (initialMessage && isOpen) {
      handleSendMessage(initialMessage)
    }
  }, [initialMessage, isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputMessage.trim()
    if (!messageText) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      // Process message through AI service
      const response = await chatService.processMessage(messageText, user)
      
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: response.message,
        timestamp: new Date(),
        persona: response.persona,
        intent: response.intent,
        confidence: response.confidence,
        didYouKnow: response.didYouKnow
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error processing message:', error)
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'bot',
        content: 'I apologize, but I encountered an error processing your message. Please try again or contact our support team for assistance.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      if (isListening) {
        recognition.stop()
      } else {
        recognition.start()
      }
    } else {
      alert('Speech recognition is not supported in your browser.')
    }
  }

  const clearChat = () => {
    setMessages([])
    const welcomeMessage: ChatMessage = {
      id: 'welcome-new',
      type: 'bot',
      content: `🙏 Chat cleared! I'm ready to help you with any questions about eYogi Gurukul. What would you like to know?`,
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }

  const quickQuestions = [
    "What courses are available for my age?",
    "How do I enroll in a course?",
    "What is the fee structure?",
    "Tell me about Hinduism Gurukul",
    "How do I get certificates?",
    "What are the different Gurukuls?",
    "Tell me an interesting fact",
    "Share some Sanskrit wisdom"
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Chat Header */}
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">eYogi AI Assistant</h3>
                <p className="text-orange-100 text-sm">Your personal learning companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-white hover:bg-white/10"
              >
                <ArrowPathIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat Messages */}
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}>
                    {message.type === 'user' ? (
                      <UserIcon className="h-4 w-4 text-white" />
                    ) : (
                      <SparklesIcon className="h-4 w-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.type === 'bot' ? (
                        <div dangerouslySetInnerHTML={{ 
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
                            .replace(/\n/g, '<br>')
                        }} />
                      ) : (
                        message.content
                      )}
                    </div>
                    
                    {/* AI Metadata */}
                    {message.type === 'bot' && (message.persona || message.intent) && (
                      <div className="mt-2 pt-2 border-t border-gray-200 flex items-center space-x-2">
                        {message.persona && (
                          <Badge variant="info" className="text-xs">
                            {message.persona}
                          </Badge>
                        )}
                        {message.intent && (
                          <Badge variant="default" className="text-xs">
                            {message.intent}
                          </Badge>
                        )}
                        {message.confidence && (
                          <span className="text-xs text-gray-500">
                            {Math.round(message.confidence * 100)}% confident
                          </span>
                        )}
                      </div>
                    )}

                    {/* Did You Know Section */}
                    {message.didYouKnow && (
                      <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <LightBulbIcon className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-semibold text-purple-900">Did You Know?</span>
                        </div>
                        <p className="text-sm text-purple-800">{message.didYouKnow}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timestamp */}
                <div className={`mt-1 text-xs text-gray-500 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {formatDateTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <SparklesIcon className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <QuestionMarkCircleIcon className="h-4 w-4 mr-2" />
                Quick Questions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="text-left p-3 text-sm bg-gray-50 hover:bg-orange-50 hover:text-orange-700 rounded-lg transition-colors border border-gray-200 hover:border-orange-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about eYogi Gurukul..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                  isListening 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                {isListening ? (
                  <StopIcon className="h-4 w-4" />
                ) : (
                  <MicrophoneIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-3"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span className="flex items-center space-x-1">
              <ComputerDesktopIcon className="h-3 w-3" />
              <span>AI-powered by eYogi</span>
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}