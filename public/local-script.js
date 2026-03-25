// This script is loaded from the backend (same origin).
// Its execution will be blocked if script-src does not allow 'self'.
(function () {
  const el = document.getElementById('local-script-status');
  if (el) {
    el.textContent = '✅ Local script executed successfully';
    el.className = 'status ok';
  }
})();
