import VueI18n from 'vue-i18n'
import { VuePlausible } from 'vue-plausible'

export default ({ Vue }) => {
  Vue.use(VueI18n)
  Vue.use(VuePlausible, {
    domain: 'open-election-compass.com',
    trackLocalhost: true,
    apiHost: 'https://badwolf.open-election-compass.com'
  })
  Vue.$plausible.enableAutoPageviews()
}
