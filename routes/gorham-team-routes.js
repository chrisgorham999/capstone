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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for assigning a player to a team by teamID
 *     summary: Assigns a player to a team by teamID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the team that the player will be assigned to
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: The player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Customer invoice added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/teams/:id/players', async (req, res) => {
    try {
        await Team.findOne({'_id': req.params.id}, 
        function(err, team){
            let newPlayer = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                salary: req.body.salary
            };

            if (err){
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}` 
                })
            } else{
                team.players.push(newPlayer);

                team.save(function(err, Team){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(Team);
                        res.json(Team); 
                    }
                })
            }
        })
    }catch(e){
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
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

module.exports = router;