// allow imports that include the Vite ?url resource query
declare module '*?url' {
  const src: string;
  export default src;
}

// optional: allow plain svg imports as strings (if you ever import svg from src)
declare module '*.svg' {
  const src: string;
  export default src;
}
