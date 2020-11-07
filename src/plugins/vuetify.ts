import Vue from "vue";
import Vuetify from "vuetify/lib";
import fr from "vuetify/src/locale/fr";
import '@mdi/font/scss/materialdesignicons.scss'

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
	},
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#4397ee",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  lang: {
    locales: { fr },
    current: "fr"
  }
});
