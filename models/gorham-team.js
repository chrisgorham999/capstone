/*
======================================
; Title: gorham-team.js 
; Author: Chris Gorham
; Date: 8 May 2023
; Description: This code is for the WEB420 Capstone Project team model
; Sources Used:  N/A
;=====================================
*/

// require statement for mongoose
const mongoose = require('mongoose');

// define new mongoose schema
const Schema = mongoose.Schema;

// defines the player schema
let playerSchema = new Schema({    
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number },
})

// defines the team schema
let teamSchema = new Schema({    
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema],
})


// exports the model
module.exports = mongoose.model('Team', teamSchema);