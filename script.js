let currentCard = null; 
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');
const muteIcon = document.getElementById('muteIcon');
const profileCard = document.querySelector('.profile-card');
const profilePhoto = document.querySelector('.profile-photo');

profileCard.addEventListener('mousemove', (e) => {
  const { offsetWidth, offsetHeight } = profileCard;
  const rect = profileCard.getBoundingClientRect();
  const x = e.clientX - rect.left; 
  const y = e.clientY - rect.top;  

  
  const centerX = offsetWidth / 2;
  const centerY = offsetHeight / 2;

  
  const deltaX = (x - centerX) / centerX; 
  const deltaY = (y - centerY) / centerY; 

  
  const tiltX = deltaY * 10; 
  const tiltY = -deltaX * 10; 

  
  profileCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`; 
  profilePhoto.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});


profileCard.addEventListener('mouseleave', () => {
  profileCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'; 
  profilePhoto.style.transform = 'rotateX(0deg) rotateY(0deg)';
});


muteButton.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play(); 
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up'); 
    } else {
        backgroundMusic.pause(); 
        muteIcon.classList.remove('fa-volume-up'); 
        muteIcon.classList.add('fa-volume-mute');
    }
});
const playerCardData = {
  Steam: {
      imageUrl: 'images/steam.png', 
      description: 'Welcome to my Steam profile! Feel free to add me, but no VAC bans.',
      buttonText: 'Steam',
      buttonLink: 'https://steamcommunity.com/profiles/76561198839159403'
  },
  Instagram: {
      imageUrl: 'images/insta.png', 
      description: '',
      buttonText: 'Instagram',
      buttonLink: 'https://www.instagram.com/zorixn_/'
  }
};

function typeEffect(text, delay) {
    let index = 0;

    const type = () => {
        if (index < text.length) {
            document.title = text.slice(0, index + 1); 
            index++;
            setTimeout(type, delay); 
        } else {
            setTimeout(remove, 3000);
        }
    };

    const remove = () => {
        if (index > 1) {
            document.title = text.slice(0, index - 1); 
            index--;
            setTimeout(remove, delay); 
        } else {
            setTimeout(() => typeEffect(text, delay), 1000); 
        }
    };

    type(); 
}

typeEffect("@Zøяì", 300); 

document.getElementById('startView').addEventListener('click', function() {
  const overlay = document.querySelector('.overlay');
  const profileContainer = document.getElementById('profileContainer');

  
  overlay.classList.add('hide'); 

  
  setTimeout(() => {
      overlay.style.display = 'none'; 
  }, 500); 

  this.style.display = 'none'; 

  
  profileContainer.style.display = 'block'; 
  setTimeout(() => {
      profileContainer.style.opacity = '1'; 
  }, 10); 

  const backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.volume = 0.3; 
  backgroundMusic.play();

  setTimeout(() => {
      profileContainer.classList.add('show'); 
  }, 10); 
});

const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.icon').forEach(button => {
    button.addEventListener('mouseenter', function() {
        const url = this.getAttribute('data-url');
        tooltip.textContent = url; 
        tooltip.style.display = 'block'; 
        const rect = this.getBoundingClientRect(); 
        tooltip.style.left = `${rect.left + window.scrollX}px`; 
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`; 
        tooltip.style.opacity = 1; 

    });

    button.addEventListener('mouseleave', function() {
        tooltip.style.opacity = 0; 
        setTimeout(() => {
            tooltip.style.display = 'none'; 
        }, 300); 

    });

    button.addEventListener('click', function() {
        const iconId = Number(this.getAttribute('data-iconId'));
        let platform = '';

        switch (iconId) {
            case 0:
                platform = 'Steam';
                break;
            case 1:
                platform = 'Tellonym';
                break;
            case 2:
                platform = 'Instagram';
                break;
            case 3:
                platform = 'RiotGames';
                break;
            default:
                console.error('No platform found for iconId:', iconId);
                return;
        }

        const data = playerCardData[platform];
        if (data) {
            window.open(data.buttonLink, '_blank'); 
        } else {
            console.error(`No data found for platform: ${platform}`);
        }
    });
});