/*!
 * Adapted from the Color mode toggler for Bootstrap's docs (see https://getbootstrap.com/docs/5.3/customize/color-modes/#javascript)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  function getStoredTheme() { localStorage.getItem('theme') }
  function setStoredTheme(theme) { localStorage.setItem('theme', theme) }

  function getPreferredTheme() {
    const storedTheme = getStoredTheme()
    return storedTheme
      ? storedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', toBootstrapTheme(theme))
  }

  function toBootstrapTheme(theme) {
    return theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : theme
  }

  setTheme(getPreferredTheme())

  function showActiveTheme(theme, focus = false) {
    const btnThemeSwitcher = document.getElementById('dan-theme')
    if (!btnThemeSwitcher)
      return

    const lblThemeSwitcher = document.getElementById('dan-theme-text')
    const activeThemeIconSvg = btnThemeSwitcher.getElementsByTagName('svg')[0]
    const btnToActivate = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const btnToActivateSvg = btnToActivate.getElementsByClassName('theme-icon')[0]

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActivate.classList.add('active')
    btnToActivate.setAttribute('aria-pressed', 'true')
    activeThemeIconSvg.replaceWith(btnToActivateSvg.cloneNode(true))
    btnThemeSwitcher.setAttribute('aria-label', `${lblThemeSwitcher.textContent} (${btnToActivate.dataset.bsThemeValue})`)
    const bsTheme = toBootstrapTheme(theme)
    btnThemeSwitcher.classList.add(bsTheme === 'dark' ? 'btn-light' : 'btn-dark')
    btnThemeSwitcher.classList.remove(bsTheme === 'dark' ? 'btn-dark' : 'btn-light')

    if (focus)
      btnThemeSwitcher.focus()
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark')
      setTheme(getPreferredTheme())
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()