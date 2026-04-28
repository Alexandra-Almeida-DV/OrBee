declare module "*.css";
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // adicione outras variáveis VITE_ aqui se tiver
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
