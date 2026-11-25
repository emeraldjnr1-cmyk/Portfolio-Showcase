/**
 * First stop for the keyboard on every page: jumps past the menu to
 * <main id="main">. Focus is moved by hand because the smooth-scroll hook
 * takes over in-page links, which would scroll but leave focus in the header.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="skip-link"
      onClick={() => document.getElementById("main")?.focus({ preventScroll: true })}
    >
      Skip to content
    </a>
  );
}
