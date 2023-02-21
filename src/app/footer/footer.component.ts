import { Component, OnInit } from '@angular/core';
import {
  faEnvelope,
  faPhone,
  faPhoneVolume,
  faAngleDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faGooglePlusG,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  image = [
    [
      'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940885/gallery_item_1_img_syfbrm.webp',
      'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940886/gallery_item_3_img_ao71iu.webp',
      'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940886/gallery_item_4_img_z4lyna.jpg',
    ],
    [
      'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940886/gallery_item_6_img_u4cwhm.jpg',
      'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940886/gallery_item_2_img_ltmg0f.webp',
      'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940886/gallery_item_5_img_wixz4m.jpg',
    ],
  ];
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faPhoneVolume = faPhoneVolume;
  brandsIcon = [faFacebookF, faTwitter, faInstagram, faGooglePlusG, faYoutube];
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faGooglePlusG = faGooglePlusG;
  faYoutube = faYoutube;
  faAngleDown = faAngleDown;
  faArrowUp = faArrowUp;
  toggleInfo: boolean = false;
  iconRotate: string = '';
  ngOnInit(): void {
    window.onscroll = () => {
      let goTopBtn = document.getElementById('goTopBtn');
      let contact = document.getElementById('contact');
      let social = document.getElementById('social');
      if (window.scrollY >= 500) {
        social?.classList.add('social_show');
        contact?.classList.add('contact_show');
        goTopBtn?.classList.add('goTopBtn');
      } else {
        social?.classList.remove('social_show');
        contact?.classList.remove('contact_show');
        goTopBtn?.classList.remove('goTopBtn');
      }
    };
  }
  toggleInfoHandle() {
    this.toggleInfo = !this.toggleInfo;
    let footerContent = document.getElementById('footerContent');
    if (this.toggleInfo) {
      this.iconRotate = 'rotate-180';
      footerContent?.classList.add('footerContent_enable');
      setTimeout(() => {
        footerContent?.classList.add('height_max');
      }, 500);
    } else {
      footerContent?.classList.remove('footerContent_enable');
      footerContent?.classList.remove('height_max');
      this.iconRotate = '';
    }
  }
  scrollTopHandle() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
