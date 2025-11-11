import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { ar } from 'vuetify/locale';

const vuetify = createVuetify({
  components,
  directives,
  rtl: true,
  locale: {
    locale: 'ar',
    messages: { ar }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#3A5A78',
          secondary: '#8C9DAA',
          accent: '#343A40',
          success: '#28A745',
          mycolor: '#8E8E93',
          error: '#DC3545',
          warning: '#FFC107',
          info: '#17A2B8',
          background: '#F8F9FA',
          surface: '#FFFFFF',
          'grey-100': '#f8f9fa',
          'grey-200': '#e9ecef',
          'grey-300': '#dee2e6',
          'grey-600': '#6c757d',
          'grey-900': '#343a40'
        }
      }
    }
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none; letter-spacing: 0;'
    },
    VCard: {
      elevation: 0,
      style: 'border: 1px solid #E3E9EF; border-radius: 8px;'
    }
  }
});

export default vuetify;
