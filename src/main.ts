import './style.css'
import 'flyonui/flyonui'
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/stackoverflow-light.css';

hljs.registerLanguage('json', json);

document.addEventListener('DOMContentLoaded', () => { 
  hljs.highlightAll(); 
  function counter(id: string, start: number, end: number, duration: number, suffix: string = '') {
      const obj = document.getElementById(id)
      if (!obj) {
        throw new Error(`HTML element '${id}' not found`)
      }

      let current = start
      const range = end - start
      const increment = end > start ? 1 : -1
      const step = Math.abs(Math.floor(duration / range))

      const timer = setInterval(() => {
        current += increment
        let formattedNumber = current.toString()

        // Check if the number is 1000 or more to add "k+" (for thousands)
        if (current >= 1000) {
          formattedNumber = (current / 1000).toFixed(1) + 'k' // Adding the "k" suffix
        }

        obj.textContent = formattedNumber + suffix
        if (current == end) {
          clearInterval(timer)
        }
      }, step)
  }

  counter('count1', 100, 7, 5000, '+')
  counter('count2', 100, 30, 5000, '+')
  counter('count3', 0, 500, 5000, '+')
  counter('count4', 100, 10, 5000, 'k+')
  counter('count5', 100, 10, 5000, 'k+')
  counter('count6', 100, 10, 5000, 'k+')
  counter('count7', 100, 10, 5000, 'k+')
  counter('count8', 100, 10, 5000, 'k+')
})
const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('.nav-link')

window.addEventListener('scroll', () => {
  let current = ''

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80 // Adjust for fixed navbar height
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id') || ''
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('text-primary')
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('text-primary')
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn')
  // Only proceed if button exists
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.add('hidden')

    scrollToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    window.onscroll = function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.classList.remove('hidden')
      } else {
        scrollToTopBtn.classList.add('hidden')
      }
    }
  }
})
