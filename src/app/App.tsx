import React, { Suspense, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import { Theme, ThemeContext } from './providers/ThemeProvider/lib/ThemeContext'
import { useTheme } from './providers/ThemeProvider/lib/useTheme'
import { classNames } from '../shared/lib/classNames/classNames'
import { MainPage } from 'pages/MainPage'
import { AboutPage } from 'pages/AboutPage'

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
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/about'} element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
