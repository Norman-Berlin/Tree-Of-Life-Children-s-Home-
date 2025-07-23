const express = require('express');
const path = require ('path');
const router = express.Router();
const cors = require('cors');
const app = express();

router.get('/main', (reg, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'main.html'));
});

router.get('', (reg, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'main.html'));
});

router.get('/about', (reg, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
});

router.get('/program', (reg, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'program.html'));
});

router.get('/contact', (reg, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'contact.html'));
});

module.exports = router;