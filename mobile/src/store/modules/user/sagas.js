import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `students/${id}/check`);

    if (response.status === 400) {
      Alert.alert('Erro', 'ID inválido');
      return;
    }

    const user_id = response.data;

    yield put(signInSuccess(user_id));
  } catch (err) {
    Alert.alert('Erro', 'Ocorreu um erro no login');

    yield put(signFailure());
  }
}

export function signOut() { }

export default all([
  takeLatest('@user/SIGN_IN_REQUEST', signIn),
  takeLatest('@user/SIGN_OUT', signOut),
]);
