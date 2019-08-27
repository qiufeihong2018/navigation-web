import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Navigation'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
