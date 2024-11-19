import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Ampliflow',
  webDir: 'www',
  server:{
    androidScheme:'https'
  }
 /* "server": {
    "url": "https://ampliflowapi-b3bub4c0d8g6cgg8.southafricanorth-01.azurewebsites.net",
    cleartext: true
}  */
};

export default config;
