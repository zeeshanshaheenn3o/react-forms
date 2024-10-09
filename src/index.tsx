import r2wc from "@r2wc/react-to-web-component";

import App from "./App";

const WebApp = r2wc(App, {
  props: {
    items: "json",
  },
});

customElements.define("web-app", WebApp);
