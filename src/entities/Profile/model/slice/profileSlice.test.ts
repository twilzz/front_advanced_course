import { DeepPartial } from '@reduxjs/toolkit'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { ProfileSchema, ValidateProfileError } from '../types/profile'
import { profileActions, profileReducer } from './profileSlice'

const data = {
  username: 'admin',
  age: 24,
  country: Country.Armenia,
  name: 'Alexey',
  lastname: 'Nevagno',
  currency: Currency.RUB,
  city: 'Spb',
}

describe('Profile Slice', () => {
  test('test set username', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false }
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({ readonly: true })
  })
  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } }
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    })
  })
  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '' } }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
          username: '12342',
        })
      )
    ).toEqual({
      form: { username: '12342' },
    })
  })
  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    }
    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    })
  })
  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '')
      )
    ).toEqual({
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      form: data,
      data,
    })
  })
})
