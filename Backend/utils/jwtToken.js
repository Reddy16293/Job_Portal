export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const cookieExpireDays = process.env.COOKIE_EXPIRE;
    const cookieExpireDate = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);

    console.log('Cookie Expiration Date:', cookieExpireDate); // Debug log

    const options = {
        expires: cookieExpireDate,
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message: message,
        data: user,
    });
};
