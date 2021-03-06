/**
 * function to get start game by hiding instructions screen & revealing main screen
 */
const startGame = () => {
    document.getElementById('instructionScreen').style.display = 'none'
    document.getElementById('mainScreen').style.display = 'block'
    document.getElementById('text').focus()
}

/**
 * function to get random country object from the array
 * removing that country from the array
 * @param countries array of country objects
 * @returns {object} a random country object
 */
const getRandomCountry = (countries) => {
    const randomIndex = Math.floor(Math.random() * countries.length)
    return countries.splice(randomIndex, 1)[0]
}

/**
 * function to add a new property to a country object containing a lowercase anagram of the country name that is never the same as the name
 * @param country object containing a country name & country code
 * @returns {object} a country object containing a lowercase anagram of the country name
 */
const formatCountry = (country) => {
    country.anagram = country.name
    let lowercaseCountryName = country.anagram.toLowerCase()
    let lowercaseSplitCountry = lowercaseCountryName.split('')

    do {
        // Shuffling array
        for (let currentIndex = lowercaseSplitCountry.length - 1; currentIndex > 0; currentIndex--) {
            let randomIndex = Math.floor(Math.random() * (currentIndex + 1))
            let tempValue = lowercaseSplitCountry[currentIndex]
            lowercaseSplitCountry[currentIndex] = lowercaseSplitCountry[randomIndex]
            lowercaseSplitCountry[randomIndex] = tempValue
        }
        country.anagram = lowercaseSplitCountry.join('')
    } while (country.anagram === lowercaseCountryName)

    return country
}

/**
 * function to display anagram and country code to front end
 * @param {object} countryObject containing anagram and code properties
 */
const displayCountry = (countryObject) => {
    document.getElementById('anagram').textContent = countryObject.anagram
    document.getElementById('hint').textContent = countryObject.code
}

/**
 * function to get random country object from the array,
 * add the anagram property to the country object,
 * then display that country to the web page, and
 * finally return the country object
 *
 * @param countries array of country objects
 * @returns {object} the randomly selected country object with the anagram property attached to it
 */
const getAndDisplayCountry = countries => {
    let countryObject = getRandomCountry(countries)
    countryObject = formatCountry(countryObject)
    displayCountry(countryObject)
    return countryObject
}

/**
 * function to overwrite main game screen display with next word
 * while also re-enabling the input & disabling the next button
 *
 * @param {array} countries array of country objects
 * @returns {object} the next randomly selected country object with the anagram property attached to it
 */
const newWord = (countries) => {
    document.getElementById('text').value = ''
    document.getElementById('cross').textContent = 'cancel'
    document.getElementById('cross').style.color = 'red'
    enableNextButton(false)
    enableTextInput(true)
    return getAndDisplayCountry(countries)
}

/**
 * function to check user input against original country name, changing both to lower case
 *
 * @param {object} country containing name property
 * @return bool if input = country.name
 */
const checkCorrect = (country) => {
    let input = document.getElementById('text').value.toLowerCase()
    let lowercaseCountry = country.name
    lowercaseCountry = lowercaseCountry.toLowerCase()
    return (input === lowercaseCountry)
}

/**
 * function to change display from red cross to green tick if checkCorrect is true
 *
 * @param checkCorrect which if true will trigger function
 */
const displayCheckCorrect = (checkCorrect) => {
    if (checkCorrect) {
        document.getElementById('cross').textContent = 'check_circle'
        document.getElementById('cross').style.color = 'green'
        enableTextInput(false)
        enableNextButton(true)
    }
}

/**
 * function to disable text input,
 * default functionality enables text input
 *
 * @param {boolean} boolean if true, enables text input and if false disables text input
 */
const enableTextInput = (enabled= true) => {
    document.getElementById('text').disabled = !enabled
}

/**
 * function to enable or disable the next button,
 * default functionality enables the button
 *
 * @param {boolean} enabled if true the next button is enabled otherwise disabled
 */
const enableNextButton = (enabled = true) => {
    document.getElementById('nextButton').disabled = !enabled
}

/**
 * function to increment the player's score by 1
 *
 * @param {object} score the player's score
 * @return {object} the player's incremented score
 */
const incrementScore = (score) => {
    score.score += 1
    return score
}

/**
 * function to display the updated score to the score element of the front end
 *
 * @param {object} score the player's score
 */
const displayUpdatedScore = (score) => {
    document.getElementById('score').textContent = score.score.toString()
}

/**
 * function to initiate party mode!!!! :)
 */
const partyMode = () => {
        document.getElementById('score').style.color = 'blue'
        document.getElementById('score').style.fontSize = '2.5rem'
        setTimeout(() => {
            document.getElementById('score').style.color = 'black'
            document.getElementById('score').style.fontSize = '1.5rem'
    }, 3000)
}

/**
 * function to start the timer
 *
 * @param {object} timerObject the timer object that will have the timer and interval set
 * @param {object} score the player's score
 * @return {object} the timerObject object returned with the timer and the interval set
 */
const startTimer = (timerObject, score) => {
    timerObject.time = 30
    timerObject.interval = setInterval(()=> {
        timerObject.time--
        document.getElementById('timer').textContent = timerObject.time
        if (timerObject.time <= 0) {
            displayGameOver(score, timerObject.interval)
        }
    }, 1000)
    return timerObject
}

/**
 * function to change from main screen to game over screen and display final score,
 * the timer object's interval is also cleared
 * @param {object} score the player's score
 * @param interval the timer object's interval property
 */
const displayGameOver = (score, interval) => {
    document.getElementById('mainScreen').style.display = 'none'
    document.getElementById('gameOverScreen').style.display = 'block'
    document.getElementById('finalScore').textContent = score.score.toString()
    clearInterval(interval)
}
