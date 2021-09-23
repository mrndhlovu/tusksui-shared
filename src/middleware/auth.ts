import { Response, NextFunction, Request } from "express"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"

import { errorService } from "../services/error"
import { IJwtAccessTokens, IJwtAuthToken } from "../types"
import { RequestValidationError, NotAuthorisedError } from "../services/error"
const { catchAsyncError } = errorService

declare global {
  namespace Express {
    interface Request {
      currentUserJwt: IJwtAuthToken
      session:
        | {
            jwt: IJwtAccessTokens
          }
        | null
        | undefined
    }
  }
}

class AuthMiddleWare {
  checkIsAuthenticated = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.session) {
        req.session = null
        throw new NotAuthorisedError("Authorization credentials are missing.")
      }

      if (!req.session || !req.session.jwt?.access) {
        req.session = null
        throw new NotAuthorisedError("Authorization credentials are missing.")
      }

      const currentUserJwt = jwt.verify(
        req.session.jwt?.access,
        process.env.JWT_TOKEN_SIGNATURE!
      )

      req.currentUserJwt = currentUserJwt as IJwtAuthToken

      next()
    }
  )

  validateRequestBodyFields = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
      }

      next()
    }
  )

  validateRequiredAccessJwt = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      if (!req.session || !req.session.jwt) {
        throw new NotAuthorisedError("Authorization credentials are missing.")
      }

      next()
    }
  )

  validateRequiredRefreshJwt = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      if (!req.session || !req.session.jwt?.refresh) {
        throw new NotAuthorisedError("Authorization credentials are missing.")
      }

      const currentUserJwt = jwt.verify(
        req.session.jwt.refresh,
        process.env.JWT_REFRESH_TOKEN_SIGNATURE!
      )

      req.currentUserJwt = currentUserJwt as IJwtAuthToken

      next()
    }
  )
}

export const authMiddleware = new AuthMiddleWare()
