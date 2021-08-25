//Testing file, not used in actual production

const express = require('express');
const Example = require('.');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let example = new Example(req.body);
    example = await example.save();
    res.status(200).json({
      status: 200,
      data: example,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get('/list', async (req, res) => {
  try {
    let examples = await Example.find();
    res.status(200).json({
      status: 200,
      data: examples,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get('/:exampleId', async (req, res) => {
  try {
    let example = await Example.findOne({
      _id: req.params.exampleId,
    });
    if (example) {
      res.status(200).json({
        status: 200,
        data: example,
      });
    }
    res.status(400).json({
      status: 400,
      message: 'No example found',
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.put('/:exampleId', async (req, res) => {
  try {
    let example = await Example.findByIdAndUpdate(
      req.params.exampleId,
      req.body,
      {
        new: true,
      }
    );
    if (example) {
      res.status(200).json({
        status: 200,
        data: example,
      });
    }
    res.status(400).json({
      status: 400,
      message: 'No example found',
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.delete('/:exampleId', async (req, res) => {
  try {
    let example = await Example.findByIdAndRemove(req.params.exampleId);
    if (example) {
      res.status(200).json({
        status: 200,
        message: 'Example deleted successfully',
      });
    } else {
      res.status(400).json({
        status: 400,
        message: 'No example found',
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
