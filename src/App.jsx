import { useState } from 'react'
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
    // matches all whole-case insenstive words.
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    // list of words (always returns one index which is the matched)
    const matchedWords = article.match(regex);
    return matchedWords;
  }

  const checkMatches = (value) => {
    setSearchInput(value);
    let newArticles = [];
    // traverse all articles to check for matches inside each one
    articles.forEach(article => {
      // get matched words for title and content separatley
      const matchedTitleWords = matchWords(article.title, value)
      const matchedContentWords = matchWords(article.content, value)
      if (matchedTitleWords && value.length > 0) {
        // put all matched words inside mark tags to highlight
        article.title = article.title.replaceAll(matchedTitleWords[0], `<mark>${matchedTitleWords[0]}</mark>`);
      }
      if (matchedContentWords && value.length > 0) {
        article.content = article.content.replaceAll(matchedContentWords[0], `<mark>${matchedContentWords[0]}</mark>`);
      }
      // display the articles after highlighting
      newArticles.push(article);
    })
    // make sure to display all articles again if no search input
    if (value.length === 0) {
      newArticles = articles;
    }
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
          <article key={title}>
            <h3 className='title' dangerouslySetInnerHTML={{__html: title}}/>
            <p className='content' dangerouslySetInnerHTML={{__html: content}}/>
          </article>
        ))}
    </div>
  )
}

export default App