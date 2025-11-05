import './style.css'
import 'flyonui/flyonui'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/stackoverflow-light.css'
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

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id')
    if (!id) {
      return null
    }

    const link = Array.from(navLinks).find((l) => l.getAttribute('href') === `#${id}`)
    if (!link) {
      return null
    }

    if (entry.isIntersecting) {
      // remove active class from all nav links
      navLinks.forEach(l => l.classList.remove('text-primary'))
      // add active class to the currently visible section's link
      link.classList.add('text-primary')
    }
  })
}, {
  root: null,
  rootMargin: '-0px 0px 0px 0px',
  threshold: INTERSECTION_THRESHOLD // trigger when at least 10% is visible
})

// observe all sections
sections.forEach(section => sectionObserver.observe(section))

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
