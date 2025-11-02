/**
 * Translation utility for CargoPlus
 * Translates vendor content from any language to Persian (Farsi)
 * Preserves formatting and doesn't corrupt design
 */

// For now, we'll use a simple translation service
// You can replace with Google Translate API, DeepL, or other service

/**
 * Translate text to Persian (Farsi)
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code (en, zh, ar, etc.)
 * @returns {Promise<string>} - Translated text in Persian
 */
export async function translateToPersian(text, sourceLang = 'en') {
  if (!text || text.trim() === '') {
    return ''
  }

  // If already Persian, return as is
  if (sourceLang === 'fa') {
    return text
  }

  try {
    // Using MyMemory Translation API (Free, no API key required)
    // Supports 100% free translations
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|fa`
    )
    
    const data = await response.json()
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText
    }
    
    // Fallback: Return original if translation fails
    console.warn('Translation failed, using original text')
    return text
  } catch (error) {
    console.error('Translation error:', error)
    return text // Return original on error
  }
}

/**
 * Translate multiple fields at once
 * @param {Object} fields - Object with field names and values
 * @param {string} sourceLang - Source language
 * @returns {Promise<Object>} - Object with Persian translations
 */
export async function translateFields(fields, sourceLang = 'en') {
  const translations = {}
  
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === 'string' && value.trim() !== '') {
      translations[`${key}_fa`] = await translateToPersian(value, sourceLang)
      translations[`${key}_original`] = value
    }
  }
  
  return translations
}

/**
 * Batch translate with delay to avoid rate limits
 * @param {Array} items - Array of texts to translate
 * @param {string} sourceLang - Source language
 * @returns {Promise<Array>} - Array of translations
 */
export async function batchTranslate(items, sourceLang = 'en') {
  const translations = []
  
  for (const item of items) {
    const translated = await translateToPersian(item, sourceLang)
    translations.push(translated)
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  
  return translations
}

/**
 * Check if text needs translation
 * @param {string} text - Text to check
 * @returns {boolean} - True if contains non-Persian characters
 */
export function needsTranslation(text) {
  if (!text) return false
  
  // Check if text contains Persian characters
  const persianRegex = /[\u0600-\u06FF]/
  const hasPersian = persianRegex.test(text)
  
  // If has Persian, probably doesn't need translation
  // If doesn't have Persian, probably needs translation
  return !hasPersian
}

/**
 * Detect language of text
 * @param {string} text - Text to detect
 * @returns {string} - Detected language code
 */
export function detectLanguage(text) {
  if (!text) return 'en'
  
  // Simple language detection
  const persianRegex = /[\u0600-\u06FF]/
  const chineseRegex = /[\u4E00-\u9FFF]/
  const arabicRegex = /[\u0600-\u06FF]/
  const cyrillicRegex = /[\u0400-\u04FF]/
  
  if (persianRegex.test(text)) return 'fa'
  if (chineseRegex.test(text)) return 'zh'
  if (arabicRegex.test(text)) return 'ar'
  if (cyrillicRegex.test(text)) return 'ru'
  
  return 'en' // Default to English
}

// Alternative: Google Translate API (Requires API key - more accurate)
// Uncomment and use this if you get Google Translate API key

/*
export async function translateWithGoogle(text, sourceLang, targetLang = 'fa') {
  const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY
  
  if (!API_KEY) {
    console.warn('Google Translate API key not found')
    return translateToPersian(text, sourceLang) // Fallback to free API
  }
  
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text'
        })
      }
    )
    
    const data = await response.json()
    return data.data.translations[0].translatedText
  } catch (error) {
    console.error('Google Translate error:', error)
    return text
  }
}
*/

