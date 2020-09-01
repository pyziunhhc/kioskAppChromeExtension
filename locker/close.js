const {
    exec
} = require('child_process');
const express = require('express');
const app = express();

app.post('/lock', (req, res) => {
    exec('rundll32.exe user32.dll,LockWorkStation', (error, stdout, stderr) => {
        console.log(...arguments)
    });
})
app.post('/logoff', (req, res) => {
    exec('shutdown.exe -l')
})
app.listen(3000, () => {
    console.log('Działa')
})