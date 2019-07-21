const ApiConfig = window.ApiConfig || {}

const protocol = document.location.protocol

ApiConfig.domain = process.env.NODE_ENV === 'production' ? protocol + '' : protocol + ''

export default ApiConfig
