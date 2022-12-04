const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

let translationList = []
let titleList = []
let timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g

Object.keys(americanToBritishSpelling).forEach(key => {
  translationList.push([key, americanToBritishSpelling[key]])
})

Object.keys(americanToBritishTitles).forEach(key => {
  titleList.push([key, americanToBritishTitles[key]])
})

class Translator {
  translate(text, locale) {
    let translatedText = text
    let highlight = []
    let times = translatedText.match(timeRegex)

    if (locale === 'american-to-british') {
      translationList.forEach(element => {
        translatedText = translatedText.replace(
          new RegExp(`(?<=^|[.'"\\s])${element[0]}(?=[.'"\\s]|$)`, 'gi'), 
          `<span class="highlight">${element[1]}</span>`
        )
      
        highlight.push(element[1])
      })

      titleList.forEach(element => {
        translatedText = translatedText.replace(
          new RegExp(`(?<=^|[.'"\\s])${element[0]}(?=[.'"\\s]|$)`, 'g'), 
          `<span class="highlight">${element[1]}</span>`
        )

        highlight.push(element[1])
      })

      Object.keys(americanOnly).forEach(element => {
        translatedText = translatedText.replace(
          new RegExp(`(?<=^|[.'"\\s])${element}(?=[.'"\\s]|$)`, 'gi'), 
          `<span class="highlight">${americanOnly[element]}</span>`
        )
        
        highlight.push(americanOnly[element])
      })
    }
    else {
      translationList.forEach(element => {
        translatedText = translatedText.replace(
          new RegExp(`(?<=^|[.'"\\s])${element[1]}(?=[.'"\\s]|$)`, 'gi'), 
          `<span class="highlight">${element[0]}</span>`
        )

        highlight.push(element[0])
      })

      titleList.forEach(element => {
        translatedText = translatedText.replace(
          new RegExp(`(?<=^|[.'"\\s])${element[1]}(?=[.'"\\s]|$)`, 'g'), 
          `<span class="highlight">${element[0]}</span>`
        )

        highlight.push(element[0])
      })

      Object.keys(britishOnly).forEach(element => {
        translatedText = translatedText.replace(
          new RegExp(`(?<=^|[.'"\\s])${element}(?=[.'"\\s]|$)`, 'gi'), 
          `<span class="highlight">${britishOnly[element]}</span>`
        )

        highlight.push(britishOnly[element])
      })
    }

    if (times)
      times.forEach(time => {
        if (locale === 'american-to-british')
          translatedText = translatedText.replace(time, `<span class="highlight">${time.replace(':', '.')}</span>`)
        else 
          translatedText = translatedText.replace(time, `<span class="highlight">${time.replace('.', ':')}</span>`)
      })
      
    if (translatedText === text)
      return 'Everything looks good to me!'
    
    return translatedText
  }
}

module.exports = Translator;