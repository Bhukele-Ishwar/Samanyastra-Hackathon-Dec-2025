import React, { useState, useEffect, useRef } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fab,
  Fade,
  Zoom,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  GitHub,
  LinkedIn,
  Twitter,
  Instagram,
  LocationOn,
  Code,
  ArrowUpward,
  Send,
  Close,
  Minimize,
  Message,
  SmartToy,
  Person,
  Info,
  WorkOutline,
  SchoolOutlined,
  Build,
  Email,
  ChatBubbleOutline,
  ExpandLess,
  ExpandMore,
  ThumbUp,
  ThumbDown,
  HelpOutline,
  Settings,
  MoreVert,
  AttachFile,
  Mood,
  KeyboardVoice,
  Mic,
  Stop,
  Download,
  Share,
  CalendarToday,
  Delete,
  Restore,
  FileCopy,
  FilterNone
} from '@mui/icons-material';
import { data } from '../data.js';
import Chatbot from './Chatbot';
import './style.css';

function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: isMobile ? '2.5rem' : '3.5rem',
      },
      h2: {
        fontWeight: 700,
        fontSize: isMobile ? '2rem' : '2.5rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: isMobile ? '1.5rem' : '1.75rem',
      },
      body1: {
        fontSize: isMobile ? '0.875rem' : '1rem',
      },
    },
    shape: {
      borderRadius: 12,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['home', 'about', 'skills', 'experience', 'projects'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'github': return <GitHub />;
      case 'linkedin': return <LinkedIn />;
      case 'twitter': return <Twitter />;
      case 'instagram': return <Instagram />;
      default: return null;
    }
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  // Render Chatbot Toggle Button
  const renderChatbotToggle = () => (
    <Fab
      className="chatbot-toggle-btn"
      onClick={toggleChatbot}
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        '&:hover': {
          bgcolor: 'primary.dark',
        },
        position: 'fixed',
        bottom: { xs: 20, sm: 25, md: 30 }, // distance from bottom
        left: { xs: 20, sm: 25, md: 30 },   // distance from left
        zIndex: 1050,                        // above most content but below ScrollTop
        width: { xs: 50, sm: 56, md: 60 },
        height: { xs: 50, sm: 56, md: 60 },
        minWidth: { xs: 50, sm: 56, md: 60 },
        boxShadow: 3,
      }}
    >
      {showChatbot ? <Close /> : <SmartToy />}
    </Fab>
  );

  // Render Chatbot
  const renderChatbot = () => {
    if (showChatbot) {
      return (
        <Chatbot
          darkMode={darkMode}
          onClose={() => setShowChatbot(false)}
          portfolioData={data}
        />
      );
    }
    return null;
  };

  const renderNavigation = () => (
    <Box className="nav-menu" sx={{
      backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      padding: { xs: '0.5rem 0', md: '1rem 0' }
    }}>
      <Box className="nav-container">
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '1rem', md: '1.25rem' } }}
        >
          {data.hero.name
            .split(' ')
            .map(n => n[0].toUpperCase())
            .join('')}
        </Typography>

        {!isMobile ? (
          <Box className="nav-links">
            {['Home', 'About', 'Skills', 'Experience', 'Projects'].map((item) => (
              <Button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-link"
                sx={{
                  color: activeSection === item.toLowerCase() ? 'primary.main' : 'text.primary',
                  backgroundColor: activeSection === item.toLowerCase() ?
                    (darkMode ? 'rgba(144, 202, 249, 0.1)' : 'rgba(25, 118, 210, 0.1)') : 'transparent',
                  fontSize: { xs: '0.8rem', md: '0.875rem' },
                  padding: { xs: '0.5rem', md: '0.5rem 1rem' },
                  mx: { xs: 0.5, md: 0 }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        ) : (
          <IconButton onClick={() => setMobileMenuOpen(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        )}

        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit" className="theme-toggle">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: { width: { xs: 250, sm: 280 } }
      }}
    >
      <Box sx={{ width: '100%', p: 2 }}>
        <List>
          {['Home', 'About', 'Skills', 'Experience', 'Projects'].map((item) => (
            <ListItem
              key={item}
              button
              onClick={() => scrollToSection(item.toLowerCase())}
              selected={activeSection === item.toLowerCase()}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }
              }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  fontSize: '1rem',
                  fontWeight: activeSection === item.toLowerCase() ? 'bold' : 'normal'
                }}
              />
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem
            button
            onClick={toggleChatbot}
            sx={{
              py: 1.5,
              bgcolor: 'primary.light',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white'
              }
            }}
          >
            <ListItemText
              primary="Chat with AI Assistant"
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
            <SmartToy fontSize="small" />
          </ListItem>
          <ListItem
            button
            onClick={() => setDarkMode(!darkMode)}
            sx={{ py: 1.5 }}
          >
            <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

 const renderHero = () => (
  <Box id="home" className={`hero-section ${darkMode ? 'dark-mode' : ''}`}>
    <Container maxWidth="lg" className="portfolio-container" sx={{ py: { xs: 4, md: 8 } }}>
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        alignItems="center"
        direction={{ xs: 'column-reverse', md: 'row' }}
      >
        <Grid
          item
          xs={12}
          md={6}
          className="fade-in"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Typography
            variant="h1"
            className="hero-title"
            gutterBottom
            sx={{
              fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              mb: { xs: 2, md: 3 },
            }}
          >
            {data.hero.name}
          </Typography>

          <Typography
            variant="h4"
            className="hero-subtitle"
            color="primary"
            gutterBottom
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem', lg: '1.75rem' },
              mb: { xs: 2, md: 3 },
            }}
          >
            {data.hero.title}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mb={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
            <LocationOn color="action" />
            <Typography variant="body1" color="text.secondary">
              {data.hero.location}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            className="hero-description"
            paragraph
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              mb: { xs: 3, md: 4 },
            }}
          >
            {data.hero.description}
          </Typography>

          <Box display="flex" gap={2} mt={3} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }}>
            {/* Download CV Button */}
            <Button
              variant="contained"
              size="small"
              href={data.cvLink} // Replace with your CV link
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                },
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                px: { xs: 2, md: 3 },
                py: { xs: 0.5, md: 1 },
              }}
            >
              Download CV
            </Button>

            {/* Ask AI Button */}
            <Button
              variant="text"
              size="large"
              startIcon={<SmartToy />}
              onClick={toggleChatbot}
              sx={{
                ml: { xs: 0, sm: 1 },
                width: { xs: '100%', sm: 'auto' },
                fontSize: { xs: '0.875rem', md: '1rem' },
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.5 },
              }}
            >
              Ask AI
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          className="fade-in delay-1"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box
            className="profile-image-container"
            sx={{
              borderColor: 'primary.main',
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              aspectRatio: '1',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid',
              mx: 'auto',
            }}
          >
            <Box
              component="img"
              src={data.profileImage}
              alt="Profile"
              className="profile-image"
              sx={{
                backgroundColor: darkMode ? '#333' : '#eee',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
);


  const renderAbout = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeParagraph, setActiveParagraph] = useState(0);

    // Function to handle paragraph expansion
    const handleParagraphClick = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
      setActiveParagraph(index);
    };

    return (
      <Box
        id="about"
        className="about-section"
        sx={{
          py: { xs: 8, sm: 10, md: 12, lg: 15 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated background elements */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <Container maxWidth="lg" className="portfolio-container">
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            sx={{
              mb: { xs: 4, md: 6 },
              position: 'relative',
              '&:hover': {
                '&::after': {
                  width: '100%'
                }
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
                transition: 'width 0.5s ease'
              }
            }}
          >
            About Me
          </Typography>

          <Grid container spacing={{ xs: 2, md: 4 }}>
            {data.about.paragraphs.map((paragraph, index) => (
              <Grid
                item
                xs={12}
                md={6}
                key={index}
                className={`fade-in delay-${index}`}
                sx={{ position: 'relative' }}
              >
                {/* Interactive card container */}
                <Paper
                  elevation={hoveredIndex === index ? 8 : 2}
                  onClick={() => handleParagraphClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    p: { xs: 2, md: 3 },
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                    position: 'relative',
                    overflow: 'hidden',
                    background: hoveredIndex === index
                      ? 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)'
                      : 'background.paper',
                    borderLeft: expandedIndex === index
                      ? '4px solid #2196f3'
                      : '4px solid transparent',
                    '&:hover': {
                      borderLeft: '4px solid #64b5f6',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #2196f3, #64b5f6, #2196f3)',
                      transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease'
                    }
                  }}
                >
                  {/* Paragraph number indicator */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: activeParagraph === index ? '#2196f3' : 'grey.300',
                      color: activeParagraph === index ? 'white' : 'grey.700',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {index + 1}
                  </Box>

                  <Typography
                    variant="body1"
                    className="about-text"
                    sx={{
                      fontSize: { xs: '0.9rem', md: '1rem', lg: '1.1rem' },
                      lineHeight: 1,
                      mb: { xs: 2, md: 3 },
                      position: 'relative',
                      zIndex: 1,
                      opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    {paragraph}
                  </Typography>



                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Progress indicator for paragraphs */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 6,
            gap: 1
          }}>
            {data.about.paragraphs.map((_, index) => (
              <Box
                key={index}
                onClick={() => setActiveParagraph(index)}
                sx={{
                  width: activeParagraph === index ? 40 : 12,
                  height: 6,
                  backgroundColor: activeParagraph === index ? '#2196f3' : 'grey.300',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: activeParagraph === index ? '#1976d2' : 'grey.400',
                    transform: 'scaleY(1.5)'
                  }
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    );
  };
  const renderSkills = () => (
    <Box
      id="skills"
      className="skills-section"
      sx={{ py: { xs: 8, sm: 10, md: 12, lg: 15 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg" className="portfolio-container">
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          sx={{
            mb: { xs: 4, md: 6 },
            position: 'relative',
            '&:hover': {
              '&::after': { width: '100%' },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
              transition: 'width 0.5s ease',
            },
          }}
        >
          Skills & Technologies
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {data.languages.map((skill, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              key={index}
              className={`fade-in delay-${index % 3}`}
            >
              <Paper
                className="skill-card"
                elevation={2}
                sx={{
                  p: { xs: 1.5, sm: 2, md: 2.5 },
                  minHeight: { xs: 120, sm: 140, md: 160 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  className="skill-icon"
                  sx={{
                    width: { xs: 50, sm: 60, md: 70 },
                    height: { xs: 50, sm: 60, md: 70 },
                    mb: { xs: 1, sm: 1.5, md: 2 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {skill.img ? (
                    <Box
                      component="img"
                      src={skill.img}
                      alt={skill.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = ''; // optional fallback
                      }}
                    />
                  ) : (
                    <Code sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'primary.main' }} />
                  )}
                </Box>

                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.05rem' },
                    fontWeight: 600,
                  }}
                >
                  {skill.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

const renderExperience = () => (
  <Box
    id="experience"
    className="experience-section"
    sx={{ py: { xs: 8, sm: 10, md: 12, lg: 15 } }}
  >
    <Container maxWidth="lg" className="portfolio-container">
      <Typography
        variant="h2"
        gutterBottom
        align="center"
        sx={{
          mb: { xs: 4, md: 6 },
          position: 'relative',
          '&:hover': {
            '&::after': { width: '100%' },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
            transition: 'width 0.5s ease',
          },
        }}
      >
        Experience
      </Typography>

      <Box className="experience-timeline" sx={{ position: 'relative' }}>
        {data.experience.map((exp, index) => (
          <Box
            key={index}
            className="experience-item"
            sx={{
              mb: { xs: 3, md: 4 },
              position: 'relative',
              opacity: 0,
              transform: 'translateY(30px)',
              animation: `fadeSlideUp 0.6s ease forwards`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            {/* Timeline Dot */}
            <Box
              className="experience-dot"
              sx={{
                position: 'absolute',
                top: 20,
                left: { xs: 16, md: 24 },
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                transform: 'scale(0)',
                animation: `dotScale 0.6s ease forwards`,
                animationDelay: `${index * 0.2 + 0.1}s`,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.3)',
                },
              }}
            />

            {/* Experience Card */}
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, md: 3 },
                ml: { xs: 5, md: 7 },
                borderRadius: 2,
                width: { xs: 'calc(100% - 40px)', md: 'calc(100% - 0px)' },
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* Role + Period row */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                      mb: 0.5,
                      transition: 'color 0.3s',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {exp.role}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      mb: 1.5,
                      fontWeight: 600,
                      transition: 'color 0.3s',
                      '&:hover': { color: 'secondary.main' },
                    }}
                  >
                    {exp.company}
                  </Typography>
                </Box>
                <Chip
                  label={exp.period}
                  sx={{
                    bgcolor: darkMode ? 'primary.dark' : 'primary.light',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    py: 0.5,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 3,
                    },
                  }}
                />
              </Box>

              {/* Description */}
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  mb: 1.5,
                  lineHeight: 1.6,
                }}
              >
                {exp.description}
              </Typography>

              {/* Skills */}
              <Box sx={{ mt: 2 }}>
                {exp.skills.map((skill, skillIndex) => (
                  <Chip
                    key={skillIndex}
                    label={skill}
                    size="small"
                    sx={{
                      mr: 1,
                      mb: 1,
                      fontSize: { xs: '0.7rem', md: '0.75rem' },
                      px: 1,
                      py: 0.5,
                      opacity: 0,
                      transform: 'translateY(10px)',
                      animation: `fadeSlideUp 0.5s ease forwards`,
                      animationDelay: `${index * 0.2 + 0.3 + skillIndex * 0.1}s`,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 2,
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>

    {/* CSS Animations */}
    <style>
      {`
        @keyframes fadeSlideUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes dotScale {
          to { transform: scale(1); }
        }
      `}
    </style>
  </Box>
);

  const renderProjects = () => (
    <Box
      id="projects"
      className="projects-section"
      sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg" className="portfolio-container">
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          sx={{
            mb: { xs: 4, md: 6 },
            position: 'relative',
            '&:hover': {
              '&::after': {
                width: '100%'
              }
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
              transition: 'width 0.5s ease'
            }
          }}
        >
          Projects
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {data.projects.map((project, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                elevation={3}
                sx={{
                  width: 500,
                  height: 450,
                  borderRadius: 1,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 12,
                  },
                }}
              >
                {/* Top: Project Image */}
                <Box
                  component="img"
                  src={project.image}
                  alt={project.title}
                  sx={{
                    width: '100%',
                    height: 250,
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                />

                {/* Bottom: Info */}
                <CardContent
                  sx={{
                    flex: 1,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {project.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.85rem', lineHeight: 1.4 }}
                    >
                      {project.description.length > 120
                        ? project.description.slice(0, 120) + '...'
                        : project.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {(project.tech || []).map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          px: 1,
                          bgcolor: 'gray.200',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );


  const renderSocialLinks = () => (
    <Box sx={{ py: { xs: 6, md: 8, lg: 10 }, textAlign: 'center' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', md: '1.75rem', lg: '2rem' },
          mb: 3
        }}
      >
        Let's Connect
      </Typography>
      <Box className="social-links" sx={{ mt: 3, mb: 4 }}>
        {data.socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.icon}
          >
            <Paper
              className="social-icon"
              elevation={3}
              sx={{
                width: { xs: 50, sm: 55, md: 60 },
                height: { xs: 50, sm: 55, md: 60 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  bgcolor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              {getSocialIcon(link.icon)}
            </Paper>
          </a>
        ))}
      </Box>
      <Button
        variant="contained"
        size="large"
        startIcon={<SmartToy />}
        onClick={toggleChatbot}
        sx={{
          mt: 3,
          fontSize: { xs: '0.9rem', md: '1rem' },
          px: { xs: 4, md: 5 },
          py: { xs: 1.5, md: 1.75 },
          borderRadius: 2
        }}
      >
        Chat with AI Assistant
      </Button>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 3,
          fontSize: { xs: '0.8rem', md: '0.875rem' },
          maxWidth: '600px',
          mx: 'auto',
          px: 2
        }}
      >
        Ask questions about my work, skills, or availability. I'm always open to discussing new opportunities and creative projects.
      </Typography>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={darkMode ? 'dark-mode' : ''}>
        {renderNavigation()}
        {renderMobileMenu()}

        {renderHero()}
        {renderAbout()}
        {renderSkills()}
        {renderExperience()}
        {renderProjects()}
        {renderSocialLinks()}
        {/* Chatbot Components */}
        {renderChatbotToggle()}
        {renderChatbot()}

        {/* Scroll to Top Button */}
        <Zoom in={showScrollTop}>
          <Fab
            color="primary"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: { xs: 20, sm: 30, md: 40 }, // distance from bottom
              right: { xs: 20, sm: 30, md: 40 },  // distance from right
              zIndex: 1100,                       // above most elements
              width: { xs: 45, sm: 50, md: 56 },
              height: { xs: 45, sm: 50, md: 56 },
              minWidth: { xs: 45, sm: 50, md: 56 },
              boxShadow: 3
            }}
          >
            <ArrowUpward />
          </Fab>
        </Zoom>

      </Box>
    </ThemeProvider>
  );
}

export default Portfolio;



