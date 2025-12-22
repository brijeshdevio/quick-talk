export function Footer() {
  return (
    <footer className="w-full p-3 bg-base-200 text-sm border-t border-primary/10">
      <div className="w-full sm:w-[90%] mx-auto flex items-center justify-between">
        <span>© QuickTalk {new Date().getFullYear()}</span>
        <span>
          Powered by{" "}
          <a
            href="https://github.com/brijeshdevio"
            target="_blank"
            className="underline hover:text-primary"
          >
            Brijesh
          </a>
        </span>
      </div>
    </footer>
  );
}
