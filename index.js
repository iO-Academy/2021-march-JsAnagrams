let countries = []
let country
let score = 0

fetch('countries.json')
    .then(countryData => countryData.json())
    .then(data => {
        countries = data
    })

document.getElementById('startButton').addEventListener('click', () => {
    if (countries.length) {
        startGame()
        country = getAndDisplayCountry(countries)
    }
})

document.getElementById('text').addEventListener('keyup', e => {
    displayCheckCorrect(checkCorrect(country))
})

document.getElementById('revealButton').addEventListener('click', () => {
    enableTextInput(false)
    enableNextButton(true)
    document.getElementById('anagram').textContent = country.name
})

document.getElementById('nextButton').addEventListener('click', () => {
    country = newWord(countries)
})