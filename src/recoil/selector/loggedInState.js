import {  selector  } from 'recoil';
import {  setloggedIn  } from '../atom/setloggedIn';

export const loggedInState = selector({

    key: 'loggedInState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const loggedIn = get(setloggedIn);
      return loggedIn;
    },

  });
