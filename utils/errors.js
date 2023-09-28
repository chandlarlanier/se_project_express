const DEFAULT_ERROR = {
  status: 'InternalServerError',
  error: 500
}

const UNAUTHORIZED_ERROR = {
  status: 'Unauthorized',
  error: 401
}

const INVALID_DATA_ERROR = {
  status: "BadRequest",
  error: 400
}

const FORBIDDEN_ERROR = {
  status: "Forbidden",
  error: 403
}

const NOT_FOUND_ERROR = {
  status: "NotFound",
  error: 404
}

const CONFLICT_ERROR = {
  status: "Conflict",
  error: 409
}

module.exports = {
  INVALID_DATA_ERROR,
  DEFAULT_ERROR,
  CONFLICT_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR
}
