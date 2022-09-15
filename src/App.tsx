import React, { Suspense, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import { AboutPageLazy } from './pages/AboutPage/AboutPageLazy'
import { MainPageAsync } from './pages/MainPage/MainPage.async'
import { Theme, ThemeContext } from './theme/ThemeContext'
import { useTheme } from './theme/useTheme'
import { classNames } from './helpers/classNames/classNames'

function App() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className={classNames('app', {}, [theme])}>
      <Link to={'/'} style={{ marginRight: '15px' }}>
        Main page
      </Link>
      <Link to={'/about'}>About page</Link>
      <button onClick={toggleTheme}>Change theme</button>
      <Suspense fallback={<span>...Loading</span>}>
        <Routes>
          <Route path={'/'} element={<MainPageAsync />} />
          <Route path={'/about'} element={<AboutPageLazy />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
