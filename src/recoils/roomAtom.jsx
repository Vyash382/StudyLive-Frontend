import { atom } from 'recoil';

export const roomAtom = atom({
  key: 'roomAtom',
  default: {
    room_id: 'yu',
    role: 'yu'
  },
});
