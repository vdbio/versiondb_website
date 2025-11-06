import './style.css'
import 'flyonui/flyonui'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/atom-one-dark.css'
import 'devicon/devicon.min.css'

const TEXT_DURATION = 4000
const INTERSECTION_THRESHOLD = 0.10

hljs.registerLanguage('json', json)

const formatNumber = (count: number) => {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1) + 'M'
  }

  if (count >= 1_000) {
    return (count / 1_000).toFixed(1) + 'k'
  }

  return Math.floor(count).toString()
}

document.addEventListener('DOMContentLoaded', () => {
  hljs.highlightAll()
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

let isCounterRan = false

const counterObserver = new IntersectionObserver((entries) => {
  if (isCounterRan) {
    return null
  }

  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return
    }

    isCounterRan = true

    document.querySelectorAll<HTMLElement>('.counter').forEach(counter => {
      const target = Number(counter.dataset.target)

      if (isNaN(target)) {
        throw new Error('Missing or invalid data-target')
      }

      const start = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - start) / TEXT_DURATION, 1)
        counter.textContent = formatNumber(Math.floor(progress * target))

        if (progress < 1) {
          requestAnimationFrame(tick)
        } else {
          counter.textContent = formatNumber(target)
        }
      }

      requestAnimationFrame(tick)
    })
  })
}, {
  threshold: INTERSECTION_THRESHOLD
})

const technologySection = document.querySelector('#technologies')

if (!technologySection) {
  throw new Error('technologies section not found')
}

counterObserver.observe(technologySection)

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
