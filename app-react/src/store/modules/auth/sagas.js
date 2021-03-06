import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'auth/login', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/users');
  } catch (err) {
    if (err.status === 400) {
      toast.warn(err.message);
    } else {
      toast.error('Falha na autenticação, verifique seus dados');
    }
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, lastName, cpf, datanasc, email, municipio, password } = payload;

    yield call(api.post, 'auth/register', {
      name,
      lastName,
      cpf, 
      datanasc,
      municipio,
      email,
      password,
      isAdmin: false,
      active: true,
    });

    history.push('/');
  } catch (err) {
    if (err.status === 400) {
      toast.warn(err.message);
    } else {
      toast.error('Falha no cadastro, verifique seus dados');
    }

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
