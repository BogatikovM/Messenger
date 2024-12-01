export const checkSession = (req, res, next) => {
    if (req.session.user) {
        res.status(200).json({ "result": "success" })
    } else {
        res.status(200).json({ "result": "fail" })
    }
}