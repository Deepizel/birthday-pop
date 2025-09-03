import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';

interface BirthdayMessage {
  id: number;
  text: string;
  hasHeart: boolean;
}

@Component({
  selector: 'app-hubby-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hubby-message.component.html',
  styleUrl: './hubby-message.component.css'
})
export class HubbyMessageComponent implements OnInit, OnDestroy {
  audio: HTMLAudioElement | null = null;
  confettiInterval: any;
  slideshowInterval: any;
  showCloseButton = false;
  
  // Slideshow properties
  currentImageIndex = 0;
  images: string[] = [];
  totalImages = 14; // Number of images in assets folder

  messages: BirthdayMessage[] = [
    {
      id: 1,
      text: "Happy birthday to the love of my life, my best friend, my greatest supporter, and the most beautiful woman in the world — inside and out. Today, as I celebrate you, I find myself overflowing with gratitude, not just because it's your special day, but because every single day of my life is special with you in it.",
      hasHeart: true
    },

    {
      id: 2,
      text: "From the very beginning, you have been my anchor through life's storms and my sunshine through the brightest days. You've stood with me through the highs and the lows, never once wavering, never once giving up on me. Your patience, your understanding, and your quiet strength have carried me in ways words can hardly describe.",
      hasHeart: true
    },
    {
      id: 3,
      text: "I look at our two wonderful boys, and I see your heart in them. I see the love, the sacrifice, the prayers, and the endless care you pour into raising them. You are not just a mother; you are a nurturer, a guide, and a living example of what love and devotion should look like.",
      hasHeart: true
    },
    {
      id: 4,
      text: "For me, you have been everything. You are my biggest cheerleader, the one who believes in me even when I struggle to believe in myself. You remind me of my strength when I feel weak, and you constantly push me to reach higher, to dream bigger, and to never give up.",
      hasHeart: true
    },
    {
      id: 5,
      text: "Thank you for your love — steady, deep, and unwavering. Thank you for your patience — the kind that only comes from a heart full of grace. Thank you for your prayers — I know that many blessings in my life are because you prayed them into existence.",
      hasHeart: true
    },
    {
      id: 6,
      text: "You are my safe place, my partner, my best friend, my confidant, my queen. You are the song in my heart and the reason I smile even on tough days. Life with you is a gift I never want to take for granted. I love you more than words could ever capture.",
      hasHeart: true
    },
    {
      id: 7,
      text: "So today, my love, I celebrate you. I celebrate your life, your strength, your beauty, your kindness, and the blessing that you are to me and to everyone who knows you. May this new year bring you joy beyond measure, peace in every area of your life, and blessings so abundant that your heart overflows with gratitude.",
      hasHeart: true
    },

  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeImages();
    this.startMusic();
    this.startConfetti();
    this.startSlideshow();
    this.showCloseButton = true;
  }

  ngOnDestroy() {
    this.stopMusic();
    this.stopConfetti();
    this.stopSlideshow();
  }

  initializeImages() {
    // Create array of image paths for slideshow
    for (let i = 1; i <= this.totalImages; i++) {
      this.images.push(`assets/${i}..jpg`);
    }
  }

  startSlideshow() {
    // Change image every 3 seconds
    this.slideshowInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 3000);
  }

  stopSlideshow() {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }

  onImageError(event: any) {
    // Handle image loading error by hiding the image
    event.target.style.display = 'none';
  }

  goBack() {
    this.router.navigate(['/']);
  }

  startMusic() {
    try {
      // Load the fireboy.mp3 file
      this.audio = new Audio('assets/fireboy.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.5;
      
      // Handle successful loading
      this.audio.addEventListener('canplaythrough', () => {
        console.log('Fireboy.mp3 loaded successfully, attempting to play...');
        // Try to play with user interaction fallback
        this.audio?.play().catch((error) => {
          console.log('Autoplay blocked by browser, waiting for user interaction');
          // Add click listener to start music on first user interaction
          const startMusicOnClick = () => {
            this.audio?.play().catch(e => console.log('Playback failed:', e));
            document.removeEventListener('click', startMusicOnClick);
          };
          document.addEventListener('click', startMusicOnClick);
        });
      });
      
      // Handle loading errors
      this.audio.addEventListener('error', (e) => {
        console.log('Failed to load fireboy.mp3:', e);
        this.startGeneratedMusic();
      });
      
      this.audio.load();
    } catch (error) {
      console.log('Error in startMusic:', error);
      this.startGeneratedMusic();
    }
  }

  startGeneratedMusic() {
    // Create a simple birthday song using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Simple "Happy Birthday" melody
    const notes = [
      { freq: 523.25, duration: 0.5 }, // C
      { freq: 523.25, duration: 0.5 }, // C
      { freq: 659.25, duration: 1.0 }, // E
      { freq: 523.25, duration: 1.0 }, // C
      { freq: 698.46, duration: 1.0 }, // F
      { freq: 659.25, duration: 2.0 }, // E
      { freq: 523.25, duration: 0.5 }, // C
      { freq: 523.25, duration: 0.5 }, // C
      { freq: 659.25, duration: 1.0 }, // E
      { freq: 523.25, duration: 1.0 }, // C
      { freq: 783.99, duration: 1.0 }, // G
      { freq: 698.46, duration: 2.0 }, // F
    ];

    let time = audioContext.currentTime;
    notes.forEach(note => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(note.freq, time);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + note.duration);
      
      oscillator.start(time);
      oscillator.stop(time + note.duration);
      
      time += note.duration;
    });

    // Loop the music
    setTimeout(() => {
      this.startGeneratedMusic();
    }, time * 1000);
  }

  stopMusic() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  startConfetti() {
    this.confettiInterval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);
  }

  stopConfetti() {
    if (this.confettiInterval) {
      clearInterval(this.confettiInterval);
    }
  }

  closePage() {
    this.stopMusic();
    this.stopConfetti();
    this.goBack();
  }
}
