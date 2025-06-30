document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const isDarkMode = localStorage.getItem('theme') === 'dark';
  
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  themeToggle.addEventListener('click', function() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      const icon = mobileMenuButton.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Star Background
  const starBackground = document.getElementById('star-background');
  
  function generateStars() {
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    starBackground.innerHTML = '';
    
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star animate-pulse-subtle';
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      star.style.animationDuration = `${Math.random() * 4 + 2}s`;
      starBackground.appendChild(star);
    }
    
    // Generate meteors
// Generate meteors with proper angle
for (let i = 0; i < 4; i++) {
  const meteor = document.createElement('div');
  meteor.className = 'meteor animate-meteor';
  meteor.style.width = `${(Math.random() * 2 + 1) * 50}px`;
  meteor.style.height = `${(Math.random() * 2 + 1) * 2}px`;
  meteor.style.left = `${Math.random() * 100}%`;
  meteor.style.top = `${Math.random() * 20}%`;
  meteor.style.transform = 'rotate(215deg)'; // Add this line
  meteor.style.animationDelay = `${Math.random() * 15}s`;
  meteor.style.animationDuration = `${Math.random() * 3 + 3}s`;
  starBackground.appendChild(meteor);
}
  }
  
  generateStars();
  window.addEventListener('resize', generateStars);

  // Skills Filter
  const skillCategories = document.querySelectorAll('.skill-category');
  const skillsGrid = document.querySelector('.skills-grid');
  
  const skills = [
    // Languages
    { name: "Dart", category: "languages", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg" },
    { name: "Python", category: "languages", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
    { name: "Java", category: "languages", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
    { name: "C++", category: "languages", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
    { name: "JavaScript", category: "languages", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
    // Frameworks
    { name: "Flutter", category: "frameworks", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" },
    { name: "Django", category: "frameworks", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg" },
    { name: "Firebase", category: "frameworks", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" },
    // CS Fundamentals
    { name: "Data Structures", category: "fundamentals", icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png" },
    { name: "Algorithms", category: "fundamentals", icon: "https://cdn-icons-png.flaticon.com/512/2103/2103657.png" },
    { name: "DBMS", category: "fundamentals", icon: "https://cdn-icons-png.flaticon.com/512/2772/2772128.png" },
    { name: "OOP", category: "fundamentals", icon: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png" },
    { name: "Operating Systems", category: "fundamentals", icon: "https://cdn-icons-png.flaticon.com/512/3767/3767086.png" },
    { name: "Computer Architecture", category: "fundamentals", icon: "https://cdn-icons-png.flaticon.com/512/1322/1322156.png" },
    // Tools
    { name: "Git/GitHub", category: "tools", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
    { name: "VS Code", category: "tools", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" },
    { name: "Android Studio", category: "tools", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/androidstudio/androidstudio-original.svg" },
    { name: "PostgreSQL", category: "tools", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
    { name: "SQLite", category: "tools", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg" },
    { name: "Supabase", category: "tools", icon: "https://supabase.com/favicon.ico" }
  ];
  
  function renderSkills(category = 'all') {
    skillsGrid.innerHTML = '';
    const filteredSkills = category === 'all' 
      ? skills 
      : skills.filter(skill => skill.category === category);
    
    filteredSkills.forEach(skill => {
      const skillCard = document.createElement('div');
      skillCard.className = 'skill-card';
      skillCard.innerHTML = `
        <div class="skill-icon">
          <img src="${skill.icon}" alt="${skill.name}" onerror="this.onerror=null;this.src='https://cdn-icons-png.flaticon.com/512/3767/3767084.png'">
        </div>
        <div class="skill-name">${skill.name}</div>
      `;
      skillsGrid.appendChild(skillCard);
    });
  }
  
  skillCategories.forEach(button => {
    button.addEventListener('click', function() {
      skillCategories.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      renderSkills(this.dataset.category);
    });
  });
  
  // Initial render
  renderSkills();

  // Projects
  const projectsGrid = document.querySelector('.projects-grid');
  
  const projects = [
    {
      id: 1,
      title: "Mess App with Firebase",
      description: "Role-based food ordering system with QR payments and admin dashboard.",
      tags: ["Flutter", "Firebase", "NoSQL", "UPI Payments"],
      githubUrl: "https://github.com/pardhu-423141/mess_app",
      type: "mobile"
    },
    {
      id: 2,
      title: "Fair Graph Algorithms",
      description: "Research on multi-weight edge graphs with scalarized cost functions at IIT Ropar.",
      tags: ["Graph Theory", "Algorithms", "Research"],
      githubUrl: "https://github.com/VSathveek/Fair-graph-based-algorithms",
      type: "research"
    },
    {
      id: 3,
      title: "Personal Vault App",
      description: "Secure document storage with Google Drive integration and role-based access. (Not listed in github)",
      tags: ["Flutter", "Firebase", "Google Drive API"],
      githubUrl: "#",
      type: "mobile"
    },
    {
      id: 4,
      title: "ToDo Management Website",
      description: "Task management system with analytics, file attachments and notifications.",
      tags: ["Django", "JavaScript", "SQLite"],
      githubUrl: "https://github.com/VSathveek/ToDo",
      type: "web"
    },
    {
      id: 5,
      title: "Attendance App",
      description: "Excel-based attendance tracking system with reporting features.",
      tags: ["Flutter", "Local Storage"],
      githubUrl: "https://github.com/VSathveek/Attendance-App",
      type: "mobile"
    },
    {
      id: 6,
      title: "Empathetic AI Model",
      description: "RoBERTa-based emotion detection model (anger, joy, fear, sadness).",
      tags: ["NLP", "Machine Learning", "Python"],
      githubUrl: "https://github.com/VSathveek/empathetic_ai_model",
      type: "research"
    }
  ];
  
  function renderProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card card-hover';
      
      // Determine placeholder based on project type
      let placeholderClass = '';
      let placeholderIcon = '';
      let placeholderText = '';
      
      switch(project.type) {
        case 'mobile':
          placeholderClass = 'bg-blue-50';
          placeholderIcon = '📱';
          placeholderText = 'Mobile App';
          break;
        case 'web':
          placeholderClass = 'bg-green-50';
          placeholderIcon = '🌐';
          placeholderText = 'Web App';
          break;
        case 'research':
          placeholderClass = 'bg-purple-50';
          placeholderIcon = '🔬';
          placeholderText = 'Research Project';
          break;
        default:
          placeholderClass = 'bg-gray-50';
          placeholderIcon = '💻';
          placeholderText = 'Project';
      }
      
      projectCard.innerHTML = `
        <div class="project-image">
          <div class="project-placeholder ${placeholderClass}">
            <div class="text-5xl mb-3">${placeholderIcon}</div>
            <span class="font-medium text-sm">${placeholderText}</span>
          </div>
        </div>
        <div class="project-content">
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      `;
      
      projectsGrid.appendChild(projectCard);
    });
  }
  
  renderProjects();

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  const submitText = document.getElementById('submit-text');
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    submitText.textContent = 'Sending...';
    
    const formData = new FormData(this);
    formData.append('_subject', 'New message from your portfolio');
    formData.append('_template', 'box');
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/sathveekvaranasi@gmail.com', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        showToast('Message sent!', 'Thank you! I\'ll respond within 24 hours.', 'success');
        contactForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      showToast('Error', 'Failed to send. Please email me directly at sathveekvaranasi@gmail.com', 'error');
    } finally {
      submitText.textContent = 'Send Message';
    }
  });
  
  // Toast Notification
  function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <div class="toast-content">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }
});