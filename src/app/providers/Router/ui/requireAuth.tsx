import { getUserAuthData } from 'entities/User'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useSelector(getUserAuthData)
  let location = useLocation()

  if (!auth) {
    return <Navigate to={RoutePaths.main} state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
