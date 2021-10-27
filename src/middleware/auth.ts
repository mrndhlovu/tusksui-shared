import { Response, NextFunction, Request } from "express"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { ExpressContext } from "apollo-server-express"

import { errorService } from "../services/error"
import { IJwtAccessTokens, IJwtAuthToken } from "../types"
import { RequestValidationError, NotAuthorisedError } from "../services/error"
const { catchAsyncError } = errorService

declare global {
  namespace Express {
    interface Request {
      currentUserJwt: IJwtAuthToken
      apolloAuthToken: string
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
      if (!req.session || !req.session.jwt?.access) {
        req.session = null
        throw new NotAuthorisedError("Authorization credentials are missing.")
      }

      const sessionJwtToken = req?.session.jwt?.access

      const currentUserJwt = jwt.verify(
        sessionJwtToken,
        process.env.JWT_TOKEN_SIGNATURE!
      )

      req.currentUserJwt = currentUserJwt as IJwtAuthToken

      next()
    }
  )

  addAuthToApolloContext({ req }: { req: ExpressContext["req"] }) {
    const authorization = req.get("Authorization")
    if (authorization) {
      const sessionJwtToken = authorization.replace("Bearer ", "")
      req.session!.jwt.access = sessionJwtToken

      const currentUserJwt = jwt.verify(
        sessionJwtToken,
        process.env.JWT_TOKEN_SIGNATURE!
      )

      req.currentUserJwt = currentUserJwt as IJwtAuthToken
    }
  }

  authenticateApolloQuery = (resolver: any) => {
    return (root: any, args: any, context: ExpressContext, info: any) => {
      if (context.req.currentUserJwt) {
        return resolver(root, args, context, info)
      }

      throw new NotAuthorisedError("Authorization credentials are missing.")
    }
  }

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
