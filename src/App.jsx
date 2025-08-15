import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [searchInput, setSearchInput] = useState('');
  const articles = [
    {
      title: '<h3>Understanding the difference between grid-template and grid-auto</h3>',
      content: "<p>With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically the difference between grid-template-rows/columns and grid-auto-rows/columns. Although I knew they were to do with the explicit and implicit grid systems, at face value they seemed to be doing almost the same thing. In actual fact, they have little in common and are used to achieve different things.</p>"
    },
    {
      title: "<h3>Recreating the GitHub Contribution Graph with CSS Grid Layout</h3>",
      content: "<p>While learning CSS Grid Layout, I’ve found that the best way to internalise all the new concepts and terminology is by working on various layouts using them. Recently, I decided to try to recreate the GitHub Contribution graph using CSS Grid Layout, and found it was an interesting challenge. As I always find while working with CSS Grid Layout, I end up with far less CSS than I would have using almost any other method. In this case, the layout-related part of my CSS ended up being less than 30 lines, with only 15 declarations!</p>"
    },
    {
      title: "<h3>Dogs: Our best friends in sickness and in health</h3>",
      content: "<p>Dogs, often hailed as humans’ best friends, have been the topic of many scientific studies looking into how they might boost our well-being. In this Spotlight, we’ll explain how your friendly pup can benefit your health across the board</p>"
    }
  ]
  const [highlightedArticles, setHighlightedArticles] = useState(articles);
  const matchWords = (article, word) => {
    // matches all whole-case insestive words.
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    // list of words
    const matchedWords = article.match(regex);
    return matchedWords;
  }

  const checkMatches = (value) => {
    setSearchInput(value);
    let newArticles = [];
    articles.forEach(article => {
      const matchedWords = matchWords(article.content, value)
      if (matchedWords && value.length > 0) {
        article.title = article.title.replaceAll(matchedWords[0], `<mark>${matchedWords[0]}</mark>`);
        article.content = article.content.replaceAll(matchedWords[0], `<mark>${matchedWords[0]}</mark>`);
        newArticles.push(article);
      } else if (value.length === 0) {
        newArticles = articles;
      }
    })
    setHighlightedArticles(newArticles);
  }

  return (
    <div className='container'>
      <input
        placeholder='Search articles'
        type="text"
        value={searchInput}
        onChange={(e) => checkMatches(e.target.value)}
        className='search-input'
      />
        {highlightedArticles.map(({title, content}, index) => (
          <article>
            <h3 className='title' dangerouslySetInnerHTML={{__html: title}}/>
            <p className='content' key={index} dangerouslySetInnerHTML={{__html: content}}/>
          </article>
        ))}
        {highlightedArticles.length === 0 && <h2 style={{textAlign: 'center'}}>No matches found</h2>}
    </div>
  )
}

export default App