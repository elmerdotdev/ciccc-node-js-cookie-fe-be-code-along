import { Request, Response, NextFunction } from 'express'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authToken } = req.signedCookies
  if (authToken) {
    next()
  } else {
    res.status(401).json({
      message: 'You are not allowed to view this page'
    })
  }
}