// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Download handler
function handleDownload() {
  // Create download link for BootstrapperNew.bat
  const link = document.createElement('a');
  link.href = '/BootstrapperNew.bat';
  link.download = 'BootstrapperNew.bat';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Visual feedback for download
  const btn = document.querySelector('.btn-download');
  const downloadText = btn.querySelector('.download-text span');
  const originalText = downloadText.textContent;
  const downloadIcon = btn.querySelector('.download-icon svg');
  
  downloadText.textContent = 'Preparing...';
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.7';
  btn.style.transform = 'scale(0.98)';
  downloadIcon.style.animation = 'spin 1s linear infinite';
  
  setTimeout(() => {
    downloadText.textContent = 'Starting Download...';
    
    setTimeout(() => {
      downloadText.textContent = originalText;
      btn.style.pointerEvents = 'auto';
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1)';
      downloadIcon.style.animation = 'none';
      
      // Show download success message
      showNotification('bootstrappernew.bat downloaded! Check your downloads folder.', 'success');
    }, 2000);
  }, 1500);
}

// Executor functionality
function executeScript() {
  const codeInput = document.querySelector('.code-input');
  const consoleOutput = document.getElementById('console-output');
  const code = codeInput.value.trim();
  
  if (!code) {
    addConsoleMessage('No script to execute', 'warning');
    return;
  }
  
  addConsoleMessage('Executing script...', 'info');
  
  // Simulate script execution
  setTimeout(() => {
    // Simple script parsing for demo
    if (code.includes('print(')) {
      const printMatches = code.match(/print\(['"`]([^'"`]*)['"`]\)/g);
      if (printMatches) {
        printMatches.forEach(match => {
          const message = match.match(/print\(['"`]([^'"`]*)['"`]\)/)[1];
          addConsoleMessage(message, 'success');
        });
      }
    } else if (code.includes('game:GetService')) {
      addConsoleMessage('Service accessed successfully', 'success');
    } else if (code.includes('loadstring')) {
      addConsoleMessage('External script loaded and executed', 'success');
    } else {
      addConsoleMessage('Script executed successfully', 'success');
    }
    
    addConsoleMessage(`Execution completed in ${Math.random() * 100 + 50}ms`, 'info');
  }, 1000 + Math.random() * 1000);
}

function clearScript() {
  const codeInput = document.querySelector('.code-input');
  codeInput.value = '';
  addConsoleMessage('Script cleared', 'info');
}

function injectScript() {
  const codeInput = document.querySelector('.code-input');
  const code = codeInput.value.trim();
  
  if (!code) {
    addConsoleMessage('No script to inject', 'warning');
    return;
  }
  
  addConsoleMessage('Injecting script into Roblox...', 'info');
  
  setTimeout(() => {
    addConsoleMessage('Script injected successfully!', 'success');
    addConsoleMessage('Ready for execution in game', 'info');
  }, 1500);
}

function clearConsole() {
  const consoleOutput = document.getElementById('console-output');
  consoleOutput.innerHTML = '';
  addConsoleMessage('Console cleared', 'info');
}

function addConsoleMessage(message, type = 'info') {
  const consoleOutput = document.getElementById('console-output');
  const timestamp = new Date().toLocaleTimeString();
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = `[${timestamp}] ${message}`;
  
  consoleOutput.appendChild(line);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? 'var(--success)' : 'var(--primary)',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    zIndex: '10000',
    transform: 'translateX(400px)',
    transition: 'transform 0.3s ease',
    fontWeight: '500'
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    navbar.style.borderBottomColor = 'rgba(139, 92, 246, 0.2)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    navbar.style.borderBottomColor = 'rgba(139, 92, 246, 0.1)';
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all feature cards and support cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feature-card, .support-card, .download-card');
  cards.forEach(card => {
    observer.observe(card);
  });
});

// Particle effect for hero background
function createParticles() {
  const hero = document.querySelector('.hero');
  
  // Return early if hero element doesn't exist (e.g., on other pages)
  if (!hero) {
    return;
  }
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    Object.assign(particle.style, {
      position: 'absolute',
      width: '2px',
      height: '2px',
      background: 'var(--primary)',
      borderRadius: '50%',
      opacity: Math.random() * 0.5 + 0.1,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animation: `float ${Math.random() * 10 + 10}s linear infinite`,
      pointerEvents: 'none'
    });
    
    hero.appendChild(particle);
  }
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Make handleDownload globally available
window.handleDownload = handleDownload;
window.executeScript = executeScript;
window.clearScript = clearScript;
window.injectScript = injectScript;
window.clearConsole = clearConsole;