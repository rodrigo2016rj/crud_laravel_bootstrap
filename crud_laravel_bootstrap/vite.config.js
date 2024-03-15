import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { resolve } from "path";

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
      "alias_bootstrap": resolve(__dirname, "node_modules/bootstrap"),
      "alias_bootstrap-icons": resolve(__dirname, "node_modules/bootstrap-icons")
    }
  }
});
