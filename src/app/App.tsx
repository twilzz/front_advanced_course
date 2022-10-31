import { getUserAuthorized, userActions } from 'entities/User'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { classNames } from '../shared/lib/classNames/classNames'
import { AppRouter } from './providers/Router'
import { useTheme } from './providers/ThemeProvider/lib/useTheme'

function App() {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const authorized = useSelector(getUserAuthorized)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <div className="content-page">
        <Sidebar />
        {authorized && <AppRouter />}
      </div>
    </div>
  )
}

export default App
