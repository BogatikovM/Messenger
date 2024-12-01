export const logout = async (req, res, next) => {
    try {
        req.session.destroy()
        res.status(200).json({ "result": "success" })
    } catch (err) {
        res.status(500).send({ "result": "fail" })
    }
}