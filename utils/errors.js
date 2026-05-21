// utils/errors.js

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.status = 404; 
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
        this.status = 409;
    }
}

export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.status = 403;
    }
}