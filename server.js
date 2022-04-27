const express = require('express');
const app = express();
const path = require('path');
/*const cors = require('cors');
app.use(cors());*/
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/passwordChecker', (req, res) => {
    function passwordChecker (passwordValue) {
        const upperCases = /[A-Z]/;
        const lowerCases = /[a-z]/;
        const nums = /[0-9]/;
        let sumUpperCases = 0;
        let sumLowerCases = 0;
        let sumNums = 0;
        let sumCar = 0;
        
        for (i=0; i < passwordValue.length; i++) {
            if (upperCases.test(passwordValue[i])) {
                sumUpperCases++;
            }
            else if (lowerCases.test(passwordValue[i])) {
                sumLowerCases++;
            }
            else if (nums.test(passwordValue[i])) {
                sumNums++;
            }
            else {
                sumCar++;
            }   
        }
        const sums = {
            'upp': sumUpperCases,
            'low': sumLowerCases,
            'num': sumNums,
            'car': sumCar 
        }
        return sums;
    }     
    res.send(passwordChecker(req.body.password))
})

app.listen(3000, () => console.log('listening at 3000'));