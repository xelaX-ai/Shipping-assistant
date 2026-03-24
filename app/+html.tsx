import { ScrollViewStyleReset } from "expo-router/html";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body { height: 100%; margin: 0; background: #0F172A; }
            body { overflow: hidden; }
            #root { display: flex; height: 100%; flex: 1; }
            #app-loader {
              position: fixed; inset: 0; background: #0F172A;
              display: flex; align-items: center; justify-content: center;
              color: #64748B; font-family: sans-serif; font-size: 16px;
              z-index: 9999; pointer-events: none;
            }
            #error-display {
              display: none; position: fixed; inset: 0; background: #0F172A;
              padding: 40px 20px 20px; z-index: 10000; overflow: auto;
              font-family: monospace;
            }
            #error-display h2 { color: #F87171; margin: 0 0 8px; font-size: 18px; }
            #error-display p { color: #94A3B8; margin: 0 0 16px; font-size: 13px; }
            #error-display pre {
              color: #CBD5E1; font-size: 12px; line-height: 1.6;
              white-space: pre-wrap; word-break: break-all;
              background: #1E293B; padding: 14px; border-radius: 8px;
            }
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.__appStarted = false;
            window.onerror = function(msg, src, line, col, err) {
              var el = document.getElementById('error-display');
              var loader = document.getElementById('app-loader');
              if (el) {
                el.style.display = 'block';
                el.innerHTML =
                  '<h2>⚠️ Помилка JavaScript</h2>' +
                  '<p>Скопіюй текст і відправ розробнику</p>' +
                  '<pre>' + msg + '\\n\\nФайл: ' + src + '\\nРядок: ' + line + ', Стовпець: ' + col +
                  (err ? '\\n\\nStack:\\n' + err.stack : '') + '</pre>';
              }
              if (loader) loader.style.display = 'none';
              return false;
            };
            window.addEventListener('unhandledrejection', function(e) {
              var el = document.getElementById('error-display');
              var loader = document.getElementById('app-loader');
              if (el) {
                el.style.display = 'block';
                el.innerHTML =
                  '<h2>⚠️ Unhandled Promise Rejection</h2>' +
                  '<p>Скопіюй текст і відправ розробнику</p>' +
                  '<pre>' + String(e.reason) +
                  (e.reason && e.reason.stack ? '\\n\\n' + e.reason.stack : '') + '</pre>';
              }
              if (loader) loader.style.display = 'none';
            });
            // Hide loader once React mounts
            document.addEventListener('DOMContentLoaded', function() {
              setTimeout(function() {
                var root = document.getElementById('root');
                var loader = document.getElementById('app-loader');
                if (loader && root && root.children.length > 0) {
                  loader.style.display = 'none';
                }
              }, 3000);
            });
          `
        }} />
      </head>
      <body>
        <div id="app-loader">Завантаження...</div>
        <div id="error-display" />
        {children}
      </body>
    </html>
  );
}
