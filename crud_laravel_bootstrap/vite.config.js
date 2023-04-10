import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

const path = require("path");

export default defineConfig({
  plugins: [
    laravel({
      input: [
        "resources/scripts/cadastrar_pessoa.js",
        "resources/scripts/editar_pessoa.js",
        "resources/scripts/listar_pessoas.js",
        "resources/scripts/template.js",
        "resources/scripts/tudo_em_um.js",
        "resources/scripts/visual_padrao/template.js"
      ],
      refresh: true
    })
  ],
  resolve: {
    alias: {
      "alias_bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "alias_bootstrap-icons": path.resolve(__dirname, "node_modules/bootstrap-icons")
    }
  }
});
