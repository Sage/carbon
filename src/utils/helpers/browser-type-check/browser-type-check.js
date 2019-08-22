function browserTypeCheck(_window) {
  return Boolean(_window.chrome || _window.sidebar);
}

export default browserTypeCheck;
