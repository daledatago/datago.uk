/**
 * Runs before first paint: applies the stored theme, or the device setting,
 * and marks the document as scripted so scroll reveals can start hidden.
 */
const script = `(function(){var t=null;try{t=localStorage.getItem('datago-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.setAttribute('data-theme',t);d.classList.add('js')})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
