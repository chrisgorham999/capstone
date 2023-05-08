/*
======================================
; Title: gorham-team-routes.js 
; Author: Chris Gorham
; Date: 8 May 2023
; Description: This code is for the WEB420 Capstone Project team routes
; Sources Used:  N/A
;=====================================
*/

// imports
const express = require("express");
const router = express.Router();
const Team = require("../models/gorham-team");

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an array of all Teams.
 *     summary: Returns an array of Teams in JSON format.
 *     responses:
 *       '200':
 *         description: Array of Team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
 router.get("/teams", async(req, res) => {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    message: `MongoDB Exception: ${err}`
                })
            } else {
                console.log(teams);
                res.json(teams);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: `Server Exception: ${e.message}`
        })
    }
})

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for finding all players by TeamId
 *     summary: Looks up all players by TeamId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid TeamID
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.get('/teams/:id/players', async (req, res) => {
    try {
      Team.findOne({ '_id': req.params.id }, function (err, team) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(team);
          res.json(team);
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        message: `Server Exception: ${e.message}`,
      });
    }
  });

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API for deleting a Team document from MongoDB.
 *     summary: Removes a Team document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Team to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '401':
 *         description: Invalid TeamID
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.delete('/teams/:id', async (req, res) => {
    try {
        const teamFindId = req.params.id;

        Team.findByIdAndDelete({'_id': teamFindId}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: createTeam
 *     description: API for adding a new Team document to MongoDB Atlas
 *     summary: Creates a new Team document
 *     requestBody:
 *       description: Team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - mascot
 *             properties:
 *              name:
 *                  type: string
 *              mascot:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Team Added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post("/teams", async(req, res) => {
    try {
        const newTeam = {
            name: req.body.name,
            mascot: req.body.mascot,
        }

        await Team.create(newTeam, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        });
    }
});


module.exports = router;