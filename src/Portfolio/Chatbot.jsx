import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Avatar,
  Tooltip,
  Fade,
  Zoom,
  Badge,
  LinearProgress,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Send,
  Close,
  Minimize,
  SmartToy,
  Mood,
  AttachFile,
  Mic,
  Stop,
  Download,
  Share,
  Delete,
  Restore,
  FileCopy,
  Settings,
  HelpOutline,
  ThumbUp,
  ThumbDown,
  KeyboardVoice,
  MoreVert,
  Email,
  ChatBubbleOutline,
  Code,
  Work,
  School,
  Person,
  Info,
  Build,
  CalendarToday,
  FilterNone,
  DarkMode,
  LightMode,
  VolumeUp,
  VolumeOff,
  Translate,
  Speed,
  History,
  Star,
  StarBorder,
  Save,
  Feedback,
  BugReport,
  TipsAndUpdates,
  Psychology,
  AutoAwesome,
  SmartToyOutlined,
  EmojiEmotions,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  InsertEmoticon
} from '@mui/icons-material';
import { data } from '../data.js';
import './Chatbot.css';

const Chatbot = ({ darkMode, onClose, portfolioData = data }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello! I'm ${portfolioData.hero.name.split(' ')[0]}'s AI assistant. 👋 I can tell you about skills, experience, and projects. What would you like to know?`,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      emoji: '👋'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [botPersonality, setBotPersonality] = useState('professional'); // professional, friendly, casual
  const [responseSpeed, setResponseSpeed] = useState(2); // 1-3 (slow to fast)
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [language, setLanguage] = useState('english');
  const [emojiMode, setEmojiMode] = useState(true);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Quick questions
  const quickQuestions = [
    { text: "What's your experience?", category: 'experience' },
    { text: "Tell me about your skills", category: 'skills' },
    { text: "Show me your projects", category: 'projects' },
    { text: "How can I contact you?", category: 'contact' },
    { text: "Are you available for work?", category: 'availability' },
    { text: "What technologies do you use?", category: 'technologies' },
    { text: "Tell me about yourself", category: 'about' },
    { text: "What's your education?", category: 'education' }
  ];

  // Bot personality responses
  const botResponses = {
    professional: {
      experience: `I have ${portfolioData.experience.length} years of experience in software development. My key roles include:
      • ${portfolioData.experience[0].role} at ${portfolioData.experience[0].company}
      • ${portfolioData.experience[1].role} at ${portfolioData.experience[1].company}
      • ${portfolioData.experience[2].role} at ${portfolioData.experience[2].company}
      
      I specialize in creating innovative web applications with modern technologies and best practices.`,

      skills: `My technical expertise includes:
      • Frontend: ${portfolioData.languages.map(lang => lang.name).join(', ')}
      • Backend: Node.js, Express, MongoDB, PostgreSQL
      • Tools & DevOps: Git, Docker, AWS, CI/CD, Kubernetes
      • Design Patterns & Architecture: MVC, Microservices, REST APIs
      
      I'm committed to writing clean, maintainable code and following industry best practices.`,

      projects: `Here are my featured projects:
      1. ${portfolioData.projects[0].title}: ${portfolioData.projects[0].description}
      2. ${portfolioData.projects[1].title}: ${portfolioData.projects[1].description}
      3. ${portfolioData.projects[2].title}: ${portfolioData.projects[2].description}
      
      Each project demonstrates modern development practices and problem-solving skills.`,

      contact: `You can reach me through multiple channels:
      • LinkedIn: ${portfolioData.socialLinks.find(s => s.icon === 'linkedin')?.href}
      • GitHub: ${portfolioData.socialLinks.find(s => s.icon === 'github')?.href}
      • Email: ${portfolioData.contact?.email || 'alex.johnson@example.com'}
      • Portfolio: ${window.location.origin}
      
      I typically respond within 24 hours and am open to networking opportunities.`,

      availability: `I'm currently available for:
      • Full-time positions
      • Contract work
      • Freelance projects
      • Technical consulting
      • Open-source collaborations
      
      Location: ${portfolioData.hero.location}
      Remote Work: Available
      Relocation: Open to opportunities`,

      technologies: `I work with a comprehensive tech stack:
      • Frontend: React, TypeScript, Material-UI, Tailwind CSS, Redux
      • Backend: Node.js, Express, Python, Django, FastAPI
      • Databases: MongoDB, PostgreSQL, Redis, MySQL
      • Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD
      • Testing: Jest, Cypress, React Testing Library
      • Tools: Git, Webpack, ESLint, Prettier, VS Code`,

      about: `I'm ${portfolioData.hero.name}, a passionate ${portfolioData.hero.title} with ${portfolioData.experience.length} years of experience. I specialize in building scalable web applications and solving complex technical challenges. My approach combines technical expertise with creative problem-solving to deliver exceptional results.`,

      education: `My educational background includes:
      • ${portfolioData.education?.[0]?.degree || "Bachelor's in Computer Science"}
      • ${portfolioData.education?.[0]?.school || "Stanford University"} (${portfolioData.education?.[0]?.year || "2015-2019"})
      • Specialization in Software Engineering and AI
      • Relevant coursework: Algorithms, Data Structures, Web Development, Machine Learning`
    },

    friendly: {
      experience: `Hey there! 😊 I've been developing software for ${portfolioData.experience.length} years. Here's my journey:
      • Worked as ${portfolioData.experience[0].role} at ${portfolioData.experience[0].company}
      • Then ${portfolioData.experience[1].role} at ${portfolioData.experience[1].company}
      • Currently ${portfolioData.experience[2].role} at ${portfolioData.experience[2].company}
      
      I love creating web apps that make people's lives easier!`,

      skills: `Here are the skills I'm most excited about! 🚀
      • Frontend magic: ${portfolioData.languages.map(lang => lang.name).join(', ')}
      • Backend stuff: Node.js, Express, MongoDB
      • Cool tools: Git, Docker, AWS
      
      I'm always learning new things and enjoy sharing what I know!`,

      contact: `Let's connect! 🤝
      • LinkedIn: ${portfolioData.socialLinks.find(s => s.icon === 'linkedin')?.href}
      • GitHub: ${portfolioData.socialLinks.find(s => s.icon === 'github')?.href}
      • Email me: alex.johnson@example.com
      
      Don't be shy - I'd love to hear from you!`,

      availability: `Yes! I'm open to new adventures! 🌟
      • Full-time roles
      • Contract work
      • Fun projects
      • Chatting about tech
      
      Based in ${portfolioData.hero.location} but love remote work!`
    },

    casual: {
      experience: `Yo! I've been coding for ${portfolioData.experience.length} years. Check it out:
      • ${portfolioData.experience[0].role} @ ${portfolioData.experience[0].company}
      • ${portfolioData.experience[1].role} @ ${portfolioData.experience[1].company}
      • ${portfolioData.experience[2].role} @ ${portfolioData.experience[2].company}
      
      Pretty cool, right? 😎`,

      skills: `Skills I rock with:
      • Frontend: ${portfolioData.languages.map(lang => lang.name).join(', ')}
      • Backend: Node, Express, Mongo
      • Tools: Git, Docker, AWS
      
      Basically, I make websites do cool things!`,

      contact: `Hit me up! 📱
      • LinkedIn: ${portfolioData.socialLinks.find(s => s.icon === 'linkedin')?.href}
      • GitHub: ${portfolioData.socialLinks.find(s => s.icon === 'github')?.href}
      • Email: alex@example.com
      
      Let's build something awesome!`
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        setTimeout(() => handleSendMessage(), 500);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        addMessage('bot', "Sorry, I couldn't catch that. Could you type it instead?");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Load chat history from localStorage
    const savedHistory = localStorage.getItem('chatbot_history');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Save chat history
    localStorage.setItem('chatbot_history', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (sender, text, emoji = null) => {
    const newMessage = {
      id: messages.length + 1,
      text: text,
      sender: sender,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      emoji: emoji
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = addMessage('user', inputText);

    // Save to history
    setChatHistory(prev => [...prev, {
      question: inputText,
      response: '',
      timestamp: new Date().toISOString()
    }]);

    setInputText('');
    setIsTyping(true);

    // Generate bot response
    setTimeout(() => {
      const response = generateBotResponse(inputText.toLowerCase());
      const botMessage = addMessage('bot', response.text, response.emoji);

      // Update history with response
      setChatHistory(prev => {
        const lastEntry = prev[prev.length - 1];
        if (lastEntry && !lastEntry.response) {
          lastEntry.response = response.text;
        }
        return [...prev];
      });

      setIsTyping(false);

      // Voice response if enabled
      if (voiceEnabled && response.text) {
        speakResponse(response.text);
      }
    }, 1000 + (4 - responseSpeed) * 500); // Speed affects typing delay

    inputRef.current?.focus();
  };

  const generateBotResponse = (userInput) => {
    let response = '';
    let emoji = null;
    const personality = botResponses[botPersonality];

    // Check for greetings
    if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
      const greetings = ["Hi there! 👋", "Hello! 😊", "Hey! Nice to meet you!", "Hi! How can I help?"];
      response = greetings[Math.floor(Math.random() * greetings.length)];
      emoji = '👋';
    }
    // Check for thanks
    else if (userInput.includes('thank') || userInput.includes('thanks')) {
      response = "You're welcome! 😊 Let me know if you need anything else.";
      emoji = '🙏';
    }
    // Check for help
    else if (userInput.includes('help')) {
      response = "I can help you with:\n• Experience and background\n• Technical skills\n• Projects and portfolio\n• Contact information\n• Availability and work\n• Education and certifications\n\nJust ask away! 🤖";
      emoji = '🤖';
    }
    // Check for keywords
    else if (userInput.includes('experience') || userInput.includes('work')) {
      response = personality.experience;
      emoji = '💼';
    } else if (userInput.includes('skill') || userInput.includes('tech')) {
      response = personality.skills;
      emoji = '⚡';
    } else if (userInput.includes('project') || userInput.includes('portfolio')) {
      response = personality.projects;
      emoji = '🚀';
    } else if (userInput.includes('contact') || userInput.includes('email') || userInput.includes('linkedin')) {
      response = personality.contact;
      emoji = '📧';
    } else if (userInput.includes('available') || userInput.includes('hire') || userInput.includes('work')) {
      response = personality.availability;
      emoji = '✅';
    } else if (userInput.includes('technology') || userInput.includes('stack') || userInput.includes('tool')) {
      response = personality.technologies;
      emoji = '🔧';
    } else if (userInput.includes('about') || userInput.includes('yourself')) {
      response = personality.about;
      emoji = '👤';
    } else if (userInput.includes('education') || userInput.includes('school') || userInput.includes('degree')) {
      response = personality.education;
      emoji = '🎓';
    } else if (userInput.includes('weather') || userInput.includes('time')) {
      response = `I'm focused on ${portfolioData.hero.name.split(' ')[0]}'s portfolio info. But I can tell you it's always a great time to discuss tech! 😄`;
      emoji = '⏰';
    } else {
      // Default response with suggestions
      const suggestions = [
        `I understand you're asking about "${userInput}". I can best help with portfolio-related questions. Try asking about experience, skills, or projects! 💡`,
        `Hmm, "${userInput}" is interesting! I specialize in portfolio information. Maybe ask about ${portfolioData.hero.name.split(' ')[0]}'s background or work? 🤔`,
        `That's a good question! For portfolio-specific info, try: "What projects have you done?" or "Tell me about your skills" 🎯`
      ];
      response = suggestions[Math.floor(Math.random() * suggestions.length)];
      emoji = '🤔';
    }

    return { text: response, emoji };
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text.replace(/[•\-\*]/g, ''); // Clean up for speech
      speech.rate = 1.0;
      speech.pitch = 1.0;
      speech.volume = 1.0;
      window.speechSynthesis.speak(speech);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      addMessage('bot', "Speech recognition is not supported in your browser. Please type your message.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputText(question.text);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: `Hello! I'm ${portfolioData.hero.name.split(' ')[0]}'s AI assistant. 👋 I can tell you about skills, experience, and projects. What would you like to know?`,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        emoji: '👋'
      }
    ]);
    setChatHistory([]);
    localStorage.removeItem('chatbot_history');
  };

  const copyChat = () => {
    const chatText = messages.map(m => `${m.sender === 'user' ? 'You' : 'Assistant'}: ${m.text}`).join('\n\n');
    navigator.clipboard.writeText(chatText);
    addMessage('bot', 'Chat copied to clipboard! 📋', '📋');
  };

  const exportChat = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      portfolio: portfolioData.hero.name,
      messages: messages
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-with-${portfolioData.hero.name.split(' ')[0]}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFeedback = (type) => {
    setCurrentFeedback(type);
    setFeedbackOpen(true);

    // Save feedback
    const feedbackData = {
      type: type,
      message: messages[messages.length - 2]?.text || '',
      response: messages[messages.length - 1]?.text || '',
      timestamp: new Date().toISOString()
    };

    const feedbacks = JSON.parse(localStorage.getItem('chatbot_feedback') || '[]');
    feedbacks.push(feedbackData);
    localStorage.setItem('chatbot_feedback', JSON.stringify(feedbacks));
  };

  const getPersonalityIcon = () => {
    switch (botPersonality) {
      case 'professional': return <Work fontSize="small" />;
      case 'friendly': return <SentimentSatisfied fontSize="small" />;
      case 'casual': return <EmojiEmotions fontSize="small" />;
      default: return <SmartToy fontSize="small" />;
    }
  };

  const getTypingIndicator = () => {
    const dots = ['.', '..', '...'];
    return `Thinking${dots[Math.floor(Date.now() / 500) % 3]}`;
  };

  if (isMinimized) {
    return (
      <Paper
        className={`chatbot-minimized glass ${darkMode ? 'dark-mode' : ''}`}
        onClick={() => setIsMinimized(false)}
        sx={{
          bgcolor: darkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.2s ease'
          }
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Badge
            color="primary"
            variant="dot"
            invisible={!isTyping}
            sx={{
              '& .MuiBadge-dot': {
                backgroundColor: '#4CAF50'
              }
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 40,
                height: 40,
                animation: isTyping ? 'pulse 1.5s infinite' : 'none'
              }}
            >
              <SmartToy />
            </Avatar>
          </Badge>
          <Box flex={1} minWidth={0}>
            <Typography variant="body2" fontWeight="bold" noWrap>
              {portfolioData.hero.name.split(' ')[0]}'s Assistant
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {isTyping ? 'Typing...' : 'Click to chat'}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        className={`chatbot-container glass ${darkMode ? 'dark-mode' : ''}`}
        sx={{
          bgcolor: darkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          width: { xs: 'calc(100vw - 30px)', sm: 'calc(100vw - 40px)', md: '500px' },
          height: { xs: 'calc(100vh - 100px)', sm: '750px' },
          maxHeight: '100vh',
          bottom: { xs: '70px', md: '10px' },
          right: { xs: '15px', md: '30px' },
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Box
          className="chatbot-header"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit'
          }}
        >
          <Box display="flex" alignItems="center" gap={2} flex={1}>
            <Badge
              color="success"
              variant="dot"
              invisible={!isTyping}
              sx={{
                '& .MuiBadge-dot': {
                  backgroundColor: '#4CAF50',
                  animation: 'pulse 1.5s infinite'
                }
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.dark',
                  width: 40,
                  height: 40,
                  animation: 'avatarFloat 3s ease-in-out infinite'
                }}
              >
                <SmartToy />
              </Avatar>
            </Badge>
            <Box flex={1} minWidth={0}>
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {portfolioData.hero.name.split(' ')[0]}'s Assistant
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="caption" sx={{ opacity: 0.8 }} noWrap>
                  {isTyping ? getTypingIndicator() : 'Online'}
                </Typography>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#4CAF50',
                    animation: 'pulse 2s infinite'
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box display="flex" gap={0.5}>
            <Tooltip title="Settings">
              <IconButton
                size="small"
                onClick={() => setSettingsOpen(true)}
                sx={{ color: 'white' }}
              >
                <Settings fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Minimize">
              <IconButton
                size="small"
                onClick={() => setIsMinimized(true)}
                sx={{ color: 'white' }}
              >
                <Minimize fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton
                size="small"
                onClick={onClose}
                sx={{ color: 'white' }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Body */}
        <Box
          className="chatbot-body"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Welcome Message for empty chat */}
          {messages.length === 1 && (
            <Fade in={true}>
              <Box
                className="welcome-message"
                sx={{
                  textAlign: 'center',
                  p: 3,
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  borderRadius: 2,
                  m: 2,
                  animation: 'welcomePulse 2s ease-in-out infinite alternate'
                }}
              >
                <SmartToy
                  sx={{
                    fontSize: 60,
                    mb: 2,
                    color: 'primary.main',
                    animation: 'avatarFloat 3s ease-in-out infinite'
                  }}
                />
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Hi! I'm your AI assistant 🤖
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ask me about {portfolioData.hero.name.split(' ')[0]}'s experience, skills, projects, or availability.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Personality:
                  </Typography>
                  <Chip
                    size="small"
                    icon={getPersonalityIcon()}
                    label={botPersonality.charAt(0).toUpperCase() + botPersonality.slice(1)}
                    sx={{ height: 24 }}
                  />
                </Box>
              </Box>
            </Fade>
          )}

          {/* Messages */}
          <Box
            className="chatbot-messages"
            sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            {messages.map((message) => (
              <Fade key={message.id} in={true}>
                <Box
                  className={`message ${message.sender === 'bot' ? 'message-bot' : 'message-user'}`}
                  sx={{
                    maxWidth: '85%',
                    p: 2,
                    borderRadius: 2,
                    position: 'relative',
                    animation: 'messageAppear 0.3s ease-out',
                    alignSelf: message.sender === 'bot' ? 'flex-start' : 'flex-end',
                    borderBottomLeftRadius: message.sender === 'bot' ? 4 : 16,
                    borderBottomRightRadius: message.sender === 'bot' ? 16 : 4,
                    background: message.sender === 'bot'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  {message.emoji && message.sender === 'bot' && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -10,
                        left: -10,
                        fontSize: '1.5rem'
                      }}
                    >
                      {message.emoji}
                    </Box>
                  )}

                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-line',
                      lineHeight: 1.5
                    }}
                  >
                    {message.text}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 1
                    }}
                  >
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {message.time}
                    </Typography>

                    {message.sender === 'bot' && messages.indexOf(message) === messages.length - 1 && (
                      <Box display="flex" gap={0.5}>
                        <Tooltip title="Helpful">
                          <IconButton
                            size="small"
                            onClick={() => handleFeedback('positive')}
                            sx={{ color: 'white', opacity: 0.7, '&:hover': { opacity: 1 } }}
                          >
                            <ThumbUp fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Not helpful">
                          <IconButton
                            size="small"
                            onClick={() => handleFeedback('negative')}
                            sx={{ color: 'white', opacity: 0.7, '&:hover': { opacity: 1 } }}
                          >
                            <ThumbDown fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Fade>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <Fade in={isTyping}>
                <Box
                  className="typing-indicator"
                  sx={{
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    borderRadius: 2,
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    width: 'fit-content'
                  }}
                >
                  {[1, 2, 3].map((dot) => (
                    <Box
                      key={dot}
                      className="typing-dot"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        animation: `typingBounce 1.4s infinite ease-in-out both ${dot * 0.16}s`
                      }}
                    />
                  ))}
                  <Typography variant="caption" color="text.secondary">
                    {getTypingIndicator()}
                  </Typography>
                </Box>
              </Fade>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Questions */}
          {!isTyping && messages.length > 0 && (
            <Box
              className="chatbot-quick-questions"
              sx={{
                p: 2,
                borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
              }}
            >
              <Typography variant="caption" fontWeight="medium" sx={{ mb: 1, display: 'block' }}>
                Quick Questions:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={0.5}>
                {quickQuestions.map((question, index) => (
                  <Chip
                    key={index}
                    label={question.text}
                    size="small"
                    icon={question.icon}
                    onClick={() => handleQuickQuestion(question)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      '&:hover': {
                        bgcolor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Input Area */}
          <Box
            className="chatbot-input-area"
            sx={{
              p: 0.1,
              borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              background: darkMode ? 'rgba(30,30,30,0.5)' : 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center', // keep all items in same row
              gap: 1
            }}
          >
            {/* Voice Input */}
            <Tooltip title={isListening ? "Stop listening" : "Voice input"}>
              <IconButton
                size="small"
                onClick={isListening ? stopListening : startListening}
                sx={{
                  color: isListening ? 'error.main' : 'inherit',
                  animation: isListening ? 'pulse 1.5s infinite' : 'none'
                }}
              >
                {isListening ? <Stop fontSize="small" /> : <Mic fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Text Input (takes all remaining space) */}
            <TextField
              inputRef={inputRef}
              className="chatbot-input"
              multiline
              maxRows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: 20,
                  background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
                  '& fieldset': { border: 'none' },
                  py: 1.2,
                  px: 2
                }
              }}
            />

            {/* More / Send Options */}
            <Tooltip title="More options">
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVert fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Send message">
              <IconButton
                size="small"
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  '&.Mui-disabled': { bgcolor: 'action.disabled' }
                }}
              >
                <Send fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Actions */}
          <Box
            className="chatbot-actions"
            sx={{
              p: 1,
              borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Button
              size="small"
              startIcon={<Delete fontSize="small" />}
              onClick={clearChat}
              variant="outlined"
              sx={{ borderRadius: 2, fontSize: '0.7rem' }}
            >
              Clear
            </Button>
            <Button
              size="small"
              startIcon={<FileCopy fontSize="small" />}
              onClick={copyChat}
              variant="outlined"
              sx={{ borderRadius: 2, fontSize: '0.7rem' }}
            >
              Copy
            </Button>
            <Button
              size="small"
              startIcon={<Download fontSize="small" />}
              onClick={exportChat}
              variant="outlined"
              sx={{ borderRadius: 2, fontSize: '0.7rem' }}
            >
              Export
            </Button>
            <Button
              size="small"
              startIcon={<Share fontSize="small" />}
              onClick={() => setFeedbackOpen(true)}
              variant="outlined"
              sx={{ borderRadius: 2, fontSize: '0.7rem' }}
            >
              Feedback
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Settings Dialog */}
      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        PaperProps={{
          sx: {
            background: darkMode
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: 3,
            minWidth: 300
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Settings />
            <Typography variant="h6">Assistant Settings</Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Personality Setting */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Personality
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {['professional', 'friendly', 'casual'].map((personality) => (
                  <Chip
                    key={personality}
                    label={personality.charAt(0).toUpperCase() + personality.slice(1)}
                    icon={getPersonalityIcon()}
                    onClick={() => setBotPersonality(personality)}
                    color={botPersonality === personality ? 'primary' : 'default'}
                    variant={botPersonality === personality ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>

            {/* Response Speed */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Response Speed
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Speed fontSize="small" />
                <Slider
                  value={responseSpeed}
                  onChange={(e, value) => setResponseSpeed(value)}
                  min={1}
                  max={3}
                  step={1}
                  marks={[
                    { value: 1, label: 'Slow' },
                    { value: 2, label: 'Normal' },
                    { value: 3, label: 'Fast' }
                  ]}
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            {/* Voice Settings */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Voice Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={voiceEnabled}
                    onChange={(e) => setVoiceEnabled(e.target.checked)}
                    icon={<VolumeOff fontSize="small" />}
                    checkedIcon={<VolumeUp fontSize="small" />}
                  />
                }
                label="Voice Responses"
              />
            </Box>

            {/* Emoji Mode */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Emoji Mode
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={emojiMode}
                    onChange={(e) => setEmojiMode(e.target.checked)}
                    icon={<SentimentNeutral fontSize="small" />}
                    checkedIcon={<InsertEmoticon fontSize="small" />}
                  />
                }
                label="Show Emojis"
              />
            </Box>

            {/* Statistics */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Chat Statistics
              </Typography>
              <Box display="flex" gap={2}>
                <Box textAlign="center">
                  <Typography variant="h6" color="primary">
                    {messages.length}
                  </Typography>
                  <Typography variant="caption">Messages</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" color="primary">
                    {chatHistory.length}
                  </Typography>
                  <Typography variant="caption">Questions</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" color="primary">
                    {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption">Today</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        maxWidth="xs"
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Feedback color="primary" />
            <Typography variant="h6">Feedback</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box textAlign="center" py={2}>
            {currentFeedback === 'positive' ? (
              <>
                <SentimentSatisfied sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
                <Typography variant="h6" gutterBottom color="success.main">
                  Thank you! 😊
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We're glad you found the response helpful!
                </Typography>
              </>
            ) : (
              <>
                <SentimentDissatisfied sx={{ fontSize: 60, color: '#f44336', mb: 2 }} />
                <Typography variant="h6" gutterBottom color="error.main">
                  We're sorry! 😔
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We'll work to improve our responses.
                </Typography>
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* More Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2
          }
        }}
      >
        <MenuItem onClick={() => { handleMenuClose(); setSettingsOpen(true); }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { handleMenuClose(); exportChat(); }}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export Chat</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { handleMenuClose(); copyChat(); }}>
          <ListItemIcon>
            <FileCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Chat</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => { handleMenuClose(); setFeedbackOpen(true); }}>
          <ListItemIcon>
            <Feedback fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Feedback</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { handleMenuClose(); }}>
          <ListItemIcon>
            <HelpOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText>Help & Tips</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Chatbot;