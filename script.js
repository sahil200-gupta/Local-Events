document.addEventListener('DOMContentLoaded', function () {
    // Sample event data
    const events = [
        {
            id: 1,
            title: "Summer Music Festival",
            date: "2023-07-15",
            time: "6:00 PM",
            location: "Central Park",
            category: "music",
            price: 45,
            description: "Join us for the biggest summer music festival featuring top artists from around the country. Food trucks and beverages will be available.",
            image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            title: "Art Exhibition: Modern Masters",
            date: "2023-07-20",
            time: "10:00 AM",
            location: "City Art Gallery",
            category: "art",
            price: 15,
            description: "Experience the works of contemporary artists pushing the boundaries of modern art. Guided tours available every hour.",
            image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            title: "Food Truck Fair",
            date: "2023-07-22",
            time: "12:00 PM",
            location: "Downtown Square",
            category: "food",
            price: 0,
            description: "Sample delicious foods from over 50 food trucks offering cuisines from around the world. Live music and family activities.",
            image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 4,
            title: "Charity Marathon",
            date: "2023-07-25",
            time: "7:00 AM",
            location: "Riverside Trail",
            category: "sports",
            price: 25,
            description: "Run for a cause! Participate in our annual charity marathon with routes for all skill levels. All proceeds go to local charities.",
            image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 5,
            title: "Jazz Night Under the Stars",
            date: "2023-07-28",
            time: "8:00 PM",
            location: "Rooftop Garden",
            category: "music",
            price: 30,
            description: "An intimate evening of smooth jazz performances with the city skyline as your backdrop. Dress code: Smart casual.",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 6,
            title: "Pottery Workshop",
            date: "2023-08-02",
            time: "2:00 PM",
            location: "Community Arts Center",
            category: "art",
            price: 40,
            description: "Learn the basics of pottery making in this hands-on workshop. All materials provided. Suitable for beginners.",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 7,
            title: "Wine Tasting Experience",
            date: "2023-08-05",
            time: "5:00 PM",
            location: "Vineyard Estate",
            category: "food",
            price: 50,
            description: "Sample exquisite local wines paired with artisanal cheeses. Learn about wine production from our expert sommeliers.",
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 8,
            title: "Beach Volleyball Tournament",
            date: "2023-08-10",
            time: "9:00 AM",
            location: "Sandy Shores Beach",
            category: "sports",
            price: 10,
            description: "Compete in our annual beach volleyball tournament or cheer on your favorite teams. Prizes for top performers.",
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    // DOM Elements
    const eventsContainer = document.getElementById('eventsContainer');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const modal = document.getElementById('eventModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    const searchInput = document.querySelector('.search-box input');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const fab = document.getElementById('fab');
    const addEventModal = document.getElementById('addEventModal');
    const addEventForm = document.getElementById('addEventForm');
    const closeAddEventModal = addEventModal.querySelector('.close-modal');

    // Display events on page load
    displayEvents(events);

    // Filter events by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            if (filter === 'all') {
                displayEvents(events);
            } else {
                const filteredEvents = events.filter(event => event.category === filter);
                displayEvents(filteredEvents);
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = events.filter(event =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
        displayEvents(filteredEvents);
    });

    // Display events function
    function displayEvents(eventsToDisplay) {
        eventsContainer.innerHTML = '';

        if (eventsToDisplay.length === 0) {
            eventsContainer.innerHTML = '<p class="no-events">No events found. Please try a different search or filter.</p>';
            return;
        }

        eventsToDisplay.forEach(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });

            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}">
                </div>
                <div class="event-info">
                    <div class="event-date">
                        <i class="far fa-calendar-alt"></i>
                        <span>${formattedDate} • ${event.time}</span>
                    </div>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-actions">
                        <span class="event-price">${event.price === 0 ? 'FREE' : '$' + event.price}</span>
                        <button class="view-details" data-id="${event.id}">View Details</button>
                    </div>
                </div>
            `;

            eventsContainer.appendChild(eventCard);
        });

        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = parseInt(e.target.getAttribute('data-id'));
                const selectedEvent = events.find(event => event.id === eventId);
                openModal(selectedEvent);
            });
        });
    }

    // Open modal with event details
    function openModal(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        modalBody.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="modal-event-image">
            <h2 class="modal-event-title">${event.title}</h2>
            <div class="modal-event-meta">
                <div>
                    <i class="far fa-calendar-alt"></i>
                    <span>${formattedDate}</span>
                </div>
                <div>
                    <i class="far fa-clock"></i>
                    <span>${event.time}</span>
                </div>
                <div>
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div>
                    <i class="fas fa-tag"></i>
                    <span>${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                </div>
            </div>
            <p class="modal-event-description">${event.description}</p>
            <div class="modal-event-actions">
                <span class="modal-event-price">${event.price === 0 ? 'FREE ENTRY' : '$' + event.price + ' PER TICKET'}</span>
                <button class="buy-ticket">Buy Ticket</button>
            </div>
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Add event listener to buy ticket button
        document.querySelector('.buy-ticket').addEventListener('click', () => {
            alert(`Thank you for your interest in "${event.title}"! Ticket purchasing functionality would be implemented here.`);
        });
    }

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === addEventModal) {
            addEventModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add event listener for FAB
    fab.addEventListener('click', () => {
        addEventModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close add event modal
    closeAddEventModal.addEventListener('click', () => {
        addEventModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Handle form submission
    addEventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Generate a unique ID (in a real app, this would come from a database)
        const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;

        // Create new event object
        const newEvent = {
            id: newId,
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            category: document.getElementById('eventCategory').value,
            price: parseInt(document.getElementById('eventPrice').value),
            description: document.getElementById('eventDescription').value,
            image: document.getElementById('eventImage').value || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        };

        // Add the new event to the beginning of the array
        events.unshift(newEvent);

        // Reset the form
        addEventForm.reset();

        // Close the modal
        addEventModal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Display the updated events list
        const activeFilter = document.querySelector('.filter-buttons button.active').getAttribute('data-filter');
        if (activeFilter === 'all' || activeFilter === newEvent.category) {
            displayEvents(events.filter(event => activeFilter === 'all' || event.category === activeFilter));
        }

        // Show success message
        alert('Event added successfully!');
    });
});
eventCard.innerHTML = `
    <div class="event-image">
        <img src="${event.image}" alt="${event.title}" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'; this.alt='Default event image'">
    </div>
    <!-- rest of your HTML -->
`;
image: `https://picsum.photos/500/300?random=${event.id}`