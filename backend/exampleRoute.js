const express = require("express");
const Example = require("../example"); //Post
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let post = new Example(req.body);
        post = await post.save();
        res.status(200).json({
            status: 200,
            data: post,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

router.get("/list", async (req, res) => {
    try {
        let posts = await Example.find();
        res.status(200).json({
            status: 200,
            data: posts,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

router.get("/:postId", async (req, res) => {
    try {
        let post = await Example.findOne({
            _id: req.params.postId,
        });
        if (post) {
            res.status(200).json({
                status: 200,
                data: post,
            });
        }
        res.status(400).json({
            status: 400,
            message: "No post found",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

router.put("/:postId", async (req, res) => {
    try {
        let post = await Example.findByIdAndUpdate(req.params.postId, req.body, {
            new: true,
        });
        if (post) {
            res.status(200).json({
                status: 200,
                data: post,
            });
        }
        res.status(400).json({
            status: 400,
            message: "No post found",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

router.delete("/:postId", async (req, res) => {
    try {
        let post = await Example.findByIdAndRemove(req.params.postId);
        if (post) {
            res.status(200).json({
                status: 200,
                message: "Post deleted successfully",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "No post found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports = router;
