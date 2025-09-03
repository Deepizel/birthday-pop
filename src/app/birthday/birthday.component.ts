import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';

interface BirthdayMessage {
  id: number;
  sender: string;
  text: string;
  hasHeart: boolean;
  isHubby: boolean;
}

@Component({
  selector: 'app-birthday',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './birthday.component.html',
  styleUrl: './birthday.component.css'
})
export class BirthdayComponent implements OnInit, OnDestroy {
  audio: HTMLAudioElement | null = null;
  confettiInterval: any;
  slideshowInterval: any;
  showCloseButton = false;
  
  // Slideshow properties
  currentImageIndex = 0;
  images: string[] = [];
  totalImages = 14; // Number of images in assets folder

  // Modal properties
  showModal = false;
  selectedMessage: BirthdayMessage | null = null;

  messages: BirthdayMessage[] = [
    {
      id: 1,
      sender: "Matthew",
      text: "Happy Birthday. Hope today brings you joy and unforgettable memories. Cheers to a great year ahead.",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 2,
      sender: "Omolade",
      text: "Happy Birthday to our beautiful wife and the most incredible mother to the boys. You are truly one of a kind—strong yet gentle, loving yet firm, patient yet full of energy. You pour so much of yourself into taking care of your family, often putting their needs above your own, and we want you to know how deeply grateful we are. Today is your day, and we celebrate you. The woman who makes the house a home, who loves unconditionally, and who teaches the boys with grace and wisdom. You are not only the queen of the family, but also the heartbeat that keeps the family going. I pray that the Lord gives you health in body, clarity in mind, and strength in spirit. Protect you from every harm, every worry, and every burden that seeks to weigh you down. Instead, fill your days with laughter, your nights with rest, and your future with hope.",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 3,
      sender: "Adetola",
      text: "Happy 30th Birthday 🎉💖! I just want to celebrate you today for all that you are and all that you do. You're such a strong, loving, and amazing woman always holding things together for Joshua and the kids. Your kindness and support shine through in everything you do, and it's so inspiring. May this new decade bring you more joy, peace, and fulfillment. You truly deserve it. 💐✨",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 4,
      sender: "Bolu Ebwin",
      text: "Happiest birthday to you best sister from another mother ❤ I pray heaven continues enlarging your coast Abisolami, you are one of a kind. May heaven favour your existence Sugar baby mhi 🙏 One of the beautiful souls Heaven gifted me 😍❤ Ebwin loves you my xoxo 😚💋😘",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 5,
      sender: "Peace",
      text: "Happy birthday Iyawo wa ❤❤ Adunni Joshua nikan 🥰 thank you for all you do for our husband 😁 God will continue to bless you, strengthen you, enrich you, and open doors of infinite blessings upon you always. Happy birthday Aya Oluwafemi 🤗🤗",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 6,
      sender: "Toluwanimi Odupitan",
      text: "Happy Birthday Abisola 🎉🎂 Wishing you a truly special day filled with love, joy, and laughter. Thank you for the kindness, warmth, and grace you share with everyone around you, most especially to Joshua and the boys. May this year bring you countless blessings, new opportunities, and beautiful moments with your family. You are truly appreciated and celebrated today and always. Enjoy your day to the fullest, you deserve it! ❤✨",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 7,
      sender: "Ranti",
      text: "Happy birthday to Olori Aya Thainea, May God continue to bless and protect you for all you do.",
      hasHeart: false,
      isHubby: false
    },
    {
      id: 8,
      sender: "Ayinke",
      text: "Iyawo mi, Happy birthday to you ❤🎉🎊 Thank you for taking care of our husband and making sure Abraham has my kind of thickness 🫣. May the good Lord bless you and grant you unending joy for the rest of your life.",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 9,
      sender: "Olabisi",
      text: "Happy birthday to the woman who brings sunshine into my life, even on the cloudiest days. Happy birthday my love 💞💞💞 Thank you for being my safe place. No present could match the gift you are to me. Happy birthday my angel.",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 10,
      sender: "Omolola",
      text: "Trying to start this message has been challenging, but I will begin anyway because I've heard and seen many amazing things about you. Trying to put it in a few paragraphs will be a disservice to you. Here I go, I met Joshua almost five years ago; aside from work, the most consistent thing has been YOU. There has never been a moment when I've known Joshua that it hasn't felt like I know you too. The love you both share for each other has been inspiring. The way you both show up consistently for each other is the amazing thing this weird world has experienced. I don't want to make this about both you and him because it is solely your day, and I want to view you as a person, not just a wife and a mother, because God knows you make it look easy being all of those. Your strength, resilience, beauty, and grace are truly admirable, and I hope you know that, because they are some of the greatest things about you. Thank you for being YOU, for being a light in this world, for being a great mother, wife, and person. On this day, I pray God comes through for you in ways unimaginable, all your loud and silent prayers shall be answered, you shall not cry over your family, your family shall not cry over you, you shall reap the fruits of your labour in good health and sound mind, God shall enrich you and always show up and show out for you. Joshua calls you 'Adunni', which means a gift from God and a precious one—which you really are. I want to take this opportunity to say thank you and wish you a happy, Happy Happy, Happy 30th birthday. May your 30s be your best era yet.",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 11,
      sender: "Kehinde",
      text: "Happy Birthday, Queen of the Thainea empire! 💃🥳 Today I celebrate the amazing woman who keeps my guy and the boys in check 😅 Thank you for everything you do to keep the family together. Wishing you laughter, sweet surprises, joy, fun, health, wealth, peace, and more reasons to dance through life. Cheers to this great milestone 🥂 God bless you Bisola.",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 12,
      sender: "Darmie",
      text: "Happy birthday Iya boys. Thanks for all you do for the family—your sacrifices, time, and commitment to the family. Things might not be where they ought to be at the moment but there's a certainty that with you aboard, it will be a possibility soon. Once again, thank you for being YOU. Happy birthday to you, God bless you, and this year will be your best year yet... Amen 🙏🏾🤲🏾",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 13,
      sender: "Seun",
      text: "Happy 30th birthday to my beautiful sister. You're an inspiration, and I know the next decade will be your most empowering yet. May this year be joyful and successful.",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 14,
      sender: "Salamot Yetunde",
      text: "Happy birthday my wifey 🎂 The first time I met you I knew you would be a good wife to my brother ❤ thanks for not disappointing me, thanks for always standing by him during the thick and thin times and never giving up 💗 thank you for the endless love, care, and support to your husband 💞 May this birthday be the best 🙏 may you enjoy the fruit of your labour in good health 🙏 more years to celebrate Abisola mi 🙏💋",
      hasHeart: true,
      isHubby: false
    },
    {
      id: 15,
      sender: "Temmie",
      text: "Happy birthday my darling Abisola, the only lastborn in Yusuf family. You are such a wonderful person, although stubborn sometimes but lovely and caring. As you step into your milestone today, it shall be all-round peace and may every of your heart desires be granted. Cheers 🥂 to new age and growth ❤",
      hasHeart: true,
      isHubby: false
    }
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

  openHubbyMessage() {
    this.router.navigate(['/hubby-message']);
  }

  openMessageModal(message: BirthdayMessage) {
    this.selectedMessage = message;
    this.showModal = true;
  }

  closeMessageModal() {
    this.showModal = false;
    this.selectedMessage = null;
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
    // You can add navigation logic here if needed
  }

  // onImageError(event: any) {
  //   // Handle image loading error by hiding the image
  //   event.target.style.display = 'none';
  // }
}
