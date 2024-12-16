/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// SCSS
import "./styles/site.scss";
import "./styles/fonts.scss";
import "./styles/backgrounds.scss";
import "./styles/borders.scss";
import "./styles/cursors.scss";
import "./styles/navbar.scss";
import "./styles/settings.scss";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
