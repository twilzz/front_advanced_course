import { getUserInited, userActions } from 'entities/User'
import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { classNames } from '../shared/lib/classNames/classNames'
import { AppRouter } from './providers/Router'
import { useTheme } from './providers/ThemeProvider/lib/useTheme'

function App() {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  let inited = useSelector(getUserInited)

  console.log('authorized', inited)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
