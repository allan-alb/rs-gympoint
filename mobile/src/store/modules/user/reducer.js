import produce from 'immer';

const INITIAL_STATE = {
  user_id: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@user/SIGN_IN_SUCCESS':
        draft.user_id = action.payload.id;
        break;
      case '@user/SIGN_OUT': {
        draft.user_id = null;
        break;
      }
      default:
        break;
    }
  });
}
