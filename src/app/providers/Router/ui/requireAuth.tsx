import { getUserAuthData, getUserRole, UserRole } from 'entities/User'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'

interface RequireAuthProps {
  children: JSX.Element
  roles?: UserRole[]
}

function RequireAuth({ children, roles }: RequireAuthProps) {
  let auth = useSelector(getUserAuthData)
  let location = useLocation()
  const userRoles = useSelector(getUserRole)

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true
    }
    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole)
      return hasRole
    })
  }, [roles, userRoles])

  if (!auth) {
    return <Navigate to={RoutePaths.main} state={{ from: location }} replace />
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate to={RoutePaths.forbidden} state={{ from: location }} replace />
    )
  }

  return children
}

export default RequireAuth
