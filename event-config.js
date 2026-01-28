// Event Configuration System
// Manages different events/views for the website

const EVENTS = {
    'birthday-2025': {
        id: 'birthday-2025',
        name: '22nd Birthday',
        date: 'August 19, 2025',
        theme: 'pink',
        title: "Mandy Nguyen's World",
        subtitle: 'Happy 22nd Birthday Mandy!',
        emoji: '🎂',
        description: 'Hi Mandy! This is a little special website made just for you. I hope you enjoy using it!',
        colorScheme: {
            primary: '#ff69b4',
            secondary: '#ffb6c1',
            dark: '#c71585',
            background: '#fff0f5'
        }
    },
    'anniversary-2026': {
        id: 'anniversary-2026',
        name: 'Anniversary',
        date: 'February 14, 2026',
        theme: 'blue-pink',
        title: "Mandy & Brandon's Anniversary",
        subtitle: 'Happy Anniversary!',
        emoji: '💕',
        description: 'Celebrating our special day together!',
        colorScheme: {
            primary: '#4169E1', // Royal blue
            secondary: '#ff69b4', // Pink
            dark: '#1E3A8A', // Dark blue
            background: '#E6F2FF', // Light blue
            accent: '#FFB6C1' // Light pink
        }
    }
};

// Get current event from URL parameter or default to birthday-2025
function getCurrentEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event') || localStorage.getItem('currentEvent') || 'birthday-2025';
    return EVENTS[eventId] || EVENTS['birthday-2025'];
}

// Set current event
function setCurrentEvent(eventId) {
    localStorage.setItem('currentEvent', eventId);
    const url = new URL(window.location);
    url.searchParams.set('event', eventId);
    window.location.href = url.toString();
}

// Get event-specific URL for a page
function getEventUrl(page, eventId = null) {
    const event = eventId || getCurrentEvent().id;
    return `${page}?event=${event}`;
}
