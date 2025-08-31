import JWT from "jsonwebtoken";

export function setUser(user) {
    const payload= {
        _id: user._id,
        username: user.username,
        email: user.email
    };
    const token = JWT.sign(payload, process.env.AUTH_KEY );
    return token;
}

export function getUser(token) {
    const payload = JWT.verify(token, process.env.AUTH_KEY );
    return payload;
}
