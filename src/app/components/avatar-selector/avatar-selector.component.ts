import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit  {
  
  @Output() avatarSelect = new EventEmitter<string>();
  @Input()  currentAvatar = 'av-1.png';
  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5,
    onlyExternal: true
  };
  
  constructor() { }

  ngOnInit() {

    this.avatars.forEach( av => av.selected = false);

    for (const avatar of this.avatars) {
      if ( avatar.img === this.currentAvatar) {
        avatar.selected = true;
        break;
      }
    }
  }

  // Action triggered when an avatar is selected.
  selectAvatar( avatar ) {

    this.avatars.forEach( av => av.selected = false ); // set all the avatars to false.
    avatar.selected = true; // set the current avatar to true.
    console.log( avatar.img );
    this.avatarSelect.emit( avatar.img ); // emit the event
  }

}
