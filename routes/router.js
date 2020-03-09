const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const getStats = async (req, res, next) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, './stats.json'));
    const stats = JSON.parse(data);
    const playerStats = stats.find(player => player.id === Number(req.params.id));
    if (!playerStats) {
      const err = new Error('Player stats not found');
      err.status = 404;
      throw err;
    }
    res.json(playerStats);
  } catch (e) {
    next(e);
  }
};
const statsFilePath = fs.readFileSync(path.join(__dirname, './stats.json'))

/**
 * @swagger
 * /api/v1/stats/{id}:
 *   get:
 *     tags:
 *       - Stats
 *     description: Returns a single Stat
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Stats id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single Stat
 *         
 */
router
  .route('/api/v1/stats/:id')
  .get(getStats);



  const getAllStats = async (req, res, next) => {
    try {
      const data = fs.readFileSync(path.join(__dirname, './stats.json'));
      const stats = JSON.parse(data);
      const playerStats = stats;
      if (!playerStats) {
        const err = new Error('Player stats not found');
        err.status = 404;
        throw err;
      }
      res.json(playerStats);
    } catch (e) {
      next(e);
    }
  };
  

/**
 * @swagger
 * /api/v1/stats:
 *   get:
 *     tags:
 *       - Stats
 *     description: Returns all stats
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Ststs
 *         
 *          
 */
  router
  .route('/api/v1/stats')
  .get(getAllStats);





  const createStats = async (req, res, next) => {
    try {
      const data = fs.readFileSync(path.join(__dirname, './stats.json'));
      const stats = JSON.parse(data);
      const newStats = {
        id: req.body.id,
        wins: req.body.wins,
        losses: req.body.losses,
        points_scored: req.body.points_scored,
      };
      stats.push(newStats);
      fs.writeFileSync(path.join(__dirname, './stats.json'), JSON.stringify(stats));
      res.status(201).json(newStats);
    } catch (e) {
      next(e);
    }
  };



/**
 * @swagger
 * /api/v1/stats:
 *   post:
 *     summary: Creates a new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: stats
 *         description: The stats to create.
 *         schema:
 *           type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: number
 *             wins:
 *               type: number
 *             losses:
 *               type: number
 *             points_scored:
 *               type: number
 *     responses:
 *       201:
 *         description: Created
 */
  router
    .route('/api/v1/stats')
    .post(createStats);
  
    const updateStats = async (req, res, next) => {
        try {
          const data = fs.readFileSync(statsFilePath);
          const stats = JSON.parse(data);
          const playerStats = stats.find(player => player.id === Number(req.params.id));
          if (!playerStats) {
            const err = new Error('Player stats not found');
            err.status = 404;
            throw err;
          }
          const newStatsData = {
            id: req.body.id,
            wins: req.body.wins,
            losses: req.body.losses,
            points_scored: req.body.points_scored,
          };
          const newStats = stats.map(player => {
            if (player.id === Number(req.params.id)) {
              return newStatsData;
            } else {
              return player;
            }
          });
          fs.writeFileSync(statsFilePath, JSON.stringify(newStats));
          res.status(200).json(newStatsData);
        } catch (e) {
          next(e);
        }
      };
      
      router
      .route('/api/v1/stats/:id')
      .get(getStats)
      .put(updateStats);

      const deleteStats = async (req, res, next) => {
        try {
          const data = fs.readFileSync(statsFilePath);
          const stats = JSON.parse(data);
          const playerStats = stats.find(player => player.id === Number(req.params.id));
          if (!playerStats) {
            const err = new Error('Player stats not found');
            err.status = 404;
            throw err;
          }
          const newStats = stats.map(player => {
            if (player.id === Number(req.params.id)) {
              return null;
            } else {
              return player;
            }
          })
          .filter(player => player !== null);
          fs.writeFileSync(statsFilePath, JSON.stringify(newStats));
          res.status(200).end();
        } catch (e) {
          next(e);
        }
      };
      
      router
  .route('/api/v1/stats/:id')
  .get(getStats)
  .put(updateStats)
  .delete(deleteStats);

    
module.exports = router;
