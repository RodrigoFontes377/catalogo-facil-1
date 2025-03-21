'use client'

import { createContext, useContext, useState } from 'react'

type User = {
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  setUser: (user: User) => void
  accessToken: string | null
  setAccessToken: (token: string) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
